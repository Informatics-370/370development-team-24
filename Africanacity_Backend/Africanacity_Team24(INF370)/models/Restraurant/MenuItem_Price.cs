using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class MenuItem_Price
	{
		[Key]
		public int MenuItem_PriceId { get; set; }
		public int MenuItemId { get; set; }
		public decimal Amount { get; set; }



	}
}
