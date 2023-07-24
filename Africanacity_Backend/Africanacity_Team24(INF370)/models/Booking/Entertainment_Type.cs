using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Booking
{
    public class Entertainment_Type: BaseEntity
	{
		[Key]
		public int Entertainment_TypeId { get; set; }

		public virtual ICollection<Pending_Booking> Pending_Bookings { get; set; }
	}

}

