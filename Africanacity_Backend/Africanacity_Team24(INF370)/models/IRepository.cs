using Africanacity_Team24_INF370_.models.Administration.Admin;
﻿using Africanacity_Team24_INF370_.Controllers;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Booking;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.ViewModel;
using Africanacity_Team24_INF370_.View_Models;
using System.Threading.Tasks;
using Africanacity_Team24_INF370_.models.Inventory;

using static Org.BouncyCastle.Asn1.Cmp.Challenge;
using Africanacity_Team24_INF370_.models.Login;

namespace Africanacity_Team24_INF370_.models
{
    public interface IRepository
    {
        object EmployeeViewModel { get; }

        //employee role
        Task<Employee_Role[]> GetAllEmployeeRolesAsync();
        Task <Employee_Role> GetEmployeeRoleAsync(int Employee_RoleId);

        Task<Gender[]> GetAllGendersAsync();

        /* Review entities here*/
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
		void Update<T>(T entity) where T : class;
		Task<bool> SaveChangesAsync();

        //EMPLOYEE
        Task<Employee[]> GetAllEmployeesAsync();
        Task<Employee> GetEmployeeAsync(int EmployeeId);

        Task<Employee> GetEmployeeByEmailAsync(string Email_Address);

        Task<IonicAppUser> GetEmployeeByUsernameAsync(string Username);

        Task<IonicAppUser> CheckPasswordAsync(string Password);

        //HELP

        Task<Help[]> GetAllHelpAsync();
        Task<Help> GetHelpAsync(int HelpId);




        // FOOD TYPE
        Task<Food_Type[]> GetAllFoodTypesAsync();
        Task<Food_Type> GetFoodTypeAsync(int FoodTypeId);

        //MENU ITEM 
        Task<MenuItem[]> GetAllMenuItemsAsync();

        Task<MenuItem> GetMenuItemAsync(int MenuItemId);

        Task<int> EditMenuItemAsync(int MenuItemId, MenuItemViewModel menuItem);

        Task<int> EditMenuItemWithPriceAsync(int MenuItemId, MenuItemViewModel menuItemViewModel, decimal amount);



        //MENU Types//
        Task<Menu_Type[]> GetAllMenuTypesAsync();
        Task<Menu_Type> GetMenuTypeAsync(int Menu_TypeId);
        //Task<List<MenuItem_Category>> GetMenuCategoriesForMenuTypeAsync(int Menu_TypeId);
        //Task<List<Food_Type>> GetFoodTypesForMenuTypeAsync(int Menu_TypeId);

        Task<int> EditMenuTypeAsync(int Menu_TypeId, MenuTypeViewModel menuTypeViewModel);

        //Menu Items prices
        Task<MenuItem_Price[]> GetAllMenuItemPricesAsync();
        Task<MenuItem_Price> GetAMenuItemPriceAsync(int menuItemId);

        //Task<int> EditMenuItemPriceAsync(int MenuItem_PriceId, MenuItemPriceViewModel menuItemPriceViewModel);



        //DRINK ITEM
        Task<Drink[]> GetAllDrinksAsync();
        Task<Drink> GetDrinkItemAsync(int DrinkId);


        //OTHER DRINK
        Task<OtherDrink[]> GetAllDrinkItemsAsync();

        Task<OtherDrink> GetADrinkItemAsync(int OtherDrinkId);


        // DRINK ITEM TYPE
        Task<Drink_Type[]> GetAllDrinkTypesAsync();
        Task<Drink_Type> GetDrinkTypeAsync(int Drink_TypeId);

        // DRINK ITEM
        //Task<Drink[]> GetAllDrinksAsync();
        Task<Drink> GetDrinkAsync(int Drink_TypeId);
        //DRINK ITEM PRICES
        Task<OtherDrinkPrice[]> GetAllDrinkItemPricesAsync();
        Task<OtherDrinkPrice> GetADrinkItemPriceAsync(int OtherDrinkPriceId);


