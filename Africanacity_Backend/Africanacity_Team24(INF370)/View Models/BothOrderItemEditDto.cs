using System.ComponentModel.DataAnnotations;
namespace Africanacity_Team24_INF370_.View_Models
{
    public class BothOrderItemEditDto
    {
        [Key]
        public int BothOrderItemId { get; set; }
        public int ItemId { get; set; } // ID of the menu item or drink item
        public string ItemName { get; set; } // Name of the menu item or drink item
        public int Quantity { get; set; } // Updated quantity
        public string Description { get; set; } // Small description for specific changes
        public bool IsRemoved { get; set; } // Indicates if the item should be removed
        public bool IsAdded { get; set; } // Indicates if the item should be added

    }
}
