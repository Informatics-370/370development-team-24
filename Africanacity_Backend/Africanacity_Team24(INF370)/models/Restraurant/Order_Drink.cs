using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class Order_Drink
	{
		[Key]
		public int OrderDrinkId { get; set; }
		public int Quantity { get; set; }

		public int OtherDrinkId { get; set; }
		public OtherDrink OtherDrink { get; set; }

		public int KitchenOrderId { get; set; }
        public KitchenOrder KitchenOrder { get; set; }

    }
}
