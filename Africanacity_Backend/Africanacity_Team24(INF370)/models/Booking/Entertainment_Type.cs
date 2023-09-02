using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
    public class Entertainment_Type 
	{
		[Key]
		public int Entertainment_TypeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

		public virtual ICollection<Pending_Booking> Pending_Bookings { get; set; }
		public virtual ICollection<User> Users { get; set; }
	}

}

