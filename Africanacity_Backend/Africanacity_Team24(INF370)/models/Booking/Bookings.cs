using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
	public class Bookings
	{
		[Key]
		public int BookingId { get; set; }

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;
	}
}
