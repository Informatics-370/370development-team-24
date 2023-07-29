using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
    public class Schedule : BaseBookingEntity
	{
		[Key]
		public int ScheduleId { get; set; }
		public DateTime? Date { get; set; }

		public DateTime? Start_Time { get; set; }

		public DateTime? End_Time { get; set; }
		public virtual ICollection<Pending_Booking> Pending_Bookings { get; set; }
	}
}
