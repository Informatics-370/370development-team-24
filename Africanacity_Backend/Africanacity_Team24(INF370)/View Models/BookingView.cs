using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.models
{
	public class BookingView
	{
		public int entertainmenttype { get; set; }
		//public int schedule { get; set; }
		public string FirstName { get; set; }
		public string LastName { get; set; }

		[DataType(DataType.EmailAddress)]
		public string Email { get; set; }

		[DataType(DataType.PhoneNumber)]
		[StringLength(10)]
		public string ContactNumber { get; set; }
		public string? Demo { get; set; }
	}
}
