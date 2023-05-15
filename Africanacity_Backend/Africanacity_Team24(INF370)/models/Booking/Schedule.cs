using Africanacity_Team24_INF370_.models.Admin;
using Africanacity_Team24_INF370_.models.Administration;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
	public class Schedule
	{
		[Key]
		public int ScheduleId { get; set; }

		public DateTime Date { get; set; } 

		public DateTime Start_Time { get; set; } 

		public DateTime End_Time { get; set; }

		public List<Administrator> Administrators { get; set; } = new List<Administrator>();

		public List<Schedule_Status> Schedule_Statuses { get; set; } = new List<Schedule_Status>();

		public List<Entertainer> Entertainers { get; set; } = new List<Entertainer>();
	}
}
