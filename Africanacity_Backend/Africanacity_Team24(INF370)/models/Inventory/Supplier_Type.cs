using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Inventory
{
	public class Supplier_Type : BaseEntity
	{
		[Key]
		public int Supplier_TypeId { get; set; }

		//[MaxLength(50)]
		//public string Name { get; set; } = string.Empty;

		//[MaxLength(100)]
		//public string Description { get; set; } = string.Empty;

        public virtual ICollection<Supplier> Suppliers { get; set; }

        //public List<Supplier> Suppliers { get; set; } = new List<Supplier>();

    }
}
