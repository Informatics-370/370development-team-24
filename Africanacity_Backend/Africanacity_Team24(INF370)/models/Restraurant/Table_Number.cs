using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class Table_Number
	{
		[Key]
		public int Table_NumberId { get; set; }
		public string TableID { get; set; }
		public List<Order> Orders { get; set; } = new List<Order>();


	}
}
