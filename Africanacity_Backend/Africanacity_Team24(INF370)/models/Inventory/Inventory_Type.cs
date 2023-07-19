using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Inventory
{
	public class Inventory_Type : BaseEntity
	{
		[Key]
		public int Inventory_TypeId { get; set; }

        public virtual ICollection<Inventory_Item> Inventory_Items { get; set; }

        //public List<Inventory_Item> Inventorys { get; set; } = new List<Inventory_Item>();
	}
}
