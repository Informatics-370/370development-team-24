using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
	public class OtherDrinkPrice
	{
		[Key]
		public int OtherDrinkPriceId { get; set; }
		public int OtherDrinkId { get; set; }

		public decimal Amount { get; set; }
	}
}