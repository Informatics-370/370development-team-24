using Africanacity_Team24_INF370_.Controllers;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Booking;
using Africanacity_Team24_INF370_.models.Restraurant;

namespace Africanacity_Team24_INF370_.models
{
    public interface IRepository
    {
       

        Task<Employee[]> GetAllEmployeesAsync();
        //employee role
        Task<Employee_Role[]> GetAllEmployeeRolesAsync();
        Task <Employee_Role> GetEmployeeRoleAsync(int Employee_RoleId);

        /* Review entities here*/
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveChangesAsync();

        // FOOD TYPE
        Task<Food_Type[]> GetAllFoodTypesAsync();
        Task<Food_Type> GetFoodTypeAsync(int FoodTypeId);

        // DRINK ITEM TYPE
        Task<Drink_Type[]> GetAllDrinkTypesAsync();
        Task<Drink_Type> GetDrinkTypeAsync(int Drink_TypeId);

        // MENU ITEM CATEGORY
        Task<MenuItem_Category[]> GetAllMenuItemCategoriesAsync();
        Task<MenuItem_Category> GetMenuItemCategoryAsync(int Menu_CategoryId);

        //SCHEDULE
        Task<Schedule> GetScheduleAsync(int schedule_Id);
        Task<Schedule[]> ScheduleDisplayAsync();

        //EVENTS
        Task<Event[]> GetAllEventsAsync();
        Task<Event> GetEventAsync(int EventId);

        //ENTERTAINMENT TYPE
        Task<Entertainment_Type[]> GetEntertainmentTypesAsync();
        Task<Entertainment_Type> GetEntertainmentTypeAsync(int Entertainment_TypeId);
    }
}
