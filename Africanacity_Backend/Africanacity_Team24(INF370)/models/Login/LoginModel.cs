﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Africanacity_Team24_INF370_.models.Login
{
    public class LoginModel
    {
        [Required]
		[DataType(DataType.EmailAddress)]
		public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}
