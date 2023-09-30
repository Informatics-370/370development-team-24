using Africanacity_Team24_INF370_.models.Administration.Admin;

using System.ComponentModel.DataAnnotations;


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

		public int Menu_TypeId { get; set; }
		public int Menu_CategoryId { get; set; }
		public int FoodTypeId { get; set; }

	//linked tables
		public  Menu_Type Menu_Type { get; set; }
		public MenuItem_Category MenuItem_Category { get; set; }
		public Food_Type Food_Type{ get; set; }
       

        public List<Order> Orders { get; set; } = new List<Order>();

        //public List<KitchenOrder> KitchenOrders { get; set; } = new List<KitchenOrder>();
        //collecting data of the menu item price table from the menu item form
        public virtual ICollection<MenuItem_Price> MenuItem_Prices { get; set; }
		//public virtual ICollection<Order> Orders { get; set; }
		//public virtual ICollection<Order_MenuItem> OrderedMenuItems { get; set; }



    }
}
