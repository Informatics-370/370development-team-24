using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
	public class MenuItem_Price
	{
		[Key]
		public int MenuItem_PriceId { get; set; }

		[DisplayFormat(DataFormatString = "{0:0.00}")]
		public decimal Amount { get; set; }

		public List<MenuItem> MenuItems { get; set; } = new List<MenuItem>();

	}
}
