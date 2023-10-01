using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Core.Metadata.Edm;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class MenuItem_Category
	{
		[Key]
		public int Menu_CategoryId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;

        public int Menu_TypeId { get; set; } // will reference to the menu type

		public Menu_Type Menu_Type { get; set; }


        //the many to many associations
        // Navigation property for many-to-many relationship
        public ICollection<MenuCategoryFoodType> MenuCategoryFoodTypes { get; set; }

    }
}
