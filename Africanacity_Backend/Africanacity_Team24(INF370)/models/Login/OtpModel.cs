using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Africanacity_Team24_INF370_.models.Login
{
	public class OtpModel
	{

		public string PhoneNumber { get; set; }
        public string Otp { get; set; }
	}
}
