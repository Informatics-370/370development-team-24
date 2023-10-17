using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;


namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class MenuTypeWithAssociations
    {
        [Key]
        public int Menu_TypeId { get; set; }

        public string Name { get; set; }

        public int Menu_CategoryId { get; set; } // Foreign Key to Menu_Category
        public MenuItem_Category Menu_Category { get; set; } // Navigation Property

        public int FoodTypeId { get; set; } // Foreign Key to Food_Type
        public Food_Type Food_Type { get; set; } // Navigation Property}
    }

}
