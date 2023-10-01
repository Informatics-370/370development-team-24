using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;


namespace Africanacity_Team24_INF370_.models.Restraurant

{
	public class OtherDrink
	{
		[Key]
		public int OtherDrinkId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;
		public int Drink_TypeId { get; set; }


		//linked tables
		public Drink_Type Drink_Type { get; set; }

		//collecting data of the menu item price table from the menu item form
		public virtual ICollection<OtherDrinkPrice> OtherDrinkPrices { get; set; }
		public virtual ICollection<KitchenOrder> KitchenOrders { get; set; }
		public virtual ICollection<Order_Drink> OrderedDrinks { get; set; }

	}
}