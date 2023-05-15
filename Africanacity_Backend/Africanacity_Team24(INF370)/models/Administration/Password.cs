using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Administration
{
	public class Password
	{
		[Key]
		public int PasswordId { get; set; }

		[MaxLength(10)]
		public string HashPassword { get; set; } = string.Empty;

		[MaxLength(10)]
		public string Dataset { get; set; } = string.Empty;


		public List<User> Users { get; set; } = new List<User>();

	}
}
