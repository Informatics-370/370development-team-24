using Africanacity_Team24_INF370_.models.Admin;
﻿using Africanacity_Team24_INF370_.Controllers;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.ViewModel;
using Africanacity_Team24_INF370_.View_Models;
using System.Threading.Tasks;

namespace Africanacity_Team24_INF370_.models
{
    public interface IRepository
    {
        object EmployeeViewModel { get; }

        //employee role
        Task<Employee_Role[]> GetAllEmployeeRolesAsync();
        Task <Employee_Role> GetEmployeeRoleAsync(int Employee_RoleId);

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


        // DRINK ITEM TYPE
        Task<Drink_Type[]> GetAllDrinkTypesAsync();
        Task<Drink_Type> GetDrinkTypeAsync(int Drink_TypeId);

        // MENU ITEM CATEGORY
        Task<MenuItem_Category[]> GetAllMenuItemCategoriesAsync();
        Task<MenuItem_Category> GetMenuItemCategoryAsync(int Menu_CategoryId);
        

    }
}
