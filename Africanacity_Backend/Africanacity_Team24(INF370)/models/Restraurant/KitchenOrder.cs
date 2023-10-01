using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class KitchenOrder
	{
        [Key]
        public int KitchenOrderId { get; set; }
        public DateTime Order_Date { get; set; }
        public string TableNumber { get; set; }
        public string KitchenOrderNumber { get; set; }
        public int EmployeeId { get; set; }
        public decimal Subtotal { get; set; }
        public decimal VAT { get; set; }
        public decimal Discount { get; set; }
        public decimal Total { get; set; }
        public Employee Employees { get; set; }
        public ICollection<Order_MenuItem> OrderedMenuItems { get; set; }
        //public ICollection<Order_Drink> OrderedDrinks { get; set; }

    }
}
