using Africanacity_Team24_INF370_.models.Administration;
using Org.BouncyCastle.Bcpg.OpenPgp;

namespace Africanacity_Team24_INF370_.ViewModel
{
    public class EmployeeViewModel
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; } 
        public string Surname { get; set; } 
        public string Email_Address { get; set; } 
        public string PhoneNumber { get; set; } 
        public string Physical_Address { get; set; } 

        public int employeeRole { get; set; }

        //public Employee_Role RoleName { get; set; }
    }
}
