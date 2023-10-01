using Africanacity_Team24_INF370_.models.Restraurant;
using System.Linq;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class KitchenOrderDto
    {
        public DateTime Order_Date { get; set; }
        public string TableNumber { get; set; }
        public string KitchenOrderNumber { get; set; }
        public decimal Subtotal { get; set; }
        public decimal VAT { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public int Employee { get; set; }
        public List<OrderMenuItemDto> orderMenuItemDtos { get; set; }
        public List<OrderDrinkDto> orderDrinkDtos { get; set;}
     
    }
}
