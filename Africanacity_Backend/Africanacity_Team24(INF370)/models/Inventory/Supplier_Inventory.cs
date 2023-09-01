using Africanacity_Team24_INF370_.models.Administration.Admin;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Africanacity_Team24_INF370_.models.Inventory
{

    public class Supplier_Inventory
    {
        [Key]
        public int SupplierItemId { get; set; }
      

        //// Foreign key to the Supplier entity
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }

       public DateTime Ordered_Date { get; set; }

       public DateTime Received_Date { get; set; } 

        public int Ordered_Quantity { get; set; }

       public string? InventoryItemName { get; set; }
    }
}