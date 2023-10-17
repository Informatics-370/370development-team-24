using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Administration
{
    public class VAT
    {
		[Key]
		public int vatId { get; set; }
		public decimal Amount { get; set; }

	}
}
