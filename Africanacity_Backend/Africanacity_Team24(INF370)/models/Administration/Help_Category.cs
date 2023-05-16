using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Administration
{
	public class Help_Category
	{
		[Key]
		public int Help_CategoryId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;
		public List<Help> Helps { get; set; } = new List<Help>();
	}
}
