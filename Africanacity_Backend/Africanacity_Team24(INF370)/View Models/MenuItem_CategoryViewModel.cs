using Africanacity_Team24_INF370_.models.Restraurant;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class MenuItem_CategoryViewModel
    {
        //public int Menu_CategoryId { get; set; }
        [Required]
        public string Name { get; set; } 
        public string Description { get; set; }

        [Required]
        public int Menu_TypeId { get; set; }
    }
}
