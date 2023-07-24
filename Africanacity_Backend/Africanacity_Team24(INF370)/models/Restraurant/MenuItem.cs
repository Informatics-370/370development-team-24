using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class MenuItem
	{
		[Key]
		public int MenuItemId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;

		public List<Order> Orders { get; set; } = new List<Order>();

		public List<MenuItem_Price> MenuItem_Prices { get; set; } = new List<MenuItem_Price>();
	}
}
