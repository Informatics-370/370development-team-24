using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Inventory
{
    public class Inventory_Price
    {
        [Key]
        public int InventoryPrice_Id { get; set; }

        public decimal Price { get; set; }

        public DateTime Date { get; set; }

      
        public int Inventory_ItemId { get; set; }

       // public Inventory_Item Inventory_Items { get; set; }

    }
}
