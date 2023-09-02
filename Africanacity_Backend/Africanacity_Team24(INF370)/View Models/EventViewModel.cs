using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class EventViewModel
    {
        [Key]
        //public int EventId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
         
        public string Date { get; set; } = string.Empty;

        public string? Image { get; set; }
    }
}
