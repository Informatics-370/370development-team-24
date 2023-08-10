using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Africanacity_Team24_INF370_.models.Login
{
	public class ForgotpasswordModel
	{

		[Required]
		[DataType(DataType.EmailAddress)]
		public string UserName { get; set; }	
	}
}
