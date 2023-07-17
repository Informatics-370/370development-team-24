using Africanacity_Team24_INF370_.models.Restraurant;
using Org.BouncyCastle.Asn1.Mozilla;
using System.ComponentModel.DataAnnotations;

namespace Africanacity_Team24_INF370_.View_Models

{
    public class MenuItemPriceViewModel
    {
        public int MenuItem_PriceId { get; set; }
        
        public int MenuItemId { get; set; }

        public decimal Amount { get; set; }



    }
}
