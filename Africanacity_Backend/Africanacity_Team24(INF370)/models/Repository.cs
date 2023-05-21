using Africanacity_Team24_INF370_.models.Administration;
﻿using Africanacity_Team24_INF370_.models.Restraurant;
using Microsoft.EntityFrameworkCore;

namespace Africanacity_Team24_INF370_.models
{
	public class Repository: IRepository
	{
		private readonly AppDbContext _appDbContext;

        public Repository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Employee[]> GetAllEmployeesAsync()
        {
            IQueryable<Employee> query = _appDbContext.Employees;
            return await query.ToArrayAsync();
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
    }
}
