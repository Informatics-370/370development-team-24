using Africanacity_Team24_INF370_.models.Admin;
using Africanacity_Team24_INF370_.models.Administration;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
	public class Order
	{
		[Key]
		public int OrderId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;

		public List<Table_Number> Table_Numbers { get; set; } = new List<Table_Number>();

		public List<Employee> Employees { get; set; } = new List<Employee>();

		public List<Order_Status> OrderStatuses { get; set; } = new List<Order_Status>();	
		public List<Payment_Method> PaymentMethods { get; set; } = new List<Payment_Method>();
		public List<Drink> Drinks { get; set; } = new List<Drink>();
		public List<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
	}
}
