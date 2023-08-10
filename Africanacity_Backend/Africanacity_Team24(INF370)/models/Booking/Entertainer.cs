using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
    public class Entertainer
	{
		[Key]
		public int EntertainerId { get; set; }

		[MaxLength(50)]
		public string Surname { get; set; } = string.Empty;

		[MaxLength(50)]
		public string FirstName { get; set; } = string.Empty;

		[MaxLength(50)]
		public string? Email_Address { get; set; }
		public string? Physical_Address { get; set; }

		[StringLength(10)]
		public string PhoneNumber { get; set; } = string.Empty;

		public List<Bookings> Booking { get; set; } = new List<Bookings>();

		public List<Entertainment_Type> Entertainment_Types { get; set; } = new List<Entertainment_Type>();
		public List<Schedule> Schedules { get; set; } = new List<Schedule>();

	}
}
