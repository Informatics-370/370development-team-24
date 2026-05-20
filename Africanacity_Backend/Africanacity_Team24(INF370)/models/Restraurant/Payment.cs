using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
	public class Payment
	{
		[Key]
		public int PaymentId { get; set; }

		[DisplayFormat(DataFormatString = "{0:0.00}")]
		public decimal Amount { get; set; }

	}
}
