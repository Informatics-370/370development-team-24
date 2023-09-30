using Africanacity_Team24_INF370_.models.Restraurant;

namespace Africanacity_Team24_INF370_.View_Models
{
    //fetches desired drink items information from the Order Summary card in the front end 
    public class OrderItemViewModel
    {
        public int OrderId { get; set; }
        public List<Drink> Drinks { get; set; }
        public int DrinkQuantity { get; set; }
        public decimal DrinkPrice { get; set; }
        public List<MenuItem> MenuItems { get; set; }
        public int MenuItemQuantity { get; set; }
        public int MenuItemPrice { get; set; }
        public decimal SubTotal { get; set; }
        public decimal OrderTotal { get; set; }

    }
}
