using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Inventory
{
    public class DiscrepencyItem
    {
        [Key]
        public int DiscrepId { get; set; }
        public string Description { get; set; }
        public int QuantityDifference { get; set; }

        public int Inventory_ItemId { get; set; }

        public string ItemName { get; set; }

        public string Reason { get; set; }
    }
}