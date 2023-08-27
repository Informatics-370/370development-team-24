using Africanacity_Team24_INF370_.View_Models;

using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Inventory
{
    public class WriteOffStock
    {
        [Key]
        public int WriteOffId { get; set; }
        public int StockTakeItemId { get; set; }
        public string Reason { get; set; }

        public string Description { get; set; }

        //public int QuantityDifference { get; set; }

        public StockTakeItem StockTakeItem { get; set; }

        //public List<DiscrepencyItem> DiscrepencyItems { get; set; }


    }
}
