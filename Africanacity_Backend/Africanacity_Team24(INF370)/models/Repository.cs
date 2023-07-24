using Africanacity_Team24_INF370_.models.Administration.Admin;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Restraurant;
using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Net;
using System.Security.Policy;
using Africanacity_Team24_INF370_.models.Booking;

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

		// Entertainer
		public async Task<User[]> ViewProfileAsync()
		{
			IQueryable<User> query = _appDbContext.Users;
			return await query.ToArrayAsync();
		}

		public async Task<User> ViewProfileAsync(int UserId)
		{
			IQueryable<User> query = _appDbContext.Users.Where(u => u.Id == UserId);
			return await query.FirstOrDefaultAsync();
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
				// Add other user properties as needed
			};

			return userProfile;
		}

		//Booking
		public async Task<Bookings[]> GetBookingsAsync()
        {
            IQueryable<Bookings> query = _appDbContext.bookings.Include(p => p.Schedule).Include(p => p.EntertainmentType);

            return await query.ToArrayAsync();
        }

        public async Task<Schedule[]> GetSchedulesAsync()
        {
            IQueryable<Schedule> query = _appDbContext.Schedules;

            return await query.ToArrayAsync();
        }

        public async Task<Entertainment_Type[]> GetEntertainmentTypesAsync()
        {
            IQueryable< Entertainment_Type> query = _appDbContext.EntertainmentTypes;

            return await query.ToArrayAsync();
        }

		// Pending Booking
		public async Task<Pending_Booking[]> GetPendingsAsync()
		{
			IQueryable<Pending_Booking> query = _appDbContext.Pending_Bookings/*.Include(p => p.Schedule)*/.Include(p => p.EntertainmentType);

			return await query.ToArrayAsync();
		}
	}
}
