using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
    public class Event
	{
		[Key]
		public int EventId { get; set; }

		[MaxLength(50)]
		public string Event_Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;

	}
}
