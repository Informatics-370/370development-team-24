namespace Africanacity_Team24_INF370_.View_Models
{

    public class SupplierInventoryVM
    {
       
        public int SupplierNames { get; set; }
        public DateTime Ordered_Date { get; set; }
        public DateTime Received_Date { get; set; }
        public int Ordered_Quantity { get; set; }

        public string InventoryItemName { get; set; }
    }

}