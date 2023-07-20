using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Africanacity_Team24_INF370_.models.Login
{
	public class OtpModel
	{

		[Required]
		 [DataType(DataType.EmailAddress)]
		public string userName { get; set; }

		[Required]
		public string otp { get; set; }
	}
}
