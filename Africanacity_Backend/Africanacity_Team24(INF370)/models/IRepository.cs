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
        Task<bool> SaveChangesAsync();

        //EMPLOYEE
        Task<Employee[]> GetAllEmployeesAsync();
        Task<Employee> GetEmployeeAsync(int EmployeeId);

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


        //MENU Types//
        Task<Menu_Type[]> GetAllMenuTypesAsync();
        Task<Menu_Type> GetMenuTypeAsync(int Menu_TypeId);

        Task<int> EditMenuTypeAsync(int Menu_TypeId, MenuTypeViewModel menuTypeViewModel);

        //Menu Items prices
        Task<MenuItem_Price[]> GetAllMenuItemPricesAsync();
        Task<MenuItem_Price> GetAMenuItemPriceAsync(int MenuItem_PriceId);

        Task<int> EditMenuItemPriceAsync(int MenuItem_PriceId, MenuItemPriceViewModel menuItemPriceViewModel);



        //DRINK ITEM
        Task<Drink[]> GetAllDrinksAsync();
        Task<Drink> GetDrinkItemAsync(int DrinkId);

     

        // DRINK ITEM TYPE
        Task<Drink_Type[]> GetAllDrinkTypesAsync();
        Task<Drink_Type> GetDrinkTypeAsync(int Drink_TypeId);

        // DRINK ITEM
        //Task<Drink[]> GetAllDrinksAsync();
        Task<Drink> GetDrinkAsync(int Drink_TypeId);
        //DRINK ITEM PRICES
        Task<Drink_Price[]> GetAllDrinkItemPricesAsync();
        Task<Drink_Price> GetADrinkItemPriceAsync(int Drink_PriceId);


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

        //STOCK TAKE
        Task<StockTakeItem[]> GetAllReconItemsAsync();

        //INVENTORY TYPES

        Task<Inventory_Type[]> GetAllInventoryTypesAsync();
        Task<Inventory_Type> GetInventoryTypeAsync(int Inventory_TypeId);

        Task<Supplier_Inventory[]> GetAllInventoryOrdersAsync();
       
        //SCHEDULE
        Task<Schedule> GetScheduleAsync(int schedule_Id);
        Task<Schedule[]> ScheduleDisplayAsync();

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


        //VAT
        Task<VAT> GetVatItemAsync(int VatId);

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
	}
}
