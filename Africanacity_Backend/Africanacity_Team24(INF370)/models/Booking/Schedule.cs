using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
    public class Schedule: BaseEntity
	{
		[Key]
		public int ScheduleId { get; set; }

		public virtual ICollection<Pending_Booking> Pending_Bookings { get; set; }
	}
}
