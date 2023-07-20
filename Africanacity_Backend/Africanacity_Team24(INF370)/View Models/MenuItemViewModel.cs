using Africanacity_Team24_INF370_.models.Restraurant;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class MenuItemViewModel
    {
        public int MenuItemId { get; set; } 
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Food_Type { get; set; } = string.Empty;
        public string Menu_Type { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;

      

    }
}
