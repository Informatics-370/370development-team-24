using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class OrderItem
	{
		public int OrderId { get; set; }
        public Order Order { get; set; }
        public int DrinkQuantity { get; set; }
        public int MenuItemQuantity { get; set; }
        public decimal SubTotal { get; set; }
        public List<Drink> Drinks { get; set; } = new List<Drink>();
        public List<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
		public virtual ICollection<Drink_Price> DrinkPrices { get; set; }
		public virtual ICollection<MenuItem_Price> MenuItemPrices { get; set; }

    }
}
