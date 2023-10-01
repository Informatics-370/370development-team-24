using Africanacity_Team24_INF370_.models.Restraurant;

namespace Africanacity_Team24_INF370_.View_Models
{
    //fetches desired drink items information from the Order Summary card in the front end 
    public class OrderItemViewModel
    {
        public int OrderId { get; set; }
        public int DrinkQuantity { get; set; }
        public decimal DrinkPrice { get; set; }
        public int MenuItemQuantity { get; set; }
        public decimal MenuItemPrice { get; set; }
        //public decimal SubTotal { get; set; }

    }
}
