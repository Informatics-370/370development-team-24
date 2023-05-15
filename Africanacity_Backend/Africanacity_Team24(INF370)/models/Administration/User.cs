using Africanacity_Team24_INF370_.models.Administration;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Admin
{
    public class User
    {
		[Key]
		public int UserId { get; set; }

		[MaxLength(15)]
		public string Username { get; set; } = string.Empty;

		public List<User_Role> User_Roles { get; set; } = new List<User_Role>();

		public List<Title> Titles { get; set; } = new List<Title>();
	}
}
