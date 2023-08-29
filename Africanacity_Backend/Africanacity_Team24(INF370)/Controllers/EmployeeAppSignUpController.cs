using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;
using Africanacity_Team24_INF370_.Helpers;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Africanacity_Team24_INF370_.EmailService;
using Africanacity_Team24_INF370_.models.Dto;
using Africanacity_Team24_INF370_.models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Africanacity_Team24_INF370_.View_Models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Login;
using Newtonsoft.Json;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;


namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeAppSignUpController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly AppDbContext _appDBContext;
        private readonly IConfiguration _configuration;

        public EmployeeAppSignUpController(IRepository Repository, AppDbContext context, IConfiguration configuration)
        {
            _repository = Repository;
            _appDBContext = context;
            _configuration = configuration;
        }


        [HttpGet]
        [Route("GetEmployeeByEmail/{Email_Address}")]
        public async Task<IActionResult> GetEmployeeByEmailAsync(string Email_Address)
        {
            try
            {
                var result = await _repository.GetEmployeeByEmailAsync(Email_Address);

                if (result == null) return NotFound("Employee Email address not found");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }


        [HttpPost]
        [Route("SignUp")]
        public async Task<IActionResult> SignUp([FromBody] EmployeeSignUpViewModel model)
        {
            try
            {
                var employee = await _repository.GetEmployeeByEmailAsync(model.Email_Address);

                if (employee == null)
                {
                    return BadRequest("Employee does not exist.");
                }

                // Check if the provided email matches the existing employee's email
                if (model.Email_Address != employee.Email_Address)
                {
                    return BadRequest("Provided email does not match an existing employee's email.");
                }

                // Create user account using provided username, email, and password
                // Ensure you hash the password securely before saving it in the database
                var userAccount = new IonicAppUser
                {
                    Username = model.Username,
                    Email_Address = model.Email_Address,
                    
                    Password = HashPassword(model.Password)
                };

                // Save user account details
                _repository.Add(userAccount);
                await _repository.SaveChangesAsync();

                return Ok("Sign-up successful");
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        private string HashPassword(string Password)
        {
            // Use a secure password hashing library, such as BCrypt, to hash the password.
            // Example using BCrypt.Net:
            return BCrypt.Net.BCrypt.HashPassword(Password);
        }


        //Login
        //[HttpPost]
        //[Route("IonicAppLogin")]
        //[AllowAnonymous] // Allow anonymous access to this endpoint
        //public async Task<IActionResult> IonicAppLogin([FromBody] IonicAppLogin model)
        //{
        //    var employee = await _repository.GetEmployeeByUsernameAsync(model.Username);

        //    if (employee == null || await _repository.CheckPasswordAsync( model.Password) == null)
        //    {
        //        return Unauthorized("Invalid login credentials");
        //    }

        //    var tokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]);
        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = new ClaimsIdentity(new[]
        //        {
        //    new Claim(ClaimTypes.Name, employee.Username),
        //    new Claim(ClaimTypes.Email, employee.Email_Address)
        //}),
        //        Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
        //        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        //    };

        //    var token = tokenHandler.CreateToken(tokenDescriptor);
        //    var tokenString = tokenHandler.WriteToken(token);

        //    return Ok(new { Token = tokenString });
        //}


        [HttpPost("IonicAppLogin")]
        //[Route("Authenticate")]
        public async Task<IActionResult> IonicAppLogin([FromBody] IonicAppLoginViewModel loginModel)
        {
            if (loginModel == null)
            {
                return BadRequest();
            }
                

            var user = await _appDBContext.IonicAppUsers.FirstOrDefaultAsync(x => x.Username == loginModel.Username);

            if (user == null)
            {
                return NotFound(new { Message = "User not found!" });
            }
                

            // Verify if the provided password matches the one in the database
            if (!BCrypt.Net.BCrypt.Verify(loginModel.Password, user.Password))
            {
                return BadRequest(new { Message = "Password is Incorrect" });
            }
            // Customize the claims you want to include in the token
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Email, user.Email_Address),
        // Add more claims as needed for your application
    };

            // Customize token options, such as expiration
            var tokenOptions = new JwtSecurityTokenOptions
            {
                Issuer = "YourIssuer",
                Audience = "YourAudience",
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("YourSecretKey")),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            // Create the token
            var token = new JwtSecurityTokenHandler().CreateToken(tokenOptions);

            // Serialize the token to a string
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

            // Generate a new refresh token
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(15);

            // Save changes to the database
            await _appDBContext.SaveChangesAsync();

            return Ok(new TokenApiDto()
            {
                AccessToken = tokenString,
                RefreshToken = newRefreshToken
            });
        }

        private string CreateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                return Convert.ToBase64String(randomNumber);
            }
        }














    }
}
