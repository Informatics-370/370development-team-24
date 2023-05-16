using Africanacity_Team24_INF370_.models.Restraurant;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class MenuItemViewModel
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<Menu_Type> MenuTypes { get; set; } = new List<Menu_Type>();

        public List<Food_Type> FoodTypes { get; set; } = new List<Food_Type>();

        public List<MenuItem_Category> MenuItem_Categories { get; set; } = new List<MenuItem_Category>();

    }
}
