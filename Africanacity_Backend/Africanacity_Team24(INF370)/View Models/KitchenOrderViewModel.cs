using Africanacity_Team24_INF370_.models.Restraurant;
using System.Linq;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class KitchenOrderViewModel
    {
        public int KitchenOrderId { get; set; }
        public string TableNumber { get; set; }
        public string KitchenOrderNumber { get; set; }
        public List<string> OrderedItems { get; set; } // List of ordered item names
        public List<string> OrderedDrinks { get; set; }
        public decimal Subtotal { get; set; }
       

        // Empty constructor required for deserializationa
        public KitchenOrderViewModel()
        {
            OrderedItems = new List<string>();
            OrderedDrinks = new List<string>();
        }


    }
}
