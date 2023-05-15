using Africanacity_Team24_INF370_.models.Admin;
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

		public List<Menu_Type> Menu_Types { get; set; } = new List<Menu_Type>();

		public List<Food_Type> Food_Types { get; set; } = new List<Food_Type>();

		public List<MenuItem_Category> MenuItem_Categories { get; set; } = new List<MenuItem_Category>();
		public List<Order> Orders { get; set; } = new List<Order>();
	}
}
