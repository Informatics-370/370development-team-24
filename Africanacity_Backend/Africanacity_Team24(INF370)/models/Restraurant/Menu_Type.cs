using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
	public class Menu_Type
	{
		[Key]
		public int Menu_TypeId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		public List<MenuItem> MenuItems { get; set; } = new List<MenuItem>();

	}
}
