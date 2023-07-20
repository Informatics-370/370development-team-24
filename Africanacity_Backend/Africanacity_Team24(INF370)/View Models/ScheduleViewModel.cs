using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class ScheduleViewModel
    {
        [Key]
       
        public int Schedule_Id { get; set; }
        public DateTime Date { get; set; }

        public DateTime Start_Time { get; set; }

        public DateTime End_Time { get; set; }
        public int EventId { get; set; }
    }
}
