using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class Order_MenuItem
	{

		[Key]
		public int OrderMenuItemId { get; set; }
		public int Quantity { get; set; }

		public int MenuItemId { get; set; }
		public MenuItem MenuItem { get; set; }

		public int KitchenOrderId { get; set; }

		public KitchenOrder KitchenOrder { get; set; }

		
	}
}
