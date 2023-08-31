using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
    public class Schedule
	{
        internal bool IsActive;
        internal bool IsDeleted;
        [Key]
		public int ScheduleId { get; set; }
		public string Title { get; set; }
		public DateTime Date { get; set; } 
		public DateTime Start_Time { get; set; }
		public DateTime End_Time { get; set; }

        public int EventId { get; set; }
		public string Description { get; set; }
		public int Schedule_StatusId { get; set; }

		public Event Event { get; set; }
		public Schedule_Status Schedule_Status { get; set; }
        public List<Entertainer> Entertainers { get; set; } = new List<Entertainer>();
	}
}
