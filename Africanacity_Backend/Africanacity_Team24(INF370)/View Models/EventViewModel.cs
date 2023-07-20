using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class EventViewModel
    {
        [Key]
        public int EventId { get; set; }
        public string Event_Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
