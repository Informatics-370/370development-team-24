using Africanacity_Team24_INF370_.models.Administration.Admin;
using Africanacity_Team24_INF370_.models.Restraurant;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
	public class Event 
	{
		[Key]
		public int EventId { get; set; }

		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;

		public string Date { get; set;} = string.Empty;
		public string? Image { get; set; }

		public virtual ICollection<Pending_Booking> Pending_Bookings { get; set; }
		public virtual ICollection<Schedule> Schedules { get; set; }
		//public List<Schedule> Schedules { get; set; } = new List<Schedule>();

	}
}
