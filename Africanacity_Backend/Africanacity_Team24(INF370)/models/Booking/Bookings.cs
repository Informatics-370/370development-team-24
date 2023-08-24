using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
    public class Bookings
	{
		[Key]
		public int BookingId { get; set; }

		public string? FirstName { get; set; }
		public string? LastName { get; set; }
		public string? Instagram { get; set; }
		public string? Email { get; set; }

		[DataType(DataType.PhoneNumber)]
		[StringLength(10)]
		public string? ContactNumber { get; set; }
		public string? Demo { get; set; }
		public int Entertainment_TypeId { get; set; }
		public Entertainment_Type EntertainmentType { get; set; }
		//public int EventId { get; set; }
		//public Event Event { get; set; }
		public string? Eventname { get; set; }
		public string? Additional { get; set; }
		//public string DemoFileName { get; set; } // Property to store the file name
		//public IFormFile DemoFile { get; set; } //
	}
}
