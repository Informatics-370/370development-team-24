
using Africanacity_Team24_INF370_.models.Administration;
﻿using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.ViewModel;
using Africanacity_Team24_INF370_.View_Models;
using Microsoft.EntityFrameworkCore;
using Africanacity_Team24_INF370_.models.Inventory;
using System.Linq;
﻿using Africanacity_Team24_INF370_.models.Administration.Admin;
using Africanacity_Team24_INF370_.models.Login;

using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;

using Serilog;
using System.Net;
using System.Security.Policy;
using Africanacity_Team24_INF370_.models.Booking;


namespace Africanacity_Team24_INF370_.models
{
    public class Repository: IRepository
	{
		private readonly AppDbContext _appDbContext;
        

        public object EmployeeViewModel => throw new NotImplementedException();

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
            
        }

        // EMPLOYEES
        public async Task<Employee[]> GetAllEmployeesAsync()
        {
            IQueryable<Employee> query = _appDbContext.Employees.Include(e => e.Employee_Role).Include(e => e.Gender);
            return await query.ToArrayAsync();
        }
        public async Task<Employee> GetEmployeeAsync(int employeeId)
        {
            IQueryable<Employee> query = _appDbContext.Employees.Where(e => e.EmployeeId == employeeId);
            return await query.FirstOrDefaultAsync();
        }

        //FOR IONIC APP 
        //for sign up
        public async Task<Employee> GetEmployeeByEmailAsync(string Email_Address)
        {
            IQueryable<Employee> query = _appDbContext.Employees.Where(e => e.Email_Address == Email_Address);
            return await query.FirstOrDefaultAsync();
        }

