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



        //TREE DIAGRAM
        // Navigation properties
        public int MenuTypeId { get; set; } // Foreign key to MenuType
        public Menu_Type MenuType { get; set; } // Navigation property to MenuType
        public virtual ICollection<MenuItem_Category> MenuItems { get; set; }


    }
}
