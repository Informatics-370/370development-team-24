using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class Payment_Method
	{
		[Key]
		public int Payment_MethodId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		//public List<Order> Orders { get; set; } = new List<Order>();
		public List<KitchenOrder> Orders { get; set; } = new List<KitchenOrder>();
		//public List<Payment> Payment_Methods { get; set; } = new List<Payment>();
	}
}
