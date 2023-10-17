using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Administration
{
    public class Discount
	{
		[Key]
		public int discountId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;

		public decimal Amount { get; set; }

		public DateTime Start_Date { get; set; }	
		public DateTime End_Date { get; set;}

	}
}
