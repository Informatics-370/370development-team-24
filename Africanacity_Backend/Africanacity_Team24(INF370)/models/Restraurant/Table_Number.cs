using Africanacity_Team24_INF370_.models.Admin;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models.Restraurant
{
	public class Table_Number
	{
		[Key]
		public int Table_NumberId { get; set; }
		public int Number { get; set; }
		public List<Order> Orders { get; set; } = new List<Order>();


	}
}
