using Africanacity_Team24_INF370_.models.Administration.Admin;

using Africanacity_Team24_INF370_.models.Administration;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Inventory
{
    public class Inventory_Item
	{
		[Key]
		public int Inventory_ItemId { get; set; }
    
 

        [MaxLength(50)]
        public string ItemName { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Description { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public int Inventory_TypeId { get; set; }

        public List<Supplier> Suppliers { get; set; } = new List<Supplier>();

        public virtual ICollection<Supplier_Inventory> Supplier_Inventorys { get; set; }

        public Inventory_Type Inventory_Type { get; set; }


    }
 }
