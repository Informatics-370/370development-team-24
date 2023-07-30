using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class Drink_Price
	{
		[Key]
		public int Drink_PriceId { get; set; }

		public decimal Amount { get; set; }

		public int DrinkId { get; set; }

	}
}
