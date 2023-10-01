using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;
using Africanacity_Team24_INF370_.models.Inventory;
using Africanacity_Team24_INF370_.models.Booking;

namespace Africanacity_Team24_INF370_.models.Administration
{
    public class Administrator
	{
		[Key]
		public int AdministratorId { get; set; }

		[MaxLength(50)]
		public string Surname { get; set; } = string.Empty;

		[MaxLength(50)]
		public string FirstName { get; set; } = string.Empty;

		[MaxLength(50)]
		public string? Email_Address { get; set; }
		public string? Physical_Address { get; set; }

		[StringLength(10)]
		public string PhoneNumber { get; set; } = string.Empty;

		public List<Discount> Discounts { get; set; } = new List<Discount>();
		public List<Inventory_Item> Inventorys { get; set; } = new List<Inventory_Item>();
		public List<Supplier> Suppliers { get; set; } = new List<Supplier>();

		public List<Event> Events { get; set; } = new List<Event>();

		public List<Schedule> Schedules { get; set; } = new List<Schedule>();
		//public List<Help> Helps { get; set; } = new List<Help>();
	}
}
