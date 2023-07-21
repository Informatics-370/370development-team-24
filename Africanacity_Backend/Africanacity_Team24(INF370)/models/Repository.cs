using Africanacity_Team24_INF370_.models.Admin;
using Africanacity_Team24_INF370_.models.Administration;
﻿using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.ViewModel;
using Africanacity_Team24_INF370_.View_Models;
using Microsoft.EntityFrameworkCore;

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
            IQueryable<Employee> query = _appDbContext.Employees;
            return await query.ToArrayAsync();
        }
        public async Task<Employee> GetEmployeeAsync(int employeeId)
        {
            IQueryable<Employee> query = _appDbContext.Employees.Where(e => e.EmployeeId == employeeId);
            return await query.FirstOrDefaultAsync();
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

        //DRINK ITEM
        public async Task<Drink[]> GetAllDrinksAsync()
        {
            IQueryable<Drink> query = _appDbContext.Drinks;
            return await query.ToArrayAsync();
        }
        public async Task<Drink> GetDrinkItemAsync(int DrinkId)
        {
            IQueryable<Drink> query = _appDbContext.Drinks.Where(d => d.DrinkId == DrinkId);
            return await query.FirstOrDefaultAsync();

        }

        //DRINK ITEM PRICES
        public async Task<Drink_Price[]> GetAllDrinkItemPricesAsync()
        {
            IQueryable<Drink_Price> query = _appDbContext.Drink_Prices;
            return await query.ToArrayAsync();
        }
        public async Task<Drink_Price> GetADrinkItemPriceAsync(int Drink_PriceId)
        {
            IQueryable<Drink_Price> query = _appDbContext.Drink_Prices.Where(c => c.Drink_PriceId == Drink_PriceId);
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


        //Menu Item
        public async Task<MenuItem[]> GetAllMenuItemsAsync()
        {
            IQueryable<MenuItem> query = _appDbContext.MenuItems.Include(p => p.Menu_Type).Include(p => p.Food_Type).Include(p => p.MenuItem_Category);

            return await query.ToArrayAsync();
        }

        public async Task<MenuItem> GetMenuItemAsync(int MenuItemId)
        {
            IQueryable<MenuItem> query = _appDbContext.MenuItems.Where(c => c.MenuItemId == MenuItemId);
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

        //Menu Item Prices
        
        public async Task<MenuItem_Price[]> GetAllMenuItemPricesAsync()
        {
            IQueryable<MenuItem_Price> query = _appDbContext.MenuItem_Prices;
            return await query.ToArrayAsync();
        }
        public async Task<MenuItem_Price> GetAMenuItemPriceAsync(int MenuItem_PriceId)
        {
            IQueryable<MenuItem_Price> query = _appDbContext.MenuItem_Prices.Where(c => c.MenuItem_PriceId == MenuItem_PriceId);
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

    }
}
