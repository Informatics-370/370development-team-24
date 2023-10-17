using System.ComponentModel.DataAnnotations;
using Africanacity_Team24_INF370_.models.Restraurant;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class OtherDrinkViewModel1
    {
        public int OtherDrinkId { get; set; }

        public string Name { get; set; } = string.Empty;
        public int DrinkType { get; set; } 
        public int DrinkId { get; set; }
        public int Drink_TypeId { get; set; }
    }
}
