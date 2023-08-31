using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class KitchenOrderEditDto
    {
        [Key]
        public int KitchenOrderId { get; set; }
        public string TableNumber { get; set; }
        public string KitchenOrderNumber { get; set; }
        public decimal Subtotal { get; set; }
        public decimal VAT { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public List<BothOrderItemEditDto> OrderedItems { get; set; } // List of changes to order items
        public List<BothOrderItemEditDto> OrderedDrinks { get; set; } // List of changes to drink items
    }
}
