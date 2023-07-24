using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models
{
	public class BookingView
	{
		public int entertainmenttype { get; set; }
		public int schedule { get; set; }
		public string firstname { get; set; }
		public string lastname { get; set; }
		public string email { get; set; }

		[DataType(DataType.PhoneNumber)]
		[StringLength(10)]
		public string phoneNumber { get; set; }
		public string? Demo { get; set; }
	}
}
