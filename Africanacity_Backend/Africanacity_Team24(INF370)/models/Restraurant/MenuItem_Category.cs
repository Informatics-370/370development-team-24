using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

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

		public virtual ICollection<MenuItem_Category> MenuItems { get; set; }

	}
}
