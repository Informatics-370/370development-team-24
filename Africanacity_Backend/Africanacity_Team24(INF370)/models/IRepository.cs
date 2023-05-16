using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Restraurant;

namespace Africanacity_Team24_INF370_.models
{
    public interface IRepository
    {
        Task<Employee[]> GetAllEmployeesAsync();
        
        /* Review entities here*/
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        // FOOD TYPE
        Task<Food_Type[]> GetAllFoodTypesAsync();
        Task<Food_Type> GetFoodTypeAsync(int FoodTypeId);

        //MENU ITEM 
        Task<MenuItem[]> GetAllMenuItemsAsync();

        Task<MenuItem> GetMenuItemAsync(int MenuItemId);


        // DRINK ITEM TYPE
        Task<Drink_Type[]> GetAllDrinkTypesAsync();
        Task<Drink_Type> GetDrinkTypeAsync(int Drink_TypeId);

        // MENU ITEM CATEGORY
        Task<MenuItem_Category[]> GetAllMenuItemCategoriesAsync();
        Task<MenuItem_Category> GetMenuItemCategoryAsync(int Menu_CategoryId);
    }
}
