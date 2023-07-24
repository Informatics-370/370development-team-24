using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
    public class Bookings
	{
		[Key]
		public int BookingId { get; set; }

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;
		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? Email { get; set; }
		public string? ContactNumber { get; set; }
		public string? Demo { get; set; }
		public int EntertainmentTypeId { get; set; }
		public Entertainment_Type EntertainmentType { get; set; }
		public int ScheduleId { get; set; }
		public Schedule Schedule { get; set; }

	}
}
