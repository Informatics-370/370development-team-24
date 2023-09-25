using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class Menu_Type
	{
		[Key]
		public int Menu_TypeId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

      
        //TREE DIAGRAMe
        //navigation propertis
        public List<MenuItem_Category> MenuCategories { get; set; } = new List<MenuItem_Category>();
        public List<Food_Type> FoodTypes { get; set; } = new List<Food_Type>();
      

    }
}
