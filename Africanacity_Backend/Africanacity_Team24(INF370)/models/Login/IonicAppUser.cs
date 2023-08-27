using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Africanacity_Team24_INF370_.models.Login
{
    public class IonicAppUser
    {
        public int IonicAppUserId { get; set; } // Add a unique identifier for the user
        public string Username { get; set; }
        public string Email_Address { get; set; }
        public string Password { get; set; }

    }
}
