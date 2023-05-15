 using Africanacity_Team24_INF370_.models.Admin;
using Africanacity_Team24_INF370_.models.Administration;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Inventory
{
	public class Inventory_Item
	{
		[Key]
		public int Inventory_ItemId { get; set; }

		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;

		public List<Administrator> Administrators { get; set; } = new List<Administrator>();

		public List<Inventory_Type> Inventory_Types { get; set; } = new List<Inventory_Type>();
		public List<Supplier> Suppliers { get; set; } = new List<Supplier>();
	}
}
