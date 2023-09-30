using System.ComponentModel.DataAnnotations;
using Africanacity_Team24_INF370_.models.Administration;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        public string TableNumber { get; set; }
        public string OrderNumber { get; set; }
        public DateTime Order_Date { get; set; }
        public int EmployeeId { get; set; }
        public decimal Subtotal { get; set; }
        public decimal VAT { get; set; }
        public decimal? Discount { get; set; }
        public decimal Total { get; set; }
        public Employee Employee { get; set; }
        public List<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

    }
}
