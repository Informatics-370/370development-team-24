using Africanacity_Team24_INF370_.models.Administration.Admin;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;



namespace Africanacity_Team24_INF370_.models.Restraurant
{
    public class MenuItem
	{
        internal bool IsActive;
        internal bool IsDeleted;

        [Key]
		public int MenuItemId { get; set; }

       
		[MaxLength(50)]
		public string Name { get; set; } = string.Empty;

		[MaxLength(100)]
		public string Description { get; set; } = string.Empty;

		public int Menu_TypeId { get; set; }  //tree diagram fk to MenuType table
        [JsonIgnore]
        public Menu_Type Menu_Type { get; set; } // navigation property to MenuType
        public int Menu_CategoryId { get; set; } //tree diagram fk to MenuItemCategory table

        [JsonIgnore]
        public MenuItem_Category MenuItem_Category { get; set; }// navigation property to MenuCategory 
        public int FoodTypeId { get; set; } //tree diagram fk to FoodType table

        [JsonIgnore]
        public Food_Type Food_Type { get; set; } // navigation property to Food Type

        //linked tables

       

        //public List<KitchenOrder> KitchenOrders { get; set; } = new List<KitchenOrder>();
        //collecting data of the menu item price table from the menu item form
        public virtual ICollection<MenuItem_Price> MenuItem_Prices { get; set; }
		public virtual ICollection<KitchenOrder> KitchenOrders { get; set; }
		public virtual ICollection<Order_MenuItem> OrderedMenuItems { get; set; }



    }
}
