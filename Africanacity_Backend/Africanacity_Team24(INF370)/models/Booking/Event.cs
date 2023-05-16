using Africanacity_Team24_INF370_.models.Admin;
using Africanacity_Team24_INF370_.models.Administration;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
	public class Event
	{
		[Key]
		public int EventId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

	}
}
