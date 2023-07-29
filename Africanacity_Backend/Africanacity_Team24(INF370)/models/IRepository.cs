using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.models.Booking;
using static Org.BouncyCastle.Asn1.Cmp.Challenge;

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

        // DRINK ITEM TYPE
        Task<Drink_Type[]> GetAllDrinkTypesAsync();
        Task<Drink_Type> GetDrinkTypeAsync(int Drink_TypeId);

        // MENU ITEM CATEGORY
        Task<MenuItem_Category[]> GetAllMenuItemCategoriesAsync();
        Task<MenuItem_Category> GetMenuItemCategoryAsync(int Menu_CategoryId);

		// Entertainer
		Task<User[]> ViewProfileAsync();
		Task<User> ViewProfileAsync(int UserId);

		// Admin
		Task<AdminInfor[]> ViewAdminProfileAsync();
		Task<AdminInfor> ViewAdminProfileAsync(int UserId);

		// Booking
		Task<Bookings[]> GetBookingsAsync();
		Task<Bookings> GetBookingAsync(int BookingId);
		Task<Entertainment_Type[]> GetEntertainmentTypesAsync();
		Task<Schedule[]> GetSchedulesAsync();

		//Pending Booking
		Task<Pending_Booking[]> GetPendingsAsync();
		Task<Pending_Booking> GetPendingAsync(int BookingId);
	}
}
