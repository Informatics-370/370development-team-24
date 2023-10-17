using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Africanacity_Team24_INF370_.models.Login
{
	public class UpdatePasswordModel
	{

		[DataType(DataType.Password)]
		public string OldPassword { get; set; }
		public string NewPassword { get; set; }
	}
}
