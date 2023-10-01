using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class MenuTypeViewModel
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        
    }
}
