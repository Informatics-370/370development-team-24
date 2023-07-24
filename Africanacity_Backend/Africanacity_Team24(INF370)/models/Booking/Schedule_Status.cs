using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
    public class Schedule_Status
	{
		[Key]
		public int Schedule_StatusId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;
		public List<Schedule> Schedules { get; set; } = new List<Schedule>();

	}
}
