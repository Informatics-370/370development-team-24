using System.ComponentModel.DataAnnotations;
using System;


namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class KitchenOrder
    {
        public int KitchenOrderId { get; set; }
        public string TableNumber { get; set; }
        public string KitchenOrderNumber { get; set; }
        public List<MenuItem> OrderedItems { get; set; }
        public List<Drink> OrderedDrinks { get; set; }
        public decimal Subtotal { get; set; }
       
        public DateTime Timestamp { get; set; }

    }
}
