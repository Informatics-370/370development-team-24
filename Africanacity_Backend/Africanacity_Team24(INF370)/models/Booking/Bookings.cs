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

		public List<Booking_Status> Booking_Statuses { get; set; } = new List<Booking_Status>();

		public List<Event> Events { get; set; } = new List<Event>();

		public List<Entertainer> Entertainers { get; set;} = new List<Entertainer>();
	}
}
