using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Africanacity_Team24_INF370_.models.Login
{
	public class UpdatePasswordModel
	{
		//[Required]
		//[DataType(DataType.Password)]
		//public string CurrentPassword { get; set; }

		//[Required]
		//[DataType(DataType.Password)]
		//public string Password { get; set; }

		//[Required]
		//[Compare("Password")]
		//[DataType(DataType.Password)]
		//public string Confirmpassword { get; set; }

		//[Required]
		//[EmailAddress]
		//[RegularExpression(@"^[_a-z0-9-]+(.[a-z0-9-]+)@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$", ErrorMessage = "Please enter a valid email address")]
		//public string Email { get; set; }

		//[Required]
		//[StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 8)]
		//[RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$", ErrorMessage = "Please enter a valid password")]
		//[DataType(DataType.Password)]
		//public string Password { get; set; }

		//[DataType(DataType.Password)]
		//[Display(Name = "Confirm password")]
		//[Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
		//public string ConfirmPassword { get; set; }

		//public string Code { get; set; }

		[DataType(DataType.Password)]
		public string OldPassword { get; set; }
		public string NewPassword { get; set; }
	}
}
