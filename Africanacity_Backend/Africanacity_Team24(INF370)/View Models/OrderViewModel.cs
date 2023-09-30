using Africanacity_Team24_INF370_.models.Restraurant;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class OrderViewModel
    {
        
        public string TableNumber { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public int Employee { get; set; }
        public decimal Subtotal { get; set; }
        public decimal VAT { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public List<OrderItemViewModel> OrderItems { get; set;} = new List<OrderItemViewModel>();

    }
}
