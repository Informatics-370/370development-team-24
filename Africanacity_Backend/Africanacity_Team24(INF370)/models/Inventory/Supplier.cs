using Africanacity_Team24_INF370_.models.Admin;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Restraurant;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Inventory
{
    public class Supplier
	{

        [Key]
        public int SupplierId { get; set; }

        [MaxLength(50)]
        public string SupplierName { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? Email_Address { get; set; }
        public string? Physical_Address { get; set; }

        [StringLength(10)]
        public string PhoneNumber { get; set; } = string.Empty;

        public List<Inventory_Item> Inventory_Items { get; set; } = new List<Inventory_Item>();

        public virtual ICollection<Supplier_Inventory> Supplier_Inventorys { get; set; }

        public int Supplier_TypeId { get; set; }

        // Connecting the SuppliertypeModel

        public Supplier_Type Supplier_Type { get; set; }
    }
}