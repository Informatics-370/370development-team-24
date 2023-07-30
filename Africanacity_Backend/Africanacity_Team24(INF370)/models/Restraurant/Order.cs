using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class Order
	{
		[Key]
		public int OrderId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;
	
		public List<Drink> Drinks { get; set; } = new List<Drink>();
		public List<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
	}
}
