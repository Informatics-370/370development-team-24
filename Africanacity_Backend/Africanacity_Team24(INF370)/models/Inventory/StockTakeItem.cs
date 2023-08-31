using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Inventory
{
    public class StockTakeItem//ordered menu items
    {
        [Key]
        public int StockTakeItemId { get; set; }
        public int Quantity { get; set; }
        public int Inventory_ItemId { get; set; }
        public Inventory_Item Inventory_Item { get; set; }
        public int StockTake_Id { get; set; }
        public StockTake StockTake { get; set; }

        public virtual ICollection<WriteOffStock> WriteOffs { get; set; }

        public string Description { get; set; } // Add Description property

    }
}
