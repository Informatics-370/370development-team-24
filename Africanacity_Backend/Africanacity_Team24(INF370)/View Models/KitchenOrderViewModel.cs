using Africanacity_Team24_INF370_.models.Restraurant;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class KitchenOrderViewModel
    {

       public int KitchenOrderId { get; set; }
        public string TableNumber { get; set; }
        public string KitchenOrderNumber { get; set; }
        public List<MenuItem> OrderedItems { get; set; }
        public List<Drink> OrderedDrinks { get; set; }
        public decimal Subtotal { get; set; }
        public decimal VAT { get; set; }
        public decimal Discount { get; set; }
        public decimal TotalAmount => Subtotal + VAT - Discount;

        public KitchenOrderViewModel(KitchenOrder kitchenOrder, decimal vat, decimal discount)
        {
            KitchenOrderId = kitchenOrder.KitchenOrderId;
            TableNumber = kitchenOrder.TableNumber;
            KitchenOrderNumber = kitchenOrder.KitchenOrderNumber;
            OrderedItems = kitchenOrder.OrderedItems;
            OrderedDrinks = kitchenOrder.OrderedDrinks;
            Subtotal = kitchenOrder.Subtotal;
            VAT = vat;
            Discount = discount;
            // Map other properties related to KitchenOrder as needed...
        }
    }
}
