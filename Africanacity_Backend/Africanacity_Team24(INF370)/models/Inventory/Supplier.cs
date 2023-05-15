using Africanacity_Team24_INF370_.models.Admin;
using Africanacity_Team24_INF370_.models.Administration;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Inventory
{
	public class Supplier
	{
		[Key]
		public int SupplierId { get; set; }

		[MaxLength(50)]
		public string Surname { get; set; } = string.Empty;

		[MaxLength(50)]
		public string FirstName { get; set; } = string.Empty;

		[MaxLength(50)]
		public string? Email_Address { get; set; }
		public string? Physical_Address { get; set; }
		public string? City { get; set; }

		[StringLength(2)]
		public string? State { get; set; }

		[StringLength(5)]
		public string? PostalCode { get; set; }

		[StringLength(10)]
		public string PhoneNumber { get; set; } = string.Empty;

		public List<Supplier_Type> Supplier_Types { get; set; } = new List<Supplier_Type>();

		public List<Administrator> Administrators { get; set; } = new List<Administrator>();
		public List<Inventory_Item> Inventory_Items { get; set; } = new List<Inventory_Item>();
	}
}
