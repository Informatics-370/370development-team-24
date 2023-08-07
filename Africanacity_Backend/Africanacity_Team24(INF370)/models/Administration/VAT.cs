using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Administration
{
    public class VAT
    {
		[Key]
		public int VatId { get; set; }

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;

		public decimal Amount { get; set; }

	}
}
