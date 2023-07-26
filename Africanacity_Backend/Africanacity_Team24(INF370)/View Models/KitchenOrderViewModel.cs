using Africanacity_Team24_INF370_.models.Restraurant;
using System.Linq;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class KitchenOrderViewModel
    {
        public int KitchenOrderId { get; set; }
        public string TableNumber { get; set; }
        public string KitchenOrderNumber { get; set; }
        public List<MenuItemViewModel> OrderedItems { get; set; } = new List<MenuItemViewModel>();
        public List<DrinkViewModel> OrderedDrinks { get; set; } = new List<DrinkViewModel>();
        public decimal Subtotal { get; set; }
        public decimal VAT { get; set; }
        public decimal Discount { get; set; }

        // Empty constructor required for deserializationa
        public KitchenOrderViewModel()
        {
        }

      
    }
}
