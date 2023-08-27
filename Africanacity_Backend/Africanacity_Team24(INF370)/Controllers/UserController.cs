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
using System.Configuration;
using Africanacity_Team24_INF370_.EmailService;
using Africanacity_Team24_INF370_.models.Dto;
using Africanacity_Team24_INF370_.models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Africanacity_Team24_INF370_.View_Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using Newtonsoft.Json;
using System.Diagnostics;
using System.Net;

namespace Africanacity_Team24_INF370_.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly IConfiguration _configuration;
		private readonly AppDbContext _authContext;
		private readonly IEmailService _emailService;
		private readonly IRepository _repository;

		public UserController(AppDbContext context, IRepository repository, IConfiguration configuration, IEmailService emailService)
		{
			_authContext = context;
			_configuration = configuration;
			_emailService = emailService;
			_repository = repository;
		}

		private async Task SendEmailAsync(string recipientEmail, string subject, string body)
		{
			var smtpClient = new SmtpClient("smtp.gmail.com")
			{
				Port = 587,
				Credentials = new NetworkCredential("africanacitymmino@gmail.com", "xuaqebsjnbxopjtx"),
				EnableSsl = true,
			};

			var mailMessage = new MailMessage
			{
				From = new MailAddress("africanacitymmino@gmail.com"),
				Subject = subject,
				Body = body,
				IsBodyHtml = true,
			};
			mailMessage.To.Add(recipientEmail);

			await smtpClient.SendMailAsync(mailMessage);
		}


		//**************************************************************************** Login *******************************************************************************
		[HttpPost("Authenticate")]
		public async Task<IActionResult> Authenticate([FromBody] EntertainerViewModel entertainerViewModel)
		{
			if (entertainerViewModel == null)
				return BadRequest();

			var user = await _authContext.Users
				.FirstOrDefaultAsync(x => x.Username == entertainerViewModel.Username);

			if (user == null)
				return NotFound(new { Message = "User not found!" });

			if (!PasswordHasher.VerifyPassword(entertainerViewModel.Password, user.Password))
			{
				return BadRequest(new { Message = "Password is incorrect" });
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



		//**************************************************************************** Register *******************************************************************************
		[HttpPost]
		[Route("Register")]
		public async Task<IActionResult> AddUser([FromBody] EntertainerViewModel entertainerViewModel)
		{
			if (entertainerViewModel == null)
				return BadRequest();

			// check email
			if (await CheckEmailExistAsync(entertainerViewModel.Email))
				return BadRequest(new { Message = "Email already exists" });

			//check username
			if (await CheckUsernameExistAsync(entertainerViewModel.Username))
				return BadRequest(new { Message = "Username already exists" });

			var passMessage = CheckPasswordStrength(entertainerViewModel.Password);
			if (!string.IsNullOrEmpty(passMessage))
				return BadRequest(new { Message = passMessage });

			var newUser = new User
			{
				FirstName = entertainerViewModel.FirstName,
				LastName = entertainerViewModel.LastName,
				Username = entertainerViewModel.Username,
				Password = PasswordHasher.HashPassword(entertainerViewModel.Password),
				Role = "User",
				Email = entertainerViewModel.Email,
				ContactNumber = entertainerViewModel.ContactNumber,
				PhysicalAddress = entertainerViewModel.PhysicalAddress,
				RefreshToken = "",
				RefreshTokenExpiryTime = DateTime.UtcNow, // Set as needed
				ResetPasswordToken = "",
				ResetPasswordTokenExpiry = DateTime.UtcNow, // Set as needed
				Entertainment_TypeId = entertainerViewModel.EntertainmentType
			};

			await _authContext.AddAsync(newUser);
			await _authContext.SaveChangesAsync();
			// Send registration confirmation email
			await SendRegistrationConfirmationEmail(newUser.Email, newUser.FirstName);


			return Ok(new
			{
				Status = 200,
				Message = "Entertainer added successfully!"
			});
		}


		//**************************************************************************** Registration Email *******************************************************************************

		private async Task SendRegistrationConfirmationEmail(string recipientEmail, string recipientName)
		{
			string emailSubject = "Registration Confirmation";
			string emailBody = $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                }}
                h1 {{
                    margin-bottom: 20px;
                }}
                p {{
                    margin: 10px 0;
                }}
            </style>
        </head>
        <body>
            <h1>Registration Successful</h1>
            <p>Hello {recipientName},</p>
            <p>Your registration with us is now confirmed. Welcome aboard!</p>
            <p>Feel free to explore and enjoy our services.</p>
               <p> Kind Regards, <br><br>
              MMINO Restaurant Team</p>
        </body>
        </html>";

			await SendEmailAsync(recipientEmail, emailSubject, emailBody);
		}



		//**************************************************************************** Email Validation *******************************************************************************
		private Task<bool> CheckEmailExistAsync(string? email)
			=> _authContext.Users.AnyAsync(x => x.Email == email);


		//**************************************************************************** Username Validation *******************************************************************************
		private Task<bool> CheckUsernameExistAsync(string? username)
			=> _authContext.Users.AnyAsync(x => x.Email == username);


		//**************************************************************************** Password Validation  *******************************************************************************
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


		//**************************************************************************** Create JWT token *******************************************************************************
		private string CreateJwt(User user)
		{
			var jwtTokenHandler = new JwtSecurityTokenHandler();
			var key = Encoding.ASCII.GetBytes("veryverysceret.....");
			var identity = new ClaimsIdentity(new Claim[]
			{
				new Claim(ClaimTypes.Role, user.Role),
				new Claim(ClaimTypes.NameIdentifier, $"{user.Id}"),
				new Claim(ClaimTypes.Name,$"{user.Username}"),
				new Claim(ClaimTypes.GivenName,$"{user.FirstName}"),
				new Claim(ClaimTypes.Surname,$"{user.LastName}"),
				new Claim(ClaimTypes.WindowsAccountName,$"{user.ContactNumber}"),
				new Claim(ClaimTypes.Email,$"{user.Email}"),
				new Claim(ClaimTypes.Actor ,$"{user.PhysicalAddress }")

			});

			var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = identity,
				Expires = DateTime.Now.AddMinutes(15),
				SigningCredentials = credentials
			};
			var token = jwtTokenHandler.CreateToken(tokenDescriptor);
			return jwtTokenHandler.WriteToken(token);
		}


		//**************************************************************************** Create Refresh token *******************************************************************************
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


		//**************************************************************************** Token Expiration *******************************************************************************
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




		//**************************************************************************** Get Entertainers *******************************************************************************
		[HttpGet]
		public async Task<ActionResult<User>> GetAllUsers()
		{
			return Ok(await _authContext.Users.ToListAsync());
		}


		//**************************************************************************** Refresh *******************************************************************************
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


		//**************************************************************************** Reset email *******************************************************************************
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
			user.ResetPasswordTokenExpiry = DateTime.Now.AddMinutes(15);
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


		//**************************************************************************** Reset password *******************************************************************************


		[HttpPost]
		[Route("reset-password")]
		public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
		{
			var newToken = resetPasswordDto.EmailToken.Replace(" ", "+");

			// Check if the user exists in the Admins table
			var user = await _authContext.Admins.FirstOrDefaultAsync(u => u.Email == resetPasswordDto.Email);
			if (user == null)
			{
				// User not found in the Admins table, let's check the Entertainers table
				var admin = await _authContext.Users.FirstOrDefaultAsync(a => a.Email == resetPasswordDto.Email);
				if (admin == null)
				{
					return NotFound(new
					{
						StatusCode = 404,
						Message = "User does not exist"
					});
				}

				// Handle entertainer password reset here
				// ...
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
		//[HttpPost]
		//[Route("Reset-password")]
		//public async Task<IActionResult> ResetPassword(ResetPasswordDto resetPasswordDto)
		//{
		//	var newToken = resetPasswordDto.EmailToken.Replace(" ", "+");
		//	var user = await _authContext.Users.AsNoTracking().FirstOrDefaultAsync(a => a.Email == resetPasswordDto.Email);
		//	if (user == null)
		//	{
		//		return NotFound(new
		//		{
		//			StatusCode = 404,
		//			Message = "User does not exist"
		//		});
		//	}
		//	var tokenCode = user.ResetPasswordToken;
		//	DateTime emailTokenExpiry = user.ResetPasswordTokenExpiry;
		//	if (tokenCode != resetPasswordDto.EmailToken || emailTokenExpiry < DateTime.Now)
		//	{
		//		return NotFound(new
		//		{
		//			StatusCode = 400,
		//			Message = "Invalid Reset link"
		//		});
		//	}
		//	user.Password = PasswordHasher.HashPassword(resetPasswordDto.NewPassword);
		//	_authContext.Entry(user).State = EntityState.Modified;
		//	await _authContext.SaveChangesAsync();
		//	return Ok(new
		//	{
		//		StatusCode = 200,
		//		Message = "Password successfully reset"
		//	});
		//}



		//**************************************************************************** Get user by id *******************************************************************************
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


		//getting User using id
		[HttpGet]
		[Route("ProfileIn")]
		public async Task<ActionResult<User>> ViewProfiles()
		{
			return Ok(await _authContext.Users.ToListAsync());
		}


		//**************************************************************************** Edit entertainer *******************************************************************************
		[HttpPut]
		[Route("EditUser/{UserId}")]
		public async Task<ActionResult<EntertainerViewModel>> EditUser(int UserId, EntertainerViewModel ftvm)
		{
			try
			{
				var existingUser = await _repository.ViewProfileAsync(UserId);

				// fix error message
				if (existingUser == null) return NotFound($"The user does not exist");

				existingUser.FirstName = ftvm.FirstName;
				existingUser.Email = ftvm.Email;
				existingUser.LastName = ftvm.LastName;
				existingUser.ContactNumber = ftvm.ContactNumber;
				existingUser.PhysicalAddress = ftvm.PhysicalAddress;
				existingUser.Username = ftvm.Username;

				if (await _repository.SaveChangesAsync())
				{
					return Ok(existingUser);
				}
			}
			catch (Exception)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
			}
			return BadRequest("Your request is invalid");
		}


		//**************************************************************************** Delete Entertainer *******************************************************************************
		[HttpDelete]
		[Route("DeleteUser/{UserId}")]
		public async Task<IActionResult> DeleteUser(int UserId)
		{
			try
			{
				var existingUser = await _repository.ViewProfileAsync(UserId);

				// fix error message
				if (existingUser == null) return NotFound($"The user does not exist");

				_repository.Delete(existingUser);

				if (await _repository.SaveChangesAsync())
				{
					return Ok(existingUser);
				}
			}
			catch (Exception)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
			}
			return BadRequest("Your request is invalid");
		}



		//**************************************************************************** Entertainment Type *******************************************************************************
		[HttpGet]
		[Route("EntertainmentTypes")]
		public async Task<ActionResult> EntertainmentTypes()
		{
			try
			{
				var results = await _repository.GetEntertainmentTypesAsync();

				return Ok(results);
			}
			catch (Exception)
			{

				return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
			}
		}



		//**************************************************************************** Change Password *******************************************************************************
		[HttpPost("ChangePassword")]
	/*	[Authorize] */// Make sure the user is authenticated
		public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel model)
		{
			try
			{
				// Retrieve the user based on the authenticated user or a token
				var user = await _authContext.Users.SingleOrDefaultAsync(u => u.Username == User.Identity.Name);

				// Check if the user exists
				if (user == null)
				{
					return NotFound("User not found.");
				}

				// Check if the old password matches the stored password
				if (!PasswordHasher.VerifyPassword(model.OldPassword, user.Password))
				{
					return BadRequest("Old password is incorrect.");
				}

				// Check if the new password is different from the old password
				if (model.NewPassword == model.OldPassword)
				{
					return BadRequest("New password must be different from the old password.");
				}

				// Check if the new password and confirm password match
				if (model.NewPassword != model.ConfirmPassword)
				{
					return BadRequest("New password and confirm password do not match.");
				}

				// Update the password
				user.Password = PasswordHasher.HashPassword(model.NewPassword);
				await _authContext.SaveChangesAsync();

				return Ok(new { Message = "Password changed successfully." });
			}
			catch (Exception ex)
			{
				// Log the exception for debugging purposes
				// You can use a logging library like Serilog or NLog for this
				// logger.LogError(ex, "An error occurred while changing password.");

				// Return a generic error message to the client
				return StatusCode(StatusCodes.Status500InternalServerError, new { Message = "An error occurred while processing your request." });
			}
		}


	}

}



