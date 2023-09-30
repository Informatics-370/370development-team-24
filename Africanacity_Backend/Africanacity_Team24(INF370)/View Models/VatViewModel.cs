using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.View_Models
{
    public class VatViewModel
    {
        [Key]
        public int vatId { get; set; }
        public decimal Amount { get; set; }
    }
}
