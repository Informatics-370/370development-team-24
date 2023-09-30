using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Administration
{
    public class User_Role
	{
		[Key]
		public int User_RoleId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;

		public ICollection<Access_UserRole> Access_UserRoles { get; set; }
	}
}
