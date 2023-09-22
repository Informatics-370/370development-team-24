using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Core.Metadata.Edm;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class Food_Type
    {
		[Key]
		public int FoodTypeId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;

        //TREE DIAGRAM
        public int Menu_TypeId { get; set; } // Foreign key to MenuType
        public Menu_Type MenuType { get; set; } // Navigation property to MenuType

        //public virtual ICollection<MenuItem> MenuItems { get; set; }	

	}
}
