using System.ComponentModel.DataAnnotations;
using System;


namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class KitchenOrder
    {
        [Key]
        public int KitchenOrderId { get; set; }
        public string TableNumber { get; set; }
        public string KitchenOrderNumber { get; set; }

        //public string OrderedMenuItems { get; set; }
        //public string OrderedDrinks { get; set; }
       
        public decimal Subtotal { get; set; }
        public decimal Discount { get; set; }
        public decimal VAT { get; set; }
        
        public decimal Total { get; set; }

        public ICollection<Order_MenuItem> OrderedMenuItems { get; set; }
        public ICollection<Order_Drink> OrderedDrinks { get; set; }










    }
}
