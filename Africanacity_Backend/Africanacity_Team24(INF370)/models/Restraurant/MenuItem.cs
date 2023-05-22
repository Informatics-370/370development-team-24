using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
	public class MenuItem
	{
		[Key]
		public int MenuItemId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;

		public int Menu_TypeId { get; set; }
		public int Menu_CategoryId { get; set; }
		public int FoodTypeId { get; set; }

		
		public virtual Menu_Type Menu_Type { get; set; }
		public virtual MenuItem_Category MenuItem_Category { get; set; }
		public virtual Food_Type Food_Type { get; set; }

        public List<Order> Orders { get; set; } = new List<Order>();



    }
}
