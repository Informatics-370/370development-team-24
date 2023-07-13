namespace Africanacity_Team24_INF370_.View_Models
{
    public class SupplierViewModel
    {
        public int SupplierId { get; set; }
        public string Name { get; set; } = string.Empty; 
        public string PhoneNumber { get; set;} = string.Empty;
        public string Email_Address { get; set; } = string.Empty;
        public string Physical_Address { get; set; } = string.Empty;
        public int SupplierTypeId { get; set; }
        public string SupplierTypeName { get; set; } = string.Empty;

    }
}
