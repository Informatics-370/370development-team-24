using Africanacity_Team24_INF370_.models.Restraurant;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class MenuItemViewModel
    {
        public int MenuItemId { get; set; }

        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public int Menu_TypeId { get; set; }

        [Required]
        public int Menu_CategoryId { get; set; }

        [Required]
        public int FoodTypeId { get; set; }

        [Required]
        public decimal Amount { get; set; }







    }
}
