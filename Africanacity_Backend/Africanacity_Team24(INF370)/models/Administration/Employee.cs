using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Administration
{
	public class Employee
	{
		[Key]
		public int EmployeeId { get; set; }

		[MaxLength(50)]
		public string Surname { get; set; } = string.Empty;

		[MaxLength(50)]
		public string FirstName { get; set; } = string.Empty;

		[MaxLength(50)]
		public string? Email_Address { get; set; }
		public string? Physical_Address { get; set; }

		[StringLength(10)]
		public string PhoneNumber { get; set; } = string.Empty;

		public List<User> Users { get; set; } = new List<User>();

		public List<Employee_Role> Employee_Types { get; set; } = new List<Employee_Role>();
	}
}
