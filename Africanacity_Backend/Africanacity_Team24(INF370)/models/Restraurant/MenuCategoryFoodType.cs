using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant

{
    public class MenuCategoryFoodType
    {
        [Key]
        public int MenuCategoryFoodType_Id { get; set; }
        public int Menu_CategoryId { get; set; }
        public MenuItem_Category MenuItem_Category { get; set; }

        public int FoodTypeId { get; set; }
        public Food_Type Food_Type { get; set; }


    }
}