        // MENU ITEM CATEGORY
        Task<MenuItem_Category[]> GetAllMenuItemCategoriesAsync();
        Task<MenuItem_Category> GetMenuItemCategoryAsync(int Menu_CategoryId);

        //SUPPLIER
        Task<Supplier[]> GetAllSuppliersAsync();
        Task<Supplier> GetSupplierAsync(int SupplierId);

        //SUPPLIER_TYPE
        Task<Supplier_Type[]> GetAllSupplierTypesAsync();
        Task<Supplier_Type> GetSupplierTypeAsync(int Supplier_TypeId);

        //INVENTORY_ITEM
        Task<Inventory_Item[]> GetAllInventoryItemsAsync();
        Task<Inventory_Item> GetInventoryItemAsync(int Inventory_ItemId);
        Task<Inventory_Item[]> GetInventoryItemsByTypeAsync(int inventory_TypeId);
        Task<List<Inventory_Price>> GetPricesByInventoryItemAsync(int inventory_ItemId);
        Task<Inventory_Price> GetInventoryPriceAsync(int InventoryPrice_Id);

        //STOCK TAKE
        Task<StockTakeItem[]> GetAllReconItemsAsync();

        //INVENTORY TYPES

        Task<Inventory_Type[]> GetAllInventoryTypesAsync();
        Task<Inventory_Type> GetInventoryTypeAsync(int Inventory_TypeId);

        Task<Supplier_Inventory[]> GetAllInventoryOrdersAsync();
       
        //SCHEDULE
        Task<Schedule> GetScheduleAsync(int schedule_Id);
        Task<Schedule[]> ScheduleDisplayAsync();
        Task<Schedule_Status[]> GetAllScheduleStatusAsync();

        //EVENTS
        Task<Event[]> GetAllEventsAsync();
        Task<Event> GetEventAsync(int EventId);

        //ENTERTAINMENT TYPE
        Task<Entertainment_Type[]> GetEntertainmentTypesAsync();
        Task<Entertainment_Type> GetEntertainmentTypeAsync(int Entertainment_TypeId);
        //TABLE NUMBER
        Task<Table_Number[]> GetAllTableNumbersAsync();

        //Kitchen order
        Task<KitchenOrder> SaveKitchenOrder(KitchenOrder kitchenOrder);
        Task<KitchenOrder[]> GetAllKitchenOrdersAsync();


       

        //DISCOUNT
        Task<Discount> GetDiscountItemAsync(int DiscountId);
        


    
		// Entertainer
		Task<User[]> ViewProfileAsync();
		Task<User> ViewProfileAsync(int UserId);
		Task<User[]> GetUsersAsync();

		// Admin
		Task<AdminInfor[]> ViewAdminProfileAsync();
		Task<AdminInfor> ViewAdminProfileAsync(int UserId);

		// Booking
		Task<Bookings[]> GetBookingsAsync();
		Task<Bookings> GetBookingAsync(int BookingId);
		//Task<Bookings> GetBookingInforAsync(string email);
		Task<List<Bookings>> GetBookingInforAsync(string email);
		//Task<Entertainment_Type[]> GetEntertainmentTypesAsync();
		Task<Schedule[]> GetSchedulesAsync();

		//Pending Booking
		Task<Pending_Booking[]> GetPendingsAsync();
		Task<Pending_Booking> GetPendingAsync(int BookingId);

        //VAT
        Task<VAT[]> GetAllVatPercentagesAsync();
        Task<VAT> GetAVatPercentageAsync(int VatId);

        //DISCOUNT
        Task<Discount[]> GetAllDiscountPercentagesAsync();
        Task<Discount> GetADiscountPercentageAsync(int VDiscountId);

        //Ordered Menu Items
        Task<Order_MenuItem[]> GetAllOrderedMenuItemsAsync();

        //Ordered drinks Items
        Task<Order_Drink[]> GetAllOrderedDrinksItemsAsync();
    }
}
