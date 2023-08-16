using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Inventory
{
    public class StockTake
    {
        [Key]
        public int StockTake_Id { get; set; }
        public DateTime StockTake_Date { get; set; }

        //public int Inventory_ItemId { get; set; }   

        //public Inventory_Item Inventory_Items { get; set; } 

        public ICollection<StockTakeItem> StockTakeItems { get; set; }

    }
}
