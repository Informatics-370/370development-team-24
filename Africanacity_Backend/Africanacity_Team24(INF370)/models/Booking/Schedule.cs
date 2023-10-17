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
		public string Date { get; set; } 
		public string Start_Time { get; set; }
		public string End_Time { get; set; }

        public int EventId { get; set; }
		public string Description { get; set; }

		public Event Event { get; set; }
        public List<Entertainer> Entertainers { get; set; } = new List<Entertainer>();
	}
}
