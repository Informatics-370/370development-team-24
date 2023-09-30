using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Administration
{
    public class Access_UserRole
	{
		public int AccessId { get; set; }
		public Access Access { get; set; } // Navigation property for Access
		public int User_RoleId { get; set; }
		public User_Role User_Role { get; set; } // Navigation property for User_Role
	}
}
