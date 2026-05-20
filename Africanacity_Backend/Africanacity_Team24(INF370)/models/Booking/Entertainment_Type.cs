using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
	public class Entertainment_Type
	{
		[Key]
		public int Entertainment_TypeId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;

		public List<Entertainer> Entertainers { get; set; } = new List<Entertainer>();

	}
}
