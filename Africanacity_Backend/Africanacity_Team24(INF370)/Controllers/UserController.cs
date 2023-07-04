using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using Africanacity_Team24_INF370_.models.Login;
using Africanacity_Team24_INF370_.ViewModel;
using System.Security.Claims;
using System.Text;
using MimeKit;
using MailKit.Security;
using Africanacity_Team24_INF370_.Helpers;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using AngularAuthYtAPI.Models.Dto;
using System.Configuration;
using Africanacity_Team24_INF370_.EmailService;
using Africanacity_Team24_INF370_.models.Dto;
using Africanacity_Team24_INF370_.models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace Africanacity_Team24_INF370_.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : Controller
	{
		private readonly UserManager<AppUser> _userManager;
		private readonly IUserClaimsPrincipalFactory<AppUser> _claimsPrincipalFactory;
		private readonly IConfiguration _configuration;
		private static Dictionary<string, TwoFactorCode> _twoFactorCodeDictionary
			= new Dictionary<string, TwoFactorCode>();
		private readonly AppDbContext _authContext;
		private readonly IEmailService _emailService;
		private readonly IRepository _repository;
		public UserController(AppDbContext context, IRepository repository, UserManager<AppUser> userManager, IUserClaimsPrincipalFactory<AppUser> claimsPrincipalFactory, IConfiguration configuration, IEmailService emailService)
		{
			_authContext = context;
			_userManager = userManager;
			_claimsPrincipalFactory = claimsPrincipalFactory;
			_configuration = configuration;
			_emailService = emailService;
			_repository = repository;
		}

		[HttpPost("Authenticate")]
		//[Route("Authenticate")]
		public async Task<IActionResult> Authenticate([FromBody] User userObj)
		{
			if (userObj == null)
				return BadRequest();

			var user = await _authContext.Users
				.FirstOrDefaultAsync(x => x.Username == userObj.Username);

			if (user == null)
				return NotFound(new { Message = "User not found!" });

			if (!PasswordHasher.VerifyPassword(userObj.Password, user.Password))
			{
				return BadRequest(new { Message = "Password is Incorrect" });
			}

			user.Token = CreateJwt(user);
			var newAccessToken = user.Token;
			var newRefreshToken = CreateRefreshToken();
			user.RefreshToken = newRefreshToken;
			user.RefreshTokenExpiryTime = DateTime.Now.AddDays(15);
			await _authContext.SaveChangesAsync();

			return Ok(new TokenApiDto()
			{
				AccessToken = newAccessToken,
				RefreshToken = newRefreshToken
			});
		}

		[HttpPost]
		[Route("Register")]
		public async Task<IActionResult> AddUser([FromBody] User userObj)
		{
			if (userObj == null)
				return BadRequest();

			// check email
			if (await CheckEmailExistAsync(userObj.Email))
				return BadRequest(new { Message = "Email already exist" });

			//check username
			if (await CheckUsernameExistAsync(userObj.Username))
				return BadRequest(new { Message = "Username already exist" });

			var passMessage = CheckPasswordStrength(userObj.Password);
			if (!string.IsNullOrEmpty(passMessage))
				return BadRequest(new { Message = passMessage.ToString() });

			userObj.Password = PasswordHasher.HashPassword(userObj.Password);
			userObj.Role = "User";
			userObj.Token = "";
			await _authContext.AddAsync(userObj);
			await _authContext.SaveChangesAsync();
			return Ok(new
			{
				Status = 200,
				Message = "Entertainer added successfully!"
			});
		}

		private Task<bool> CheckEmailExistAsync(string? email)
			=> _authContext.Users.AnyAsync(x => x.Email == email);

		private Task<bool> CheckUsernameExistAsync(string? username)
			=> _authContext.Users.AnyAsync(x => x.Email == username);

		private static string CheckPasswordStrength(string pass)
		{
			StringBuilder sb = new StringBuilder();
			if (pass.Length < 9)
				sb.Append("Minimum password length should be 8" + Environment.NewLine);
			if (!(Regex.IsMatch(pass, "[a-z]") && Regex.IsMatch(pass, "[A-Z]") && Regex.IsMatch(pass, "[0-9]")))
				sb.Append("Password should be AlphaNumeric" + Environment.NewLine);
			if (!Regex.IsMatch(pass, "[<,>,@,!,#,$,%,^,&,*,(,),_,+,\\[,\\],{,},?,:,;,|,',\\,.,/,~,`,-,=]"))
				sb.Append("Password should contain special charcter" + Environment.NewLine);
			return sb.ToString();
		}

		private string CreateJwt(User user)
		{
			var jwtTokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes("veryverysceret.....");
			var identity = new ClaimsIdentity(new Claim[]
			{
				new Claim(ClaimTypes.Role, user.Role),
				new Claim(ClaimTypes.Name,$"{user.Username}")
			});

			var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = identity,
				Expires = DateTime.Now.AddSeconds(10),
				SigningCredentials = credentials
			};
			var token = jwtTokenHandler.CreateToken(tokenDescriptor);
			return jwtTokenHandler.WriteToken(token);
		}

		private string CreateRefreshToken()
		{
			var tokenBytes = RandomNumberGenerator.GetBytes(64);
			var refreshToken = Convert.ToBase64String(tokenBytes);

			var tokenInUser = _authContext.Users
				.Any(a => a.RefreshToken == refreshToken);
			if (tokenInUser)
			{
				return CreateRefreshToken();
			}
			return refreshToken;
		}

		private ClaimsPrincipal GetPrincipleFromExpiredToken(string token)
		{
			var key = Encoding.ASCII.GetBytes("veryverysceret.....");
			var tokenValidationParameters = new TokenValidationParameters
			{
				ValidateAudience = false,
				ValidateIssuer = false,
				ValidateIssuerSigningKey = true,
				IssuerSigningKey = new SymmetricSecurityKey(key),
				ValidateLifetime = false
			};
			var tokenHandler = new JwtSecurityTokenHandler();
			SecurityToken securityToken;
			var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
			var jwtSecurityToken = securityToken as JwtSecurityToken;
			if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
				throw new SecurityTokenException("This is Invalid Token");
			return principal;

		}



		[Authorize]
		[HttpGet]
		public async Task<ActionResult<User>> GetAllUsers()
		{
			return Ok(await _authContext.Users.ToListAsync());
		}

		[HttpPost]
		[Route("Refresh")]
		public async Task<IActionResult> Refresh([FromBody] TokenApiDto tokenApiDto)
		{
			if (tokenApiDto is null)
				return BadRequest("Invalid Client Request");
			string accessToken = tokenApiDto.AccessToken;
			string refreshToken = tokenApiDto.RefreshToken;
			var principal = GetPrincipleFromExpiredToken(accessToken);
			var username = principal.Identity.Name;
			var user = await _authContext.Users.FirstOrDefaultAsync(u => u.Username == username);
			if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
				return BadRequest("Invalid Request");
			var newAccessToken = CreateJwt(user);
			var newRefreshToken = CreateRefreshToken();
			user.RefreshToken = newRefreshToken;
			await _authContext.SaveChangesAsync();
			return Ok(new TokenApiDto()
			{
				AccessToken = newAccessToken,
				RefreshToken = newRefreshToken,
			});
		}

		[HttpPost]
		[Route("send-reset-email/{email}")]
		public async Task<IActionResult> SendEmail(string email)
		{
			var user = await _authContext.Users.FirstOrDefaultAsync(a => a.Email == email);
			if (user is null)
			{
				return NotFound(new
				{
					StatusCode = 404,
					Message = "Email does not exist"
				});
			}
			var tokenBytes = RandomNumberGenerator.GetBytes(64);
			var emailToken = Convert.ToBase64String(tokenBytes);
			user.ResetPasswordToken = emailToken;
			user.ResetPasswordTokenExpiry = DateTime.Now.AddMinutes(5);
			string from = _configuration["EmailSetting:From"];
			var emailModel = new EmailModel(email, "Reset Password!!", EmailBody.EmailStringBody(email, emailToken));
			_emailService.SendEmail(emailModel);
			_authContext.Entry(user).State = EntityState.Modified;
			await _authContext.SaveChangesAsync();
			return Ok(new
			{
				StatusCode = 200,
				Message = "Email successfully sent!"
			});
		}

		[HttpPost]
		[Route("Reset-password")]
		public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
		{
			var newToken = resetPasswordDto.EmailToken.Replace("", "+");
			var user = await _authContext.Users.AsNoTracking().FirstOrDefaultAsync(a => a.Email == resetPasswordDto.Email);
			if (user == null)
			{
				return NotFound(new
				{
					StatusCode = 404,
					Message = "User does not exist"
				});
			}
			var tokenCode = user.ResetPasswordToken;
			DateTime emailTokenExpiry = user.ResetPasswordTokenExpiry;
			if (tokenCode != resetPasswordDto.EmailToken || emailTokenExpiry < DateTime.Now)
			{
				return NotFound(new
				{
					StatusCode = 400,
					Message = "Invalid Reset link"
				});
			}
			user.Password = PasswordHasher.HashPassword(resetPasswordDto.NewPassword);
			_authContext.Entry(user).State = EntityState.Modified;
			await _authContext.SaveChangesAsync();
			return Ok(new
			{
				StatusCode = 200,
				Message = "Password successfully reset"
			});
		}

		//getting User using id
		[HttpGet]
		[Route("Profile/{UserId}")]
		public async Task<ActionResult> GetUser(int UserId)
		{
			try
			{
				var users = await _repository.ViewProfileAsync(UserId);
				if (users == null) return NotFound("User does not exist.");
				return Ok(users);
			}
			catch (Exception)
			{
				return StatusCode(500, "Enter some error message");
			}

		}

		//[Authorize]
		//[HttpGet("Profile")]
		//public async Task<ActionResult<User>> GetProfile()
		//{
		//	string username = User.Identity.Name;
		//	var user = await _userManager.FindByNameAsync(username);

		//	if (user == null)
		//	{
		//		return NotFound(new { Message = "User not found" });
		//	}

		//	return Ok(user);
		//}

		//[HttpGet("profile")]
		//[Authorize] // Make sure the user is authenticated
		//public async Task<IActionResult> GetUserProfile()
		//{
		//	var UserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
		//	var userProfile = await _repository.GetUserProfile(UserId);
		//	if (userProfile == null)
		//	{
		//		return NotFound(new { Message = "User profile not found" });
		//	}
		//	return Ok(userProfile);
		//}

		//getting User using id
		[HttpGet]
		[Route("ProfileIn")]
		public async Task<ActionResult<User>> ViewProfiles()
		{
			return Ok(await _authContext.Users.ToListAsync());
		}
	}
}

