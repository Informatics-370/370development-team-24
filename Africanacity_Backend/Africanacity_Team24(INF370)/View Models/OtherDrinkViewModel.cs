using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.View_Models
{
	public class OtherDrinkViewModel
	{
		public int OtherDrinkId { get; set; }

	
		public string Name { get; set; } = string.Empty;

	
		public string Description { get; set; } = string.Empty;
		public int Drink_TypeId { get; set; }
	}
}
