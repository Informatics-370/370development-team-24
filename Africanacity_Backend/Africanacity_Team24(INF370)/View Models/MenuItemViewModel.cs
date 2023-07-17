using Africanacity_Team24_INF370_.models.Restraurant;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class MenuItemViewModel
    {
        public int MenuItemId { get; set; } 
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int FoodTypeId { get; set; }
        public int MenuTypeId { get; set; }
        public int MenuCategoryId { get; set; } 

        public int MenuItem_PriceId { get; set; }

      

    }
}
