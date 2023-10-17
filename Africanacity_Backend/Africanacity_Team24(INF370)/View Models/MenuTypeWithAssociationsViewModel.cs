using Africanacity_Team24_INF370_.models.Restraurant;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class MenuTypeWithAssociationsViewModel
    {
        [Key]
        public int Menu_TypeId { get; set; }

        public string Name { get; set; }

        public int Menu_CategoryId { get; set; } // Foreign Key to Menu_Category
       

        public int FoodTypeId { get; set; } // Foreign Key to Food_Type
        
    }
}
