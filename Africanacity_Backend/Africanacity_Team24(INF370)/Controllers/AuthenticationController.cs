using Microsoft.AspNetCore.Mvc;
using Africanacity_Team24_INF370_.models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using Africanacity_Team24_INF370_.models.Login;
using Africanacity_Team24_INF370_.ViewModel;
using Africanacity_Team24_INF370_.View_Models;
using System.Security.Claims;
using System.Text;

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IUserClaimsPrincipalFactory<AppUser> _claimsPrincipalFactory;
		private readonly IConfiguration _configuration;
		private static Dictionary<string, TwoFactorCode> _twoFactorCodeDictionary
            = new Dictionary<string, TwoFactorCode>();

		public AuthenticationController(UserManager<AppUser> userManager, IUserClaimsPrincipalFactory<AppUser> claimsPrincipalFactory, IConfiguration configuration, IRepository repository)

		{
			_userManager = userManager;
			_claimsPrincipalFactory = claimsPrincipalFactory;
			_configuration = configuration;
		}

		[HttpPost]
		[Route("Register")]
		public async Task<IActionResult> Register(UserViewModel uvm)
		{
			var user = await _userManager.FindByIdAsync(uvm.userName);

			if (user == null)
			{
				user = new AppUser
				{
					Id = Guid.NewGuid().ToString(),
					UserName = uvm.userName,
					Email = uvm.userName
				};

				var result = await _userManager.CreateAsync(user, uvm.password);

				if (result.Errors.Count() > 0) return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
			}
			else
			{
				return Forbid("Account already exists.");
			}

			return Ok();
		}

		[HttpPost]
		[Route("Login")]
		public async Task<ActionResult> Login(UserViewModel uvm)
		{
			var user = await _userManager.FindByNameAsync(uvm.userName);

			if (user != null && await _userManager.CheckPasswordAsync(user, uvm.password))
			{
				try
				{
					//var principal = await _claimsPrincipalFactory.CreateAsync(user);
					//await HttpContext.SignInAsync(IdentityConstants.ApplicationScheme, principal);
					return GenerateJWTToken(user);
				}
				catch (Exception)
				{
					return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
				}
			}
			else
			{
				return NotFound("Does not exist");
			}

			//var loggedInUser = new UserViewModel { EmailAddress = uvm.EmailAddress, Password = uvm.Password };

			//return Ok(loggedInUser);
		}

		[HttpGet]
		private ActionResult GenerateJWTToken(AppUser user)
		{
			// Create JWT Token
			var claims = new[]
			{
				new Claim(JwtRegisteredClaimNames.Sub, user.Email),
				new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
				new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName)
			};

			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Tokens:Key"]));
			var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

			var token = new JwtSecurityToken(
				_configuration["Tokens:Issuer"],
				_configuration["Tokens:Audience"],
				claims,
				signingCredentials: credentials,
				expires: DateTime.UtcNow.AddHours(3)
			);

			return Created("", new
			{
				token = new JwtSecurityTokenHandler().WriteToken(token),
				user = user.UserName
			});
		}

	[HttpGet]
        public async Task<IActionResult> Logout()
        {

            await HttpContext.SignOutAsync(IdentityConstants.ApplicationScheme);

            return Ok("Successfully logged out");
        }

        [HttpPost]
        [Route("Otp")]
        public IActionResult VerifyOTP(OtpModel user)
        {
            var validOtp = VerifyTwoFactorCodeFor(user.userName, user.otp);

            if (validOtp)
            {
                return Ok();
            }

            return StatusCode(StatusCodes.Status400BadRequest, "Invalid OTP");
        }

        private async Task SendEmail(string fromEmailAddress, string subject, string message, string toEmailAddress)
        {
            var fromAddress = new MailAddress(fromEmailAddress);
            var toAddress = new MailAddress(toEmailAddress);

            using (var compiledMessage = new MailMessage(fromAddress, toAddress))
            {
                compiledMessage.Subject = subject;
                compiledMessage.Body = string.Format("Message: {0}", message);

                using (var smtp = new SmtpClient())
                {
                    smtp.Host = "yourownprovidedhost"; // for example: smtp.gmail.com
                    smtp.Port = 587;
                    smtp.EnableSsl = true;
                    smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtp.UseDefaultCredentials = false;
                    smtp.Credentials = new NetworkCredential("theemailaccountthatyouwillbeusing", "theemailaccountspassword"); // your own provided email and password
                    await smtp.SendMailAsync(compiledMessage);
                }
            }
        }

        private static string GetUniqueKey()
        {
            Random rnd = new Random();

            var optCode = rnd.Next(1000, 9999);

            return optCode.ToString();
        }

        private static string GenerateTwoFactorCodeFor(string username)
        {
            var code = GetUniqueKey();

            var twoFactorCode = new TwoFactorCode(code);

            // add or overwrite code
            _twoFactorCodeDictionary[username] = twoFactorCode;

            return code;
        }

        private bool VerifyTwoFactorCodeFor(string subject, string code)
        {
            TwoFactorCode twoFactorCodeFromDictionary = null;
            // find subject in dictionary
            if (_twoFactorCodeDictionary
                .TryGetValue(subject, out twoFactorCodeFromDictionary))
            {
                if (twoFactorCodeFromDictionary.CanBeVerifiedUntil > DateTime.Now
                    && twoFactorCodeFromDictionary.Code == code)
                {
                    twoFactorCodeFromDictionary.IsVerified = true;
                    return true;
                }
            }
            return false;
        }

    }
}