        //for login
        public async Task<IonicAppUser> GetEmployeeByUsernameAsync(string Username)
        {
            IQueryable<IonicAppUser> query = _appDbContext.IonicAppUsers.Where(e => e.Username == Username);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<IonicAppUser> CheckPasswordAsync(string Password)
        {
            IQueryable<IonicAppUser> query = _appDbContext.IonicAppUsers.Where(e => e.Password == Password);
            return await query.FirstOrDefaultAsync();
        }

        /*public async Task<IonicAppUser> CheckPasswordAsync(string Username, string Password)
        {
            var user = await _userManager.FindByNameAsync(Username);

            if (user == null)
            {
                // User not found
                return null;
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, Password, false);

            if (result.Succeeded)
            {
                // Password is correct, return the user
                return user;
            }

            // Password is incorrect
            return null;
        }*/


        public async Task<Gender[]> GetAllGendersAsync()
        {
            IQueryable<Gender> query = _appDbContext.Genders;
            return await query.ToArrayAsync();
        }
        //HELP 
        public async Task<Help[]> GetAllHelpAsync()
        {
            IQueryable<Help> query = _appDbContext.Helps;
            return await query.ToArrayAsync();
        }
        public async Task<Help> GetHelpAsync(int helpId)
        {
            IQueryable<Help> query = _appDbContext.Helps.Where(h => h.HelpId == helpId);
            return await query.FirstOrDefaultAsync();
        }
        
        // employee role
        public async Task<Employee_Role[]> GetAllEmployeeRolesAsync()
        {
            IQueryable<Employee_Role> query = _appDbContext.Employee_Roles;
            return await query.ToArrayAsync();
        }
        public async Task<Employee_Role> GetEmployeeRoleAsync(int employee_RoleId)
        {
            IQueryable<Employee_Role> query = _appDbContext.Employee_Roles.Where(r => r.Employee_RoleId == employee_RoleId);
            return await query.FirstOrDefaultAsync();
        }

        //Saving changes
        public async Task<bool>SaveChangesAsync()
		{
			return await _appDbContext.SaveChangesAsync() > 0;	
		}
		public void Add<T>(T entity) where T : class 
		{
			_appDbContext.Add(entity);
		}
        public void Delete<T>(T entity) where T : class
        {
            _appDbContext.Remove(entity);
        }

		//FOOD TYPE
		public async Task<Food_Type[]>GetAllFoodTypesAsync()
		{
			IQueryable<Food_Type> query = _appDbContext.Food_Types;
			return await query.ToArrayAsync();
		}
		public async Task<Food_Type>GetFoodTypeAsync(int FoodTypeId)
		{
			IQueryable<Food_Type> query = _appDbContext.Food_Types.Where(f => f.FoodTypeId == FoodTypeId);
			return await query.FirstOrDefaultAsync();
		}



        //DRINK ITEM TYPE
        public async Task<Drink_Type[]> GetAllDrinkTypesAsync()
        {
            IQueryable<Drink_Type> query = _appDbContext.Drink_Types;
            return await query.ToArrayAsync();
        }
        public async Task<Drink_Type> GetDrinkTypeAsync(int Drink_TypeId)
        {
            IQueryable<Drink_Type> query = _appDbContext.Drink_Types.Where(d => d.Drink_TypeId == Drink_TypeId);
            return await query.FirstOrDefaultAsync();
        }

        //DRINK
        //public async Task<Drink[]> GetAllDrinksAsync()
        //{
        //    IQueryable<Drink> query = _appDbContext.Drinks.Include(d => d.Drink_Type);
        //    return await query.ToArrayAsync();
        //}
        public async Task<Drink> GetDrinkAsync(int drinkId)
        {
            IQueryable<Drink> query = _appDbContext.Drinks.Where(d => d.DrinkId == drinkId);
            return await query.FirstOrDefaultAsync();
        }

        //DRINK ITEM
        //public async Task<Drink[]> GetAllDrinksAsync()
        //{
        //    IQueryable<Drink> query = _appDbContext.Drinks;
        //    return await query.ToArrayAsync();
        //}

        public async Task<Drink[]> GetAllDrinksAsync()
        {
            IQueryable<Drink> query = _appDbContext.Drinks.Include(p => p.Drink_Type);

            return await query.ToArrayAsync();
        }
        public async Task<Drink> GetDrinkItemAsync(int DrinkId)
        {
            IQueryable<Drink> query = _appDbContext.Drinks.Where(d => d.DrinkId == DrinkId);
            return await query.FirstOrDefaultAsync();

        }

        //DRINK ITEM PRICES
        public async Task<OtherDrinkPrice[]> GetAllDrinkItemPricesAsync()
        {
            IQueryable<OtherDrinkPrice> query = _appDbContext.OtherDrinkPrices;
            return await query.ToArrayAsync();
        }
        public async Task<OtherDrinkPrice> GetADrinkItemPriceAsync(int OtherDrinkPriceId)
        {
            IQueryable<OtherDrinkPrice> query = _appDbContext.OtherDrinkPrices.Where(c => c.OtherDrinkPriceId == OtherDrinkPriceId);
            return await query.FirstOrDefaultAsync();
        }


        //MENU ITEM CATEGORY
        public async Task<MenuItem_Category[]> GetAllMenuItemCategoriesAsync()
        {
            IQueryable<MenuItem_Category> query = _appDbContext.MenuItem_Categories;
            return await query.ToArrayAsync();
        }
        public async Task<MenuItem_Category> GetMenuItemCategoryAsync(int Menu_CategoryId)
        {
            IQueryable<MenuItem_Category> query = _appDbContext.MenuItem_Categories.Where(m => m.Menu_CategoryId == Menu_CategoryId);
            return await query.FirstOrDefaultAsync();
        }

        //SCHEDULE 
        public async Task<Schedule[]> ScheduleDisplayAsync()
        {
            IQueryable<Schedule> query = _appDbContext.Schedules;
            return await query.ToArrayAsync();
        }
        public async Task<Schedule> GetScheduleAsync(int scheduleId)
        {
            IQueryable<Schedule> query = _appDbContext.Schedules.Where(s => s.ScheduleId == scheduleId);
            return await query.FirstOrDefaultAsync();
        }

        //EVENTS
        public async Task<Event[]> GetAllEventsAsync()
        {
            IQueryable<Event> query = _appDbContext.Events;
            return await query.ToArrayAsync();
        }
        public async Task<Event> GetEventAsync(int EventId)
        {
            IQueryable<Event> query = _appDbContext.Events.Where(e => e.EventId == EventId);
            return await query.FirstOrDefaultAsync();
        }

        //ENTERTAINMENT TYPE
        public async Task<Entertainment_Type[]> GetEntertainmentTypesAsync()
        {
            IQueryable<Entertainment_Type> query = _appDbContext.Entertainment_Types;
            return await query.ToArrayAsync();
        }
        public async Task<Entertainment_Type> GetEntertainmentTypeAsync(int entertainment_TypeId)
        {
            IQueryable<Entertainment_Type> query = _appDbContext.Entertainment_Types.Where(t => t.Entertainment_TypeId == entertainment_TypeId);
            return await query.FirstOrDefaultAsync();
        }
       

        //Menu Item
        public async Task<MenuItem[]> GetAllMenuItemsAsync()
        {
            IQueryable<MenuItem> query = _appDbContext.MenuItems.Include(p => p.Menu_Type).Include(p => p.Food_Type).Include(p => p.MenuItem_Category);

            return await query.ToArrayAsync();
        }

        public async Task<MenuItem> GetMenuItemAsync(int MenuItemId)
        {
            IQueryable<MenuItem> query = _appDbContext.MenuItems.Where(c => c.MenuItemId == MenuItemId).Include(p => p.Menu_Type).Include(p => p.Food_Type).Include(p => p.MenuItem_Category);
            return await query.FirstOrDefaultAsync();
        }


        public async Task<int> EditMenuItemAsync(int MenuItemId, MenuItemViewModel menuItemViewModel)
        {
            int code = 200; ;
            //Find the module in the database
            MenuItem existingMeal = await _appDbContext.MenuItems.Where(x => x.MenuItemId == MenuItemId).FirstOrDefaultAsync();
            if (existingMeal == null)
            {
                code = 404;
            }
            else
            {
                existingMeal.Name = menuItemViewModel.Name;
                existingMeal.Description = existingMeal.Description;
                
                _appDbContext.MenuItems.Update(existingMeal);
                await _appDbContext.SaveChangesAsync();
            }
            return code;
        }


        //edit menu item with price
        public async Task<int> EditMenuItemWithPriceAsync(int MenuItemId, MenuItemViewModel menuItemViewModel, decimal amount)
        {
            MenuItem existingMenuItem = await _appDbContext.MenuItems
                 .Include(mi => mi.Menu_Type)
                 .Include(mi => mi.MenuItem_Category)
                 .Include(mi => mi.Food_Type)
                 .FirstOrDefaultAsync(mi => mi.MenuItemId == MenuItemId);

            if (existingMenuItem == null)
            {
                return 404; // Not Found
            }

            existingMenuItem.Name = menuItemViewModel.Name;
            existingMenuItem.Description = menuItemViewModel.Description;
            existingMenuItem.Menu_TypeId = menuItemViewModel.Menu_TypeId;
            existingMenuItem.Menu_CategoryId = menuItemViewModel.Menu_CategoryId;
            existingMenuItem.FoodTypeId = menuItemViewModel.FoodTypeId;

            try
            {
                _appDbContext.MenuItems.Update(existingMenuItem);

                // Update the associated price
                MenuItem_Price existingPrice = await _appDbContext.MenuItem_Prices.FirstOrDefaultAsync(mp => mp.MenuItemId == MenuItemId);
                if (existingPrice != null)
                {
                    existingPrice.Amount = amount;
                    _appDbContext.MenuItem_Prices.Update(existingPrice);
                }

                await _appDbContext.SaveChangesAsync();

                return 200; // Success
            }
            catch (Exception)
            {
                return 400; // Bad Request
            }
        }



        //MENU TYPES//
        public async Task<Menu_Type[]> GetAllMenuTypesAsync()
        {
            IQueryable<Menu_Type> query = _appDbContext.Menu_Types;
            return await query.ToArrayAsync();
        }
        public async Task<Menu_Type> GetMenuTypeAsync(int Menu_TypeId)
        {
            IQueryable<Menu_Type> query = _appDbContext.Menu_Types.Where(c => c.Menu_TypeId == Menu_TypeId);
            return await query.FirstOrDefaultAsync();
        }


        public async Task<int> EditMenuTypeAsync(int Menu_TypeId, MenuTypeViewModel menuTypeViewModel)
        {
            int code = 200; ;
            //Find the module in the database
            Menu_Type findModule = await _appDbContext.Menu_Types.Where(x => x.Menu_TypeId == Menu_TypeId).FirstOrDefaultAsync();
            if (findModule == null)
            {
                code = 404;
            }
            else
            {
                findModule.Name = menuTypeViewModel.Name;
                
                _appDbContext.Menu_Types.Update(findModule);
                await _appDbContext.SaveChangesAsync();
            }
            return code;
        }


        //UNATI
        //OtherDrink
        public async Task<OtherDrink[]> GetAllDrinkItemsAsync()
        {
            IQueryable<OtherDrink> query = _appDbContext.OtherDrinks.Include(p => p.Drink_Type);

            return await query.ToArrayAsync();
        }

        public async Task<OtherDrink> GetADrinkItemAsync(int OtherDrinkId)
        {
            IQueryable<OtherDrink> query = _appDbContext.OtherDrinks.Where(c => c.OtherDrinkId == OtherDrinkId).Include(p => p.Drink_Type);
            return await query.FirstOrDefaultAsync();
        }

        //SUPPLIER

        public async Task<Supplier[]> GetAllSuppliersAsync()
        {
            IQueryable<Supplier> query = _appDbContext.Suppliers.Include(s => s.Supplier_Type);
            return await query.ToArrayAsync();
        }
        // Entertainer
        public async Task<User[]> ViewProfileAsync()
		{
			IQueryable<User> query = _appDbContext.Users/*.Include(p => p.EntertainmentType)*/;
			return await query.ToArrayAsync();
		}

		public async Task<User> ViewProfileAsync(int UserId)
		{
			IQueryable<User> query = _appDbContext.Users.Where(u => u.Id == UserId);
			return await query.FirstOrDefaultAsync();
		}

		public async Task<User[]> GetUsersAsync()
		{
			IQueryable<User> query = _appDbContext.Users.Include(s => s.Entertainment_Type);
			return await query.ToArrayAsync();
		}

		//Admin
		public async Task<AdminInfor[]> ViewAdminProfileAsync()
		{
			IQueryable<AdminInfor> query = _appDbContext.Admins;
			return await query.ToArrayAsync();
		}

		public async Task<AdminInfor> ViewAdminProfileAsync(int UserId)
		{
			IQueryable<AdminInfor> query = _appDbContext.Admins.Where(u => u.Id == UserId);
			return await query.FirstOrDefaultAsync();
		}
		public async Task<User> GetUserProfile(int UserId)
		{
			// Fetch the user profile details from the database or any other data source
			var user = await _appDbContext.Users.FindAsync(UserId);

			// Map the user entity to a DTO or view model object
			var userProfile = new User
			{
				FirstName = user.FirstName,
				LastName = user.LastName,
				ContactNumber = user.ContactNumber,
				PhysicalAddress = user.PhysicalAddress,
				Email = user.Email,
				Username = user.Username
			};

			return userProfile;
		}

		//Booking
		public async Task<Bookings[]> GetBookingsAsync()
        {
            IQueryable<Bookings> query = _appDbContext.bookings/*.Include(p => p.Schedule)*/.Include(p => p.EntertainmentType);

            return await query.ToArrayAsync();
        }

		public async Task<Bookings> GetBookingAsync(int BookingId)
		{
			IQueryable<Bookings> query = _appDbContext.bookings.Where(d => d.BookingId == BookingId);
			return await query.FirstOrDefaultAsync();
		}
		//public async Task<Bookings> GetBookingInforAsync(string email)
		//{
		//	IQueryable<Bookings> query = _appDbContext.bookings.Where(d => d.Email == email);
		//	return await query.FirstOrDefaultAsync();
		//}
		// Assuming you have a DbSet<Bookings> in your DbContext
		public async Task<List<Bookings>> GetBookingInforAsync(string email)
		{
			return await _appDbContext.bookings
				.Include(booking => booking.EntertainmentType)
				.Where(booking => booking.Email == email)
				.ToListAsync();
		}


		public async Task<Schedule[]> GetSchedulesAsync()
        {
            IQueryable<Schedule> query = _appDbContext.Schedules;

            return await query.ToArrayAsync();
        }

        //public async Task<Entertainment_Type[]> GetEntertainmentTypesAsync()
        //{
        //    IQueryable< Entertainment_Type> query = _appDbContext.EntertainmentTypes;

        //    return await query.ToArrayAsync();
        //}

        public async Task<Supplier> GetSupplierAsync(int supplierId)
        {
            IQueryable<Supplier> query = _appDbContext.Suppliers.Where(s => s.SupplierId == supplierId);
            return await query.FirstOrDefaultAsync();
        }

        //SUPLIER TYPES

        public async Task<Supplier_Type[]> GetAllSupplierTypesAsync()
        {
            IQueryable<Supplier_Type> query = _appDbContext.Supplier_Types;
            return await query.ToArrayAsync();
        }

        public async Task<Supplier_Type> GetSupplierTypeAsync(int supplier_TypeId)
        {
            IQueryable<Supplier_Type> query = _appDbContext.Supplier_Types.Where(s => s.Supplier_TypeId == supplier_TypeId);
            return await query.FirstOrDefaultAsync();
        }

        //INVENTORY 

        public async Task<Inventory_Item[]> GetAllInventoryItemsAsync()
        {
            IQueryable<Inventory_Item> query = _appDbContext.Inventory_Items.Include(i => i.Inventory_Type);

            return await query.ToArrayAsync();
        }

        //STOCK TAKE
        public async Task<StockTakeItem[]> GetAllReconItemsAsync()
        {
            IQueryable<StockTakeItem> query = _appDbContext.StockTakeItems.Include(st => st.Inventory_Item);
            return await query.ToArrayAsync();
        }


        public async Task<Inventory_Item> GetInventoryItemAsync(int Inventory_ItemId)
        {
            IQueryable<Inventory_Item> query = _appDbContext.Inventory_Items.Where(i => i.Inventory_ItemId == Inventory_ItemId);
            return await query.FirstOrDefaultAsync();
        }

        //INVENTORY TYPES
        public async Task<Inventory_Type[]> GetAllInventoryTypesAsync()
        {
            IQueryable<Inventory_Type> query = _appDbContext.Inventory_Types;
            return await query.ToArrayAsync();
        }

        public async Task<Inventory_Type> GetInventoryTypeAsync(int inventory_TypeId)
        {
            IQueryable<Inventory_Type> query = _appDbContext.Inventory_Types.Where(i => i.Inventory_TypeId == inventory_TypeId);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Inventory_Item[]> GetInventoryItemsByTypeAsync(int inventory_TypeId)
        {
            IQueryable<Inventory_Item> query = _appDbContext.Inventory_Items.Where(i => i.Inventory_TypeId == inventory_TypeId);
            return await query.ToArrayAsync();
        }

        public async Task<Supplier_Inventory[]> GetAllInventoryOrdersAsync()
        {
            IQueryable<Supplier_Inventory> query = _appDbContext.Supplier_Inventorys.Include(i => i.Inventory_Item).Include(i => i.Supplier);

            return await query.ToArrayAsync();
        }
        //Menu Item Prices
        
        public async Task<MenuItem_Price[]> GetAllMenuItemPricesAsync()
        {
            IQueryable<MenuItem_Price> query = _appDbContext.MenuItem_Prices;
            return await query.ToArrayAsync();
        }
        public async Task<MenuItem_Price> GetAMenuItemPriceAsync(int menuItemId)
        {
            IQueryable<MenuItem_Price> query = _appDbContext.MenuItem_Prices.Where(c => c.MenuItemId == menuItemId);
            return await query.FirstOrDefaultAsync();
        }


        public async Task<int> EditMenuItemPriceAsync(int MenuItem_PriceId, MenuItemPriceViewModel menuItemPriceViewModel)
        {
            int code = 200; ;
            //Find the module in the database
            MenuItem_Price findModule = await _appDbContext.MenuItem_Prices.Where(x => x.MenuItem_PriceId == MenuItem_PriceId).FirstOrDefaultAsync();
            if (findModule == null)
            {
                code = 404;
            }
            else
            {
                findModule.Amount = menuItemPriceViewModel.Amount;

                _appDbContext.MenuItem_Prices.Update(findModule);
                await _appDbContext.SaveChangesAsync();
            }
            return code;
        }




        //TABLE NUMBER
        public async Task<Table_Number[]> GetAllTableNumbersAsync()
        {
            IQueryable<Table_Number> query = _appDbContext.Table_Numbers;
            return await query.ToArrayAsync();
        }



        //////KITCHEN ORDER
        public async Task<KitchenOrder> SaveKitchenOrder(KitchenOrder kitchenOrder)
        {
            // Add the KitchenOrder to the context and save changes to the database
            _appDbContext.KitchenOrders.Add(kitchenOrder);
            await _appDbContext.SaveChangesAsync();

            return kitchenOrder;
        }

        public async Task<KitchenOrder[]> GetAllKitchenOrdersAsync()
        {
            IQueryable<KitchenOrder> query = _appDbContext.KitchenOrders;
            return await query.ToArrayAsync();
        }

        //VAT
        public async Task<VAT> GetVatItemAsync(int VatId)
        {
            IQueryable<VAT> query = _appDbContext.Vats.Where(c => c.VatId == VatId);
            return await query.FirstOrDefaultAsync();
        }

        //DISCOUNT
        public async Task<Discount> GetDiscountItemAsync(int DiscountId)
        {
            IQueryable<Discount> query = _appDbContext.Discounts.Where(c => c.DiscountId == DiscountId);
            return await query.FirstOrDefaultAsync();
        }


    
		// Pending Booking
		public async Task<Pending_Booking[]> GetPendingsAsync()
		{
			IQueryable<Pending_Booking> query = _appDbContext.Pending_Bookings.Include(p => p.EntertainmentType);

			return await query.ToArrayAsync();
		}

		public async Task<Pending_Booking> GetPendingAsync(int BookingId)
		{
			IQueryable<Pending_Booking > query = _appDbContext.Pending_Bookings.Where(d => d.Pending_BookingId == BookingId);
			return await query.FirstOrDefaultAsync();
		}

	}
}
