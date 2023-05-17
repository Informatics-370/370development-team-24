using Africanacity_Team24_INF370_.models.Administration;
using Org.BouncyCastle.Bcpg.OpenPgp;

namespace Africanacity_Team24_INF370_.ViewModel
{
    public class EmployeeViewModel
    {
        public int EmployeeId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Surname { get; set; } = string.Empty;
        public string? Email_Address { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Physical_Address { get; set; } = string.Empty;

        //public Employee_Role RoleName { get; set; }
    }
}
