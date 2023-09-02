using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class Drink_Type

	{
		[Key]
		public int Drink_TypeId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		//public virtual ICollection<Drink> Drinks { get; set; }

  //      public virtual ICollection<OtherDrink> OtherDrinks { get; set; }

        public List<Drink> Drinks { get; set; } = new List<Drink>();
    }
}
