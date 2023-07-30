using Africanacity_Team24_INF370_.models.Booking;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Administration.Admin
{
    public class User
    {
		[Key]
		public int UserId { get; set; }

		[MaxLength(15)]
		public string Username { get; set; } = string.Empty;
		public List<Employee> Employees { get; set; } = new List<Employee>();
		public List<Entertainer> Entertainers { get; set; } = new List<Entertainer>();

		public List<Password> Passwords { get; set; } = new List<Password>();
		public List<Administrator> Administrators { get; set; } = new List<Administrator>();

	}
}
