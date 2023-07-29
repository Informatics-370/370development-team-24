using Africanacity_Team24_INF370_.models.Booking;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class ScheduleViewModel
    {
       
       
        public int Schedule_Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }

        public string Start_Time { get; set; }

        public string End_Time { get; set; }
        public  string Description { get; set; }
        public int EventName { get; set; }
    }
}
