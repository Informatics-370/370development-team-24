using Africanacity_Team24_INF370_.models.Inventory;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class StockTakeViewModel
    {

        public DateTime StockTakeDate { get; set; }


        public List<StockTakeBatchViewModel> Items { get; set; }
        //public List<StockTakeItem> DiscrepancyItems { get; internal set; }
    }

}