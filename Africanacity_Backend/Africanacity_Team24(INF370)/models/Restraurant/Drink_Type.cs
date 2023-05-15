using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
	public class Drink_Type
	{
		[Key]
		public int Drink_TypeId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;
	}
}
