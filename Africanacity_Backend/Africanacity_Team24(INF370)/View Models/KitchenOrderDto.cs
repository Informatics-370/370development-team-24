using Africanacity_Team24_INF370_.models.Restraurant;
using System.Linq;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class KitchenOrderDto
    {
        
        public string TableNumber { get; set; }
        public string KitchenOrderNumber { get; set; }
        //public List<MenuItem> OrderedMenuItems { get; set; } // List of ordered item names
        //public List<OtherDrink> OrderedDrinks { get; set; }
        public decimal Subtotal { get; set; }
        public decimal VAT { get; set; }
        public decimal Discount { get; set; }

        public decimal Total { get; set; }
        public DateTime Order_Date { get; set; }

        public List<OrderMenuItemDto> orderMenuItemDtos { get; set; }
        public List<OrderDrinkDto> orderDrinkDtos { get; set;}
       

        // Empty constructor required for deserializationa
       


    }
}
