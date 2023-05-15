using Africanacity_Team24_INF370_.models.Administration;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Admin
{
    public class Help
    {
		[Key]
		public int HelpId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;


		public List<Help_Category> Help_Categories { get; set; } = new List<Help_Category>();

		public List<Administrator> Administrators { get; set; } = new List<Administrator>();
	}
}
