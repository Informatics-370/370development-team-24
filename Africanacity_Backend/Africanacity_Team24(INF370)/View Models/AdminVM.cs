using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.View_Models
{
	public class AdminVM
	{
			public int Id { get; set; }
			public string? FirstName { get; set; }
			public string? LastName { get; set; }
			public string? Username { get; set; }

			[DataType(DataType.Password)]
			public string? Password { get; set; }
			public string? Token { get; set; }
			public string? Role { get; set; }
			public string? Email { get; set; }

			[DataType(DataType.PhoneNumber)]
			[StringLength(10)]
			public string? ContactNumber { get; set; }

			public string? PhysicalAddress { get; set; }
			public string? RefreshToken { get; set; }
			public DateTime RefreshTokenExpiryTime { get; set; }
			public string? ResetPasswordToken { get; set; }
			public DateTime ResetPasswordTokenExpiry { get; set; } 

		}
}


