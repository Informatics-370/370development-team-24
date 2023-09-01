using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Inventory
{
    public class StockTake//kitchen order
    {
        [Key]
        public int StockTake_Id { get; set; }
        public DateTime StockTake_Date { get; set; }


        public ICollection<StockTakeItem> StockTakeItems { get; set; }

    }
}
