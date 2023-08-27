using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;
using Africanacity_Team24_INF370_.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Org.BouncyCastle.Crypto.Generators;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using BCrypt.Net;

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeAppSignUpController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly AppDbContext _appDBContext;

        public EmployeeAppSignUpController(IRepository Repository, AppDbContext context)
        {
            _repository = Repository;
            _appDBContext = context;
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
                if (employee.Email_Address != model.Email_Address)
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

        private string HashPassword(string password)
        {
            // Use a secure password hashing library, such as BCrypt, to hash the password.
            // Example using BCrypt.Net:
            return BCrypt.Net.BCrypt.HashPassword(password);
        }












    }
}
