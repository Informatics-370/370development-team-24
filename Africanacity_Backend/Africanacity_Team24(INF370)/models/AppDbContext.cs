using System.Collections.Generic;
using System.Reflection.Emit;
using System;
using Microsoft.EntityFrameworkCore;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Booking;
using Africanacity_Team24_INF370_.models.Inventory;
using Africanacity_Team24_INF370_.models.Restraurant;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Africanacity_Team24_INF370_.models.Login;
using Africanacity_Team24_INF370_.models;
using Microsoft.Extensions.Logging;
using Org.BouncyCastle.Utilities.Collections;
using System.Diagnostics;
using Africanacity_Team24_INF370_.View_Models;

namespace Africanacity_Team24_INF370_.models
{
	public class AppDbContext : IdentityDbContext<AppUser>
	{
		public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
		{
		}

		//Administration model
		public DbSet<Access> Accesses { get; set; }
		public DbSet<Administrator> Administrators { get; set; }
		public DbSet<Access_UserRole> Access_UserRoles{ get; set; }
		public DbSet<Discount> Discounts { get; set; }
        public DbSet<Employee_Role> Employee_Roles { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Gender> Genders { get; set; }
        public DbSet<Help> Helps { get; set; }
		public DbSet<Help_Category> Help_Categories{ get; set; }
		public DbSet<Password> Passwords { get; set; }
		public DbSet<Title> Titles { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<AdminInfor> Admins { get; set; }
		public DbSet<User_Role> User_Roles { get; set; }
		public DbSet<VAT> Vats { get; set; }

		//Booking model
		public DbSet<Bookings> bookings { get; set; }
		public DbSet<Pending_Booking> Pending_Bookings { get; set; }
		public DbSet<Booking_Status> Booking_Statuses { get; set; }
		public DbSet<Entertainer> Entertainers { get; set; }
		public DbSet<Entertainment_Type> EntertainmentTypes { get; set; }
		public DbSet<Entertainer_EntertainmentType> Entertainer_Entertainments { get; set; }
		public DbSet<Entertainer_Schedule> Entertainer_Schedules { get; set; }
        public DbSet<Entertainment_Type> Entertainment_Types { get; set; }
        public DbSet<Event> Events { get; set; }
		public DbSet<Schedule> Schedules { get; set; }
		public DbSet<Schedule_Status> Schedule_Statuses { get; set; }


		//Inventory model
		public DbSet<Inventory_Item> Inventory_Items { get; set; }
		public DbSet<Inventory_Type> Inventory_Types { get; set; }
		public DbSet<Supplier> Suppliers { get; set; }
		public DbSet<Supplier_InventoryItem> Supplier_InventoryItems { get; set; }
		public DbSet<Supplier_Type> Supplier_Types { get; set; }
        public DbSet<Supplier_Inventory> Supplier_Inventorys { get; set; }
        public DbSet<Inventory_Price> Inventory_Prices { get; set; }
        public DbSet<StockTake> StockTakes { get; set; }
        public DbSet<StockTakeItem> StockTakeItems { get; set; }
        public DbSet<WriteOffStock> WriteOffs { get; set; }
        public DbSet<DiscrepencyItem> DiscrepencyItems { get; set; }


        //Restraurant model
        public DbSet<Drink> Drinks { get; set; }
		public DbSet<Drink_Price> Drink_Prices { get; set; }
		public DbSet<Drink_Type> Drink_Types { get; set; }
		public DbSet<Food_Type> Food_Types { get; set; }
		public DbSet<Menu_Type> Menu_Types { get; set; }
		public DbSet<MenuItem> MenuItems { get; set; }
		public DbSet<MenuItem_Category> MenuItem_Categories { get; set; }
		public DbSet<MenuItem_Price> MenuItem_Prices { get; set; }
		public DbSet<Order> Orders { get; set; }
		public DbSet<Order_Drink> Order_Drinks { get; set; }
		public DbSet<Order_MenuItem> Order_MenuItems { get; set; }
		public DbSet<Order_Status> Order_Statuses { get; set; }
           
        public DbSet<OrderType> OrderTypes { get; set; }
		public DbSet<Payment> Payments { get; set; }
		public DbSet<Payment_Method> Payment_Methods { get; set; }
		public DbSet<Table_Number> Table_Numbers { get; set; }

        public DbSet<KitchenOrder> KitchenOrders { get; set; }
		protected override void OnModelCreating(ModelBuilder modelBuilder)

		{

			modelBuilder.Entity<User>().ToTable("Users");
			base.OnModelCreating(modelBuilder);

            // modelBuilder.Entity<StockTake>().HasMany(st => st.StockTakeItems).WithOne().OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Gender>()
                    .HasData(
                    new
                    {
                        GenderId = 1,
                        Name = "Male",
                    });
            modelBuilder.Entity<Gender>()
                 .HasData(
                 new
                 {
                      GenderId = 2,
                      Name = "Female",
                 });
            modelBuilder.Entity<Gender>()
                .HasData(
                 new
                 {
                     GenderId = 3,
                     Name = "Other",
                     });

            // Create Seed Data For the Employee Table:
            modelBuilder.Entity<Employee>()
               .HasData(
               new
               {
                   EmployeeId = 1,
                   Surname = "James",
                   FirstName = "Vanessa",
                   Email_Address = "VanessaJames@gmail.com",
                   Employee_RoleId = 1,
                   Physical_Address = "404 Jacob Street",
                   PhoneNumber = "0847541236",
                   GenderId = 2,
                   Employment_Date = DateTime.Now
               });
           ;
            modelBuilder.Entity<Employee>()
                         .HasData(
                         new
                         {
                             EmployeeId = 2,
                             Surname = "Williams",
                             FirstName = "Serena",
                             Email_Address = "SerenaWilliams@gmail.com",
                             Employee_RoleId = 2,
                             Physical_Address = "132 Harriet Street",
                             PhoneNumber = "0842341236",
                             GenderId = 2,
                             Employment_Date = DateTime.Now

                         });
            modelBuilder.Entity<Employee>()
                         .HasData(
                         new
                         {
                             EmployeeId = 3,
                             Surname = "Elba",
                             FirstName = "Edris",
                             Email_Address = "EdrisElba@gmail.com",
                             Employee_RoleId = 1,
                             Physical_Address = "245 homelyn Street",
                             PhoneNumber = "0212378798",
                             GenderId = 1,
                             Employment_Date = DateTime.Now

                         });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 4,
                            Surname = "Nyongo",
                            FirstName = "Lupita",
                            Email_Address = "NyongoLupita@gmail.com",
                            Employee_RoleId = 2,
                            Physical_Address = "254 Summer Street",
                            PhoneNumber = "0455783475",
                            GenderId = 2,
                            Employment_Date = DateTime.Now

                        });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 5,
                            Surname = "Jackson",
                            FirstName = "Micheal",
                            Email_Address = "MicheaJackson@gmail.com",
                            Employee_RoleId = 2,
                            Physical_Address = "567 Winter Street",
                            PhoneNumber = "0874567836",
                            GenderId = 3,
                            Employment_Date = DateTime.Now

                        });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 6,
                            Surname = "Kim",
                            FirstName = "Taehyung",
                            Email_Address = "TaehyungKim@gmial.com",
                            Employee_RoleId = 1,
                            Physical_Address = "345 Shallow  Street",
                            PhoneNumber = "0874562134",
                            GenderId = 1,
                            Employment_Date = DateTime.Now

                        });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 7,
                            Surname = "Coleman",
                            FirstName = "Zendaya",
                            Email_Address = "ZendayaColeman@gmail.com",
                            Employee_RoleId = 1,
                            Physical_Address = "243 Super Street ",
                            PhoneNumber = "0212378798",
                            GenderId = 2,
                            Employment_Date = DateTime.Now

                        });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 8,
                            Surname = "Federal",
                            FirstName = "Roger",
                            Email_Address = "RogerFederal@gmail.com",
                            Employee_RoleId = 1,
                            Physical_Address = "987 Wall Street",
                            PhoneNumber = "0612346487",
                            GenderId = 3,
                            Employment_Date = DateTime.Now

                        });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 9,
                            Surname = "Lopez",
                            FirstName = "Jennifer",
                            Email_Address = "JenniferLOpez@gmail.com",
                            Employee_RoleId = 2,
                            Physical_Address = "967 Ballard Street",
                            PhoneNumber = "0874834576",
                            GenderId = 3,
                            Employment_Date = DateTime.Now

                        });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 10,
                            Surname = "Boseman",
                            FirstName = "Chadwick",
                            Email_Address = "ChadwickBoseman@gmail.com",
                            Employee_RoleId = 2,
                            Physical_Address = "483 Alien Street",
                            PhoneNumber = "0923456789",
                            GenderId = 1,
                            Employment_Date = DateTime.Now

                        });

			//********************************************************************************************************* Create Seed Data For the  Booking Table: **********************************************************************************

			modelBuilder.Entity<Bookings>()
		   .HasData(
		   new
		   {

			  BookingId = 1,
			   LastName = "James",
			   FirstName = "Vanessa",
			   Instagram = "Vanessa123",
			   Email = "VanessaJames@gmail.com",
			   ContactNumber = "0847541236",
			   Eventname = "Smooth Sunday",
			   Additional = "Thank you",
			   Demo = "Image 1",
			   Entertainment_TypeId = 1,
		   });
			
			modelBuilder.Entity<Bookings>()
						 .HasData(
						 new
						 {
							 BookingId = 2,
							 LastName = "Williams",
							 FirstName = "Serena",
							 Instagram = "Serena",
							 Email = "SerenaWilliams@gmail.com",
							 ContactNumber = "0847541238",
							 Eventname = "Wacky Wednesday",
							 Additional = "None",
							 Demo = "Image 2",
							 Entertainment_TypeId = 2,


						 });
			modelBuilder.Entity<Bookings>()
						 .HasData(
						 new
						 {
							 BookingId = 3,
							 LastName = "Williams",
							 FirstName = "Venus",
							 Instagram = "Venus",
							 Email = "VenusWilliams@gmail.com",
							 ContactNumber = "0847541238",
							 Eventname = "Smooth Sunday",
							 Additional = "None",
							 Demo = "Image 3",
							 Entertainment_TypeId = 3,

						 });
			modelBuilder.Entity<Bookings>()
						.HasData(
						new
						{
							BookingId = 4,
							LastName = "Bestie",
							FirstName = "Beast",
							Instagram = "Bee",
							Email = "Beast@gmail.com",
							ContactNumber = "0847541238",
							Eventname = "Wacky Wednesday",
							Additional = "None",
							Demo = "Image 4",
							Entertainment_TypeId = 4,

						});
			modelBuilder.Entity<Bookings>()
						.HasData(
						new
						{
							BookingId = 5,
							LastName = "Kid",
							FirstName = "Danger",
							Instagram = "KidDanger",
							Email = "KidDanger@gmail.com",
							ContactNumber ="0848887563",
							Eventname = "Wacky Wednesday",
							Additional = "None",
							Demo = "Image 5",
							Entertainment_TypeId = 1,

						});
			modelBuilder.Entity<Bookings>()
						.HasData(
						new
						{
							BookingId = 6,
							LastName = "Adult",
							FirstName = "Danger",
							Instagram = "AdultDanger",
							Email = "AdultDanger@gmail.com",
							ContactNumber = "0847541236",
							Eventname = "Wacky Wednesday",
							Additional = "None",
							Demo = "Image 6",
							Entertainment_TypeId = 2,

						});


			// ************************************************************************Create Seed Data For the Pending Booking Table ************************************************************************************************************

			modelBuilder.Entity<Pending_Booking>()
			   .HasData(
			   new
			   {

				   Pending_BookingId = 1,
				   LastName = "James",
				   FirstName = "Vanessa",
				   Instagram = "Vanessa123",
                   Email = "VanessaJames@gmail.com",
				   ContactNumber = "0847541236",
                   Eventname = "Smooth Sunday",
                   Additional ="Thank you",
                   Demo = "Image 1",
                   Entertainment_TypeId = 1,
			   });
			;
			modelBuilder.Entity<Pending_Booking>()
						 .HasData(
						 new
						 {
							 Pending_BookingId = 2,
							 LastName = "Williams",
							 FirstName = "Serena",
							 Instagram = "Serena",
							 Email = "SerenaWilliams@gmail.com",
							 ContactNumber = "0847541238",
							 Eventname = "Wacky Wednesday",
							 Additional = "None",
							 Demo = "Image 2",
							 Entertainment_TypeId = 2,
	

						 });
			modelBuilder.Entity<Pending_Booking> ()
						 .HasData(
						 new
						 {
							 Pending_BookingId = 3,
							 LastName = "Williams",
							 FirstName = "Venus",
							 Instagram = "Venus",
							 Email = "VenusWilliams@gmail.com",
							 ContactNumber = "0847541238",
							 Eventname = "Smooth Sunday",
							 Additional = "None",
							 Demo = "Image 3",
							 Entertainment_TypeId = 3,

						 });
			modelBuilder.Entity<Pending_Booking>()
						.HasData(
						new
						{
							Pending_BookingId = 4,
							LastName = "Bestie",
							FirstName = "Beast",
							Instagram = "Bee",
							Email = "Beast@gmail.com",
							ContactNumber = "0847541238",
							Eventname = "Wacky Wednesday",
							Additional = "None",
							Demo = "Image 4",
							Entertainment_TypeId = 4,

						});
			modelBuilder.Entity<Pending_Booking > ()
						.HasData(
						new
						{
							Pending_BookingId = 5,
							LastName = "Kid",
							FirstName = "Danger",
							Instagram = "KidDanger",
							Email = "KidDanger@gmail.com",
							ContactNumber = "0848887563",
							Eventname = "Wacky Wednesday",
							Additional = "None",
							Demo = "Image 5",
							Entertainment_TypeId = 1,
							
						});
			modelBuilder.Entity<Pending_Booking>()
						.HasData(
						new
						{
							Pending_BookingId = 6,
							LastName = "Adult",
							FirstName = "Danger",
							Instagram = "AdultDanger",
							Email = "AdultDanger@gmail.com",
							ContactNumber = "0847541236",
							Eventname = "Wacky Wednesday",
							Additional = "None",
							Demo = "Image 6",
							Entertainment_TypeId = 2,

						});




			//****************************************************************************************************** Create Seed Data For the Entertainer Table: ******************************************************************************************

			modelBuilder.Entity<User>()
			   .HasData(
			   new
			   {
				   Id = 1,
				   LastName = "James",
				   FirstName = "Vanessa",
                   Username ="Vanessa",
                   Password = "Vanessa123",
				   Email = "VanessaJames@gmail.com",
                   Role="User",
				   Entertainment_TypeId = 1,
				   RefreshToken = "",
				   RefreshTokenExpiryTime = DateTime.UtcNow, // Set as needed
				   ResetPasswordToken = "",
				   ResetPasswordTokenExpiry = DateTime.UtcNow, // Set as needed
				   PhysicalAddress = "404 Jacob Street",
				   ContactNumber = "0848887563",
			   });
			;
			modelBuilder.Entity<User>()
						 .HasData(
						 new
						 {
							 Id = 2,
							 LastName = "Williams",
							 FirstName = "Serena",
							 Username = "Serena",
							 Password = "Serena.123",
							 Email = "SerenaWilliams@gmail.com",
							 Role = "User",
							 Entertainment_TypeId = 2,
							 RefreshToken = "",
							 RefreshTokenExpiryTime = DateTime.UtcNow, // Set as needed
							 ResetPasswordToken = "",
							 ResetPasswordTokenExpiry = DateTime.UtcNow, // Set as needed
							 PhysicalAddress = "404 Williams Street",
							 ContactNumber = "0848887564",

						 });
			modelBuilder.Entity<User> ()
						 .HasData(
						 new
						 {
							 Id = 3,
							 LastName = "Venus",
							 FirstName = "Williams",
							 Username = "Venus",
							 Password = "Venus.123",
							 Email = "VenusWilliams@gmail.com",
							 Role = "User",
							 Entertainment_TypeId = 3,
							 RefreshToken = "",
							 RefreshTokenExpiryTime = DateTime.UtcNow, // Set as needed
							 ResetPasswordToken = "",
							 ResetPasswordTokenExpiry = DateTime.UtcNow, // Set as needed
							 PhysicalAddress = "100 Venus Street",
							 ContactNumber = "0848887565",
						 });
			modelBuilder.Entity<User>()
						.HasData(
						new
						{
							Id = 4,
							LastName = "Bestie",
							FirstName = "Beast",
							Username = "Bee",
							Password = "Beast.123",
							Email = "Beast@gmail.com",
							Role = "User",
							Entertainment_TypeId = 4,
							RefreshToken = "",
							RefreshTokenExpiryTime = DateTime.UtcNow, // Set as needed
							ResetPasswordToken = "",
							ResetPasswordTokenExpiry = DateTime.UtcNow, // Set as needed
							PhysicalAddress = "808 Beast Street",
							ContactNumber = "0848887566",

						});
			modelBuilder.Entity<User>()
						.HasData(
						new
						{
							Id = 5,
							LastName = "Kid",
							FirstName = "Danger",
							Username = "KidDanger",
							Password = "Danger.123",
							Email = "KidDanger@gmail.com",
							Role = "User",
							Entertainment_TypeId = 3,
							RefreshToken = "",
							RefreshTokenExpiryTime = DateTime.UtcNow, // Set as needed
							ResetPasswordToken = "",
							ResetPasswordTokenExpiry = DateTime.UtcNow, // Set as needed
							PhysicalAddress = "500 Danger Street",
							ContactNumber = "0848887567",
						});
			modelBuilder.Entity<User>()
						.HasData(
						new
						{
							Id = 6,
							LastName = "Adult",
							FirstName = "Danger",
							Username = "AdultDanger",
							Password = "Adult.123",
							Email = "AdultDanger@gmail.com",
							Role = "User",
							Entertainment_TypeId = 4,
							RefreshToken = "",
							RefreshTokenExpiryTime = DateTime.UtcNow, // Set as needed
							ResetPasswordToken = "",
							ResetPasswordTokenExpiry = DateTime.UtcNow, // Set as needed
							PhysicalAddress = "404 Adult Street",
							ContactNumber = "0848887568",

						});
			
			// Create Seed Data For the Help Q&A Table:

			modelBuilder.Entity<Help>()
                        .HasData(
                        new
                        {
                            HelpId = 1,
                            Name = "What food does MMINO Restaurant serve?",
                            Description = "MMINO Restaurant serves various types of cuisines"
                        });
            modelBuilder.Entity<Help>()
                       .HasData(
                       new
                       {
                           HelpId = 2,
                           Name = "Where is MMINO Restaurant?",
                           Description = "MMINO Restaurant is located in Hatfield,Pretoria. 1005 Arcadia Street"
                       });
            modelBuilder.Entity<Help>()
                      .HasData(
                      new
                      {
                          HelpId = 3,
                          Name = "How how do you book for a live entertainment slot?",
                          Description = "You can book for a live entertainment on the website."
                      });

			//create seed data for menu type
            //modelBuilder.Entity<Menu_Type>()
             //             .HasData(
             //             new
            //              {
            //                  Menu_TypeId = 1,
             //                 Name = "Breakfast"


			////create seed data for menu type
   //         modelBuilder.Entity<Menu_Type>()
   //                       .HasData(
   //                       new
   //                       {
   //                           Menu_TypeId = 1,
   //                           Name = "Breakfast"


            // Create Seed Data For The Employee Role Table:
            modelBuilder.Entity<Employee_Role>()
                           .HasData(
                           new
                           {
                               Employee_RoleId = 1,
                               Name = "Waiter",
							   Description = "The waiter serves the customers and takes orders"

                           });

            modelBuilder.Entity<Employee_Role>()
                          .HasData(
                          new
                          {
                              Employee_RoleId = 2,
                              Name = "Chef",
                              Description = "The chef prepares the meals and notifies the waiter of ready orders."

                          });

            modelBuilder.Entity<Employee_Role>()
                         .HasData(
                         new
                         {
                             Employee_RoleId = 3,
                             Name = "Kitchen Staff",
                             Description = "The kitchen staff assists the chef prepare meals."

                         });

            //create seed data for menu type
            modelBuilder.Entity<Menu_Type>()
                          .HasData(
                          new
                          {
                              Menu_TypeId = 1,
                              Name = "Breakfast",
                          });


            modelBuilder.Entity<Menu_Type>()
                         .HasData(
                         new
                         {
                             Menu_TypeId = 2,
                             Name = "All Day"


                         });


            // Create Seed Data For the FoodType Table:
            modelBuilder.Entity<Food_Type>()
                           .HasData(
                           new
                           {
                               FoodTypeId = 1,
                               Name = "Chicken",
                               Description = "Meals consisting of chicken"

                           });

            modelBuilder.Entity<Food_Type>()
                .HasData(
                new
                {
                    FoodTypeId = 2,
                    Name = "Beef",
                    Description = "Meals consisting of beef",
                });

            modelBuilder.Entity<Food_Type>()
                .HasData(
                new
                {
                    FoodTypeId = 3,
                    Name = "Vegetarian",
                    Description = "Meals suitable for vegetarians"

                });

            modelBuilder.Entity<Food_Type>()
                .HasData(
                new
                {
                    FoodTypeId = 4,
                    Name = "Vegan",
                    Description = "Meals suitable for Vegans"

                });


            ////         // Create Seed Data For the Menu Category Table:
            //         modelBuilder.Entity<MenuItem_Category>()
            //                        .HasData(
            //                        new
            //                        {
            //                            Menu_CategoryId = 1,
            //                            Name = "Breakfast",
            //                            Description = "Meals between 7am to 12pm"

            //                        });

            //         modelBuilder.Entity<MenuItem_Category>()
            //              .HasData(
            //              new
            //              {
            //                  Menu_CategoryId = 2,
            //                  Name = "Starter",
            //                  Description = "Appetisers"

            //              });

            //         modelBuilder.Entity<MenuItem_Category>()
            //                       .HasData(
            //                       new
            //                       {
            //                          Menu_CategoryId = 3,
            //                           Name = "Main",
            //                           Description = "Big and Filling meals",

            //                       });

            //         modelBuilder.Entity<MenuItem_Category>()
            //                       .HasData(
            //                       new
            //                       {
            //                           Menu_CategoryId = 4,
            //                           Name = "Dessert",
            //                           Description = "Special things for those with a sweet tooth"

            //                       });

            //         modelBuilder.Entity<MenuItem_Category>()
            //                       .HasData(
            //                       new
            //                       {
            //                           Menu_CategoryId = 5,
            //                           Name = "Light Meals",
            //                           Description = "For those hungry but not hungry"

            //                       });




            // Create Seed Data For the MenuItem Table:
            //         modelBuilder.Entity<MenuItem>()
            //                        .HasData(
            //                        new
            //                        {
            //                          MenuItemId = 1,
            //				 Name = "Chicken Feast",
            //				 Description ="Two larger chicken burger, 6 pcs nuggets, two large fries",
            //                          FoodTypeId = 1,
            //				 Menu_CategoryId =3,
            //                          CategoryMenu_CategoryId = 3,
            //                          Menu_TypeId = 2,


            //                        });

            //         // Create Seed Data For the MenuItem Table:
            //         modelBuilder.Entity<MenuItem>()
            //                        .HasData(
            //                        new
            //                        {
            //                            MenuItemId = 2,
            //                            Name = "The Braai feast",
            //                            Description = "Pap, boerewors an Tbone steak",
            //                            FoodTypeId = 2,
            //                            Menu_CategoryId= 3,
            //                            CategoryMenu_CategoryId = 3,
            //                            Menu_TypeId = 2,


            //                        });

            //         modelBuilder.Entity<MenuItem>()
            //                       .HasData(
            //                       new
            //                       {
            //                           MenuItemId = 3,
            //                           Name = "Chilli cheese poppers",
            //                           Description = "Mozarella stuffe cheese balls",
            //                           FoodTypeId = 3,
            //                           Menu_CategoryId = 2,
            //                           CategoryMenu_CategoryId = 2,
            //                           Menu_TypeId = 2,


            //                       });
            //         modelBuilder.Entity<MenuItem>()
            //                       .HasData(
            //                       new
            //                       {
            //                           MenuItemId = 4,
            //                           Name = "Mexican salad",
            //                           Description = "A green salad with salsa mix",
            //                           FoodTypeId = 4,
            //                           Menu_CategoryId = 5,
            //                           CategoryMenu_CategoryId = 5,
            //                           Menu_TypeId = 2,


            //                       });
            //         modelBuilder.Entity<MenuItem>()
            //                       .HasData(
            //                       new
            //                       {
            //                           MenuItemId = 5,
            //                           Name = "Blueberry cheescake",
            //                           Description = "Delicious cheesecake with blueberry sauce topping",
            //                           FoodTypeId = 3,
            //                           Menu_CategoryId = 4,
            //                           CategoryMenu_CategoryId = 4,
            //                           Menu_TypeId = 2,


            //                       });

            //Create Seed Data for the Supplier Type table:
            modelBuilder.Entity<Supplier_Type>()
              .HasData(
              new
              {
                  Supplier_TypeId = 1,
                  Name = "Alcohol",
                  Description = "For Alcohol Suppliers",
          
              });
              modelBuilder.Entity<Supplier_Type>()
              .HasData(
              new
              {
                  Supplier_TypeId = 2,
                  Name = "Meat and Poultry",
                  Description = "Suppliers who sell meat and poultry",
          
              });
              modelBuilder.Entity<Supplier_Type>()
              .HasData(
              new
              {
                  Supplier_TypeId = 3,
                  Name = "General",
                 Description = "Stores that sell all types",
          
              });
              modelBuilder.Entity<Supplier_Type>()
              .HasData(
              new
              {
                  Supplier_TypeId = 4,
                  Name = "Bakery",
                  Description = "Stores that supplier baking ingrediants",
          
              });

            // Seed data for supplier

            modelBuilder.Entity<Supplier>()
              .HasData(
              new
              {
                  SupplierId = 1,
                  SupplierName = "Checkers",
                  Email_Address = "checkers@gmail.com",
                  Supplier_TypeId = 3,
                  PhoneNumber = "0122345654",
                  Physical_Address = "416 Kirkness St, Arcadia",
                 
              });
             modelBuilder.Entity<Supplier>()
              .HasData(
              new
              {
                  SupplierId = 2,
                  SupplierName = "Pick `n Pay",
                  Email_Address = "pnp@gmail.com",
                  Supplier_TypeId = 3,
                  PhoneNumber = "0110456543",
                  Physical_Address = "Hatfield Plaza 1122 Burnett Street",
                 
              });
             modelBuilder.Entity<Supplier>()
              .HasData(
              new
              {
                  SupplierId = 3,
                  SupplierName = "Liquor Rack",
                  Email_Address = "liquorRack@gmail.com",
                  Supplier_TypeId = 1,
                  PhoneNumber = "0656781230",
                  Physical_Address = "Hatfield Plaza 1145 Burnett Street"

              });
             modelBuilder.Entity<Supplier>()
              .HasData(
              new
              {
                  SupplierId = 4,
                  SupplierName = "BakerMan",
                  Email_Address = "bakerMan@gmail.com",
                  Supplier_TypeId = 4,
                  PhoneNumber = "0714567890",
                  Physical_Address = "HillCrest Boulevard 110 Lynnwood"
                 
              });
              modelBuilder.Entity<Supplier>()
              .HasData(
            new
            {
                  SupplierId = 5,
                  SupplierName = "Mr Jacks Butcher",
                  Email_Address = "MJButcher@gmail.com",
                  Supplier_TypeId = 2,
                  PhoneNumber = "0865045674",
                  Physical_Address = "143 Atterbury Street"
                 
              });

              modelBuilder.Entity<Inventory_Type>()
              .HasData(
              new
              {
                  Inventory_TypeId = 1,
                  Name = "Food",
                  Description = "For all food inventory items"
          
              });

             modelBuilder.Entity<Inventory_Type>()
              .HasData(
              new
              {
                  Inventory_TypeId = 2,
                  Name = "Non-Alcoholic Drinks",
                  Description = "For all Non-Alcoholic Drink inventory items"
          
              });

              modelBuilder.Entity<Inventory_Type>()
              .HasData(
              new
              {
                  Inventory_TypeId = 3,
                  Name = "Alcoholic Drinks",
                  Description = "For all Alcoholic Drink inventory items"
          
              });

              modelBuilder.Entity<Inventory_Item>()
              .HasData(
            new
            {
                  Inventory_ItemId = 1,
                  ItemName = "Lettuce",
                  Description = "Freshly produced",
                  Inventory_TypeId = 1,
                  Quantity = 2
              });


            modelBuilder.Entity<Inventory_Item>()
            .HasData(
          new
          {
              Inventory_ItemId = 2,
              ItemName = "Chicken",
              Description = "Used for all chicken dishes",
              Inventory_TypeId = 1,
              Quantity = 6
          });

            modelBuilder.Entity<Inventory_Item>()
            .HasData(
          new
          {
              Inventory_ItemId = 3,
              ItemName = "Mogodu",
              Description = "Needs to be cooked well",
              Inventory_TypeId = 1,
              Quantity = 5,
          });


            modelBuilder.Entity<Inventory_Item>()
            .HasData(
          new
          {
              Inventory_ItemId = 4,
              ItemName = "Gin",
              Description = "Served in all drinks with the gin recipie",
              Inventory_TypeId = 3,
              Quantity = 15
          });


            modelBuilder.Entity<Inventory_Item>()
            .HasData(
          new
          {
              Inventory_ItemId = 5,
              ItemName = "Coke",
              Description = "To Quench your Thirst",
              Inventory_TypeId = 2,
              Quantity = 24
          });


            modelBuilder.Entity<Inventory_Item>()
            .HasData(
          new
          {
              Inventory_ItemId = 6,
              ItemName = "Sarkling Water",
              Description = "For those who like no taste",
              Inventory_TypeId = 2,
              Quantity = 30
          });


            modelBuilder.Entity<Inventory_Item>()
            .HasData(
          new
          {
              Inventory_ItemId = 7,
              ItemName = "Beer",
              Description = "Many different types served",
              Inventory_TypeId = 3,
              Quantity = 12
          });


            modelBuilder.Entity<Inventory_Item>()
            .HasData(
          new
          {
              Inventory_ItemId = 8,
              ItemName = "Rice",
              Description = "One of the starches served with each dish",
              Inventory_TypeId = 1,
              Quantity = 4
          });

            modelBuilder.Entity<Inventory_Item>()
            .HasData(
          new
          {
              Inventory_ItemId = 9,
              ItemName = "Maize Meal",
              Description = "One of the starches served with each dish",
              Inventory_TypeId = 1,
              Quantity = 3

          });

            modelBuilder.Entity<Inventory_Item>()
            .HasData(
          new
          {
              Inventory_ItemId = 10,
              ItemName = "Apple Juice",
              Description = "For those who do not like fizz",
              Inventory_TypeId = 2,
              Quantity = 24
          });

          modelBuilder.Entity<Supplier_Inventory>()
              .HasData(
            new
            {
                  SupplierItemId = 1,
                 SupplierId = 1,
                  Inventory_ItemId = 1,
                 Ordered_Quantity = 33,
                 //Ordered_Date = DateTime.Today,
                 // Received_Date = DateTime.Today
            });





            //Many to many with MenuItem
            //modelBuilder.Entity<MenuItem>()
            //            .HasOne(m => m.Menu_Type)
            //            .WithMany()
            //            .HasForeignKey(m => m.Menu_TypeId);

            //            modelBuilder.Entity<MenuItem>()
            //            .HasOne(m => m.MenuItem_Category)
            //            .WithMany()
            //            .HasForeignKey(m => m.Menu_CategoryId);

            //            modelBuilder.Entity<MenuItem>()
            //            .HasOne(m => m.Food_Type)
            //            .WithMany()
            //            .HasForeignKey(m => m.FoodTypeId);

           ///////// modelBuilder.Entity<StockTakeItem>()
          ////// //.HasKey(sti => sti.StockTakeItemId); // Set the primary key for StockTakeItem

            //// Configure the relationship between StockTakeItem and StockTake
            //modelBuilder.Entity<StockTakeItem>()
            //    .HasOne(sti => sti.StockTake)
            //    .WithMany(st => st.StockTakeItems)
            //    .HasForeignKey(sti => sti.StockTakeId); // Set the foreign key for StockTakeItem

            //// Configure the relationship between StockTake and StockTakeItem
 

                          
            // Create Seed Data For the Events Table:
            modelBuilder.Entity<Event>()
                         .HasData(
                         new
                         {
                             EventId = 1,
                             Name = "Smooth Sunday",
                             Description = "An event filled with spectacular music performances and art display "
                            
                         });
            modelBuilder.Entity<Event>()
                         .HasData(
                         new
                         {
                             EventId = 2,
                             Name = "Wacky Wednesday",
                             Description = "An event where various forms of entertainments take place"

                         });
            modelBuilder.Entity<Event>()
                        .HasData(
                        new
                        {
                            EventId = 3,
                            Name = "Poetry Musings",
                            Description = " poets are invited to recite poems and another kind of artistry "

                        });
            // Create Seed Data For the Entertainments Type Table:
            modelBuilder.Entity<Entertainment_Type>()
                       .HasData(
                       new
                       {
                           Entertainment_TypeId = 1,
                           Name = "Poetry",
                           Description = "Poetry recitations"

                       });
            modelBuilder.Entity<Entertainment_Type>()
                      .HasData(
                      new
                      {
                          Entertainment_TypeId = 2,
                          Name = "StandUp Comedy",
                          Description = "One-liners for a comedic performance"

                      });
            modelBuilder.Entity<Entertainment_Type>()
                      .HasData(
                      new
                      {
                          Entertainment_TypeId = 3,
                          Name = "Dance",
                          Description = "Present dance as an art form, ballet, amapiano styles, hipHop dancers"

                      });
            modelBuilder.Entity<Entertainment_Type>()
                                 .HasData(
                                  new
                                  {
                                      Entertainment_TypeId = 4,
                                      Name = "Music",
                                      Description = "Artits who perform own music. All types of music"

                                  });
            //Create Seed Data for the schedule Table
            modelBuilder.Entity<Schedule>()
                                 .HasData(
                                  new
                                  {
                                      ScheduleId = 1,
                                      Title = "Music slot",
                                      Date = new DateTime(2023,06,25),
                                      Start_Time = "14;00 PM",
                                      End_Time = "14:30 PM",
                                      Description = "Musician can book performance",
                                      EventId = 1
                                  });
            modelBuilder.Entity<Schedule>()
                                .HasData(
                                 new
                                 {
                                     ScheduleId = 2,
                                     Title = "Dance slot ",
                                     Date = new DateTime(2023,08,02),
                                     Start_Time = "21;00 PM",
                                     End_Time = "21:30 PM",
                                     Description = "Contemporary Dance performance",
                                     EventId = 2
                                 });
            modelBuilder.Entity<Schedule>()
                                .HasData(
                                 new
                                 {
                                     ScheduleId = 3,
                                     Title = "Poetry",
                                     Date = new DateTime(2023,07,22),
                                     Start_Time = "19;00 PM",
                                     End_Time = "19:15 PM",
                                     Description = "Poet recital",
                                     EventId = 3
                                 });





            // Create Seed Data For the Menu Category Table:
            modelBuilder.Entity<MenuItem_Category>()
                           .HasData(
                           new
                           {
                               Menu_CategoryId = 1,
                               Name = "Breakfast",
                               Description = "Meals between 7am to 12pm"

                           });

            modelBuilder.Entity<MenuItem_Category>()
                 .HasData(
                 new
                 {
                     Menu_CategoryId = 2,
                     Name = "Starter",
                     Description = "Appetisers"

                 });

            modelBuilder.Entity<MenuItem_Category>()
                          .HasData(
                          new
                          {
                              Menu_CategoryId = 3,
                              Name = "Main",
                              Description = "Big and Filling meals",

                          });

            modelBuilder.Entity<MenuItem_Category>()
                          .HasData(
                          new
                          {
                              Menu_CategoryId = 4,
                              Name = "Dessert",
                              Description = "Special things for those with a sweet tooth"

                          });

            modelBuilder.Entity<MenuItem_Category>()
                          .HasData(
                          new
                          {
                              Menu_CategoryId = 5,
                              Name = "Light Meals",
                              Description = "For those hungry but not hungry"

                          });



            
            // Create Seed Data For the MenuItem Table:
            modelBuilder.Entity<MenuItem>()
                           .HasData(
                           new
                           {
                             MenuItemId = 1,
							 Name = "Chicken Feast",
							 Description ="Two larger chicken burger, 6 pcs nuggets, two large fries",
                             FoodTypeId = 1,
							 Menu_CategoryId =3,
                             Menu_TypeId = 2,


                           });

            // Create Seed Data For the MenuItem Table:
            modelBuilder.Entity<MenuItem>()
                           .HasData(
                           new
                           {
                               MenuItemId = 2,
                               Name = "The Braai feast",
                               Description = "Pap, boerewors an Tbone steak",
                               FoodTypeId = 2,
                               Menu_CategoryId= 3,
                               Menu_TypeId = 2,
                              


                           });

            modelBuilder.Entity<MenuItem>()
                          .HasData(
                          new
                          {
                              MenuItemId = 3,
                              Name = "Chilli cheese poppers",
                              Description = "Mozarella stuffe cheese balls",
                              FoodTypeId = 3,
                              Menu_CategoryId = 2,
                              Menu_TypeId = 2,
                              


                          });
            modelBuilder.Entity<MenuItem>()
                          .HasData(
                          new
                          {
                              MenuItemId = 4,
                              Name = "Mexican salad",
                              Description = "A green salad with salsa mix",
                              FoodTypeId = 4,
                              Menu_CategoryId = 5,
                              Menu_TypeId = 2,
                              


                          });
            modelBuilder.Entity<MenuItem>()
                          .HasData(
                          new
                          {
                              MenuItemId = 5,
                              Name = "Blueberry cheescake slice",
                              Description = "Delicious cheesecake with blueberry sauce topping",
                              FoodTypeId = 3,
                              Menu_CategoryId = 4,
                              Menu_TypeId = 2,
                          });
            modelBuilder.Entity<MenuItem>()
                         .HasData(
                         new
                         {
                             MenuItemId = 6,
                             Name = "English Breakfast",
                             Description = "Delicious everyday english breakfast with eggs and bacon",
                             FoodTypeId = 1,
                             Menu_CategoryId = 1,
                             Menu_TypeId = 1,
                         });
            modelBuilder.Entity<MenuItem>()
                         .HasData(
                         new
                         {
                             MenuItemId = 7,
                             Name = "Blueberry smoothy bowl",
                             Description = "Smoothy bowl with blueberries, almond milk and honey",
                             FoodTypeId = 4,
                             Menu_CategoryId = 1,
                             Menu_TypeId = 1,
                         });
            modelBuilder.Entity<MenuItem>()
                        .HasData(
                        new
                        {
                            MenuItemId = 8,
                            Name = "Toatsed beef panini sandwich",
                            Description = "A toasted panini sandwich with beef sausages, tomatos and cheese",
                            FoodTypeId = 2,
                            Menu_CategoryId = 1,
                            Menu_TypeId = 1,
                        });



            //create seed data for MENU ITEM PRICE
            modelBuilder.Entity<MenuItem_Price>()
                         .HasData(
                         new
                         {
                             MenuItem_PriceId = 1,
                             MenuItemId = 5,
                             Amount = 50.50m
                         }) ;
            modelBuilder.Entity<MenuItem_Price>()
                        .HasData(
                        new
                        {
                            MenuItem_PriceId = 2,
                            MenuItemId = 1,
                            Amount = 105.35m
                        });
            modelBuilder.Entity<MenuItem_Price>()
                        .HasData(
                        new
                        {
                            MenuItem_PriceId = 3,
                            MenuItemId = 4,
                            Amount = 35.10m
                        });

            modelBuilder.Entity<MenuItem_Price>()
                        .HasData(
                        new
                        {
                            MenuItem_PriceId = 5,
                            MenuItemId = 2,
                            Amount = 200.50m
                        });
            modelBuilder.Entity<MenuItem_Price>()
                        .HasData(
                        new
                        {
                            MenuItem_PriceId = 6,
                            MenuItemId = 3,
                            Amount = 45.50m
                        });
            modelBuilder.Entity<MenuItem_Price>()
                        .HasData(
                        new
                        {
                            MenuItem_PriceId = 10,
                            MenuItemId = 6,
                            Amount = 92.00m
                        });
            modelBuilder.Entity<MenuItem_Price>()
                        .HasData(
                        new
                        {
                            MenuItem_PriceId = 11,
                            MenuItemId = 7,
                            Amount = 52.00m
                        });
            modelBuilder.Entity<MenuItem_Price>()
                        .HasData(
                        new
                        {
                            MenuItem_PriceId = 12,
                            MenuItemId = 8,
                            Amount = 35.00m
                        });


            // Create Seed Data For the Drink type Table:
            modelBuilder.Entity<Drink_Type>()
                           .HasData(
                           new
                           {
                               Drink_TypeId = 1,
                               Name = "Alcohol",

                           });
            modelBuilder.Entity<Drink_Type>()
                           .HasData(
                           new
                           {
                               Drink_TypeId = 2,
                               Name = "Non-Alcohol",

                           });

            // Create Seed Data For the Drink Table:
            modelBuilder.Entity<Drink>()
                           .HasData(
                           new
                           {
                               DrinkId = 1,
                               Name = "Margarita",
                               Drink_TypeId = 1,

                           });

            modelBuilder.Entity<Drink>()
                          .HasData(
                          new
                          {
                              DrinkId = 2,
                              Name = "Strawberry Daiquri",
                              Drink_TypeId = 1,

                          });
            modelBuilder.Entity<Drink>()
                          .HasData(
                          new
                          {
                              DrinkId = 3,
                              Name = "Blood Mary",
                              Drink_TypeId = 1,

                          });
            modelBuilder.Entity<Drink>()
                          .HasData(
                          new
                          {
                              DrinkId = 4,
                              Name = "Virgin Mojito",
                              Drink_TypeId = 2,

                          });
            modelBuilder.Entity<Drink>()
                          .HasData(
                          new
                          {
                              DrinkId = 5,
                              Name = "Cappuccino",
                              Drink_TypeId = 2,

                          });
            modelBuilder.Entity<Drink>()
                          .HasData(
                          new
                          {
                              DrinkId = 6,
                              Name = "Frozen lemonade",
                              Drink_TypeId = 2,

                          });

            //create seed data drink prices 
            modelBuilder.Entity<Drink_Price>()
                        .HasData(
                        new
                        {
                            Drink_PriceId = 1,
                            Amount = 55m,
                            DrinkId = 1,

                        });
            modelBuilder.Entity<Drink_Price>()
                       .HasData(
                       new
                       {
                           Drink_PriceId = 2,
                           Amount = 75m,
                           DrinkId = 2,

                       });
            modelBuilder.Entity<Drink_Price>()
                       .HasData(
                       new
                       {
                           Drink_PriceId = 3,
                           Amount = 99m,
                           DrinkId = 3,

                       });
            modelBuilder.Entity<Drink_Price>()
                       .HasData(
                       new
                       {
                           Drink_PriceId = 4,
                           Amount = 45m,
                           DrinkId = 4,

                       });
            modelBuilder.Entity<Drink_Price>()
                       .HasData(
                       new
                       {
                           Drink_PriceId = 5,
                           Amount = 65m,
                           DrinkId = 5,

                       });
            modelBuilder.Entity<Drink_Price>()
                       .HasData(
                       new
                       {
                           Drink_PriceId = 6,
                           Amount = 100m,
                           DrinkId = 6,

                       });


            //create seed data for order type
            modelBuilder.Entity<OrderType>()
                          .HasData(
                          new
                          {
                              OrderType_ID = 1,
                              Name = "Sit-In",


                          });
            modelBuilder.Entity<OrderType>()
                          .HasData(
                          new
                          {
                              OrderType_ID = 2,
                              Name = "Takeaway",


                          });
            //create seed data for table number
            modelBuilder.Entity<Table_Number>()
                          .HasData(
                          new
                          {
                              Table_NumberId = 1,
                              TableID = "Table 1",


                          });
            modelBuilder.Entity<Table_Number>()
                         .HasData(
                         new
                         {
                             Table_NumberId = 2,
                             TableID = "Table 2",


                         });
            modelBuilder.Entity<Table_Number>()
                         .HasData(
                         new
                         {
                             Table_NumberId = 3,
                             TableID = "Table 3",


                         });
            modelBuilder.Entity<Table_Number>()
                        .HasData(
                        new
                        {
                            Table_NumberId = 4,
                            TableID = "Table 4",


                        });
            modelBuilder.Entity<Table_Number>()
                        .HasData(
                        new
                        {
                            Table_NumberId = 5,
                            TableID = "Table 5",


                        });
            modelBuilder.Entity<Table_Number>()
                        .HasData(
                        new
                        {
                            Table_NumberId = 6,
                            TableID = "Table 6",


                        });

            //seed data for VAT
            modelBuilder.Entity<VAT>()
                        .HasData(
                        new
                        {
                            VatId = 1,
                            Description = "10% VAT on total",
                            Amount = 0.10m,
                        });
            modelBuilder.Entity<VAT>()
                       .HasData(
                       new
                       {
                           VatId = 2,
                           Description = "15% VAT on total",
                           Amount = 0.15m,
                       });
            //seed data for Discount
            modelBuilder.Entity<Discount>()
                       .HasData(
                       new
                       {
                           DiscountId = 1,
                           Name = "Month end discount",
                           Description = "10% Discount",
                           Amount = 0.10m,
                           Start_Date = DateTime.Now,
                           End_Date = DateTime.Now.AddDays(10),
                       });

            //seed data for KitchenOrder
            modelBuilder.Entity<KitchenOrder>()
                       .HasData(
                       new
                       {
                           KitchenOrderId = 1,
                           TableNumber = "",
                           KitchenOrderNumber = "TAKE-0001",
                           OrderedItems = "Toatsed beef panini sandwich, Mexican salad",
                           OrderedDrinks = "Frozen lemonade, Margarita",
                           Subtotal = 193.59m,
                           Discount = 0m,
                           VAT = 31.51m,
                           Total = 225.10m
                       });

            modelBuilder.Entity<KitchenOrder>()
                      .HasData(
                      new
                      {
                          KitchenOrderId = 2,
                          TableNumber = "Table 6",
                          KitchenOrderNumber = "SIT-0201",
                          OrderedItems = "Chicken Feast",
                          OrderedDrinks = "Strawberry Daiquri, Frozen lemonade, Margarita, Blood Mary",
                          Subtotal = 373.54m,
                          Discount = 0m,
                          VAT = 60.81m,
                          Total = 434.35m
                      });
            modelBuilder.Entity<KitchenOrder>()
                     .HasData(
                     new
                     {
                         KitchenOrderId = 3,
                         TableNumber = "Table 2",
                         KitchenOrderNumber = "SIT-0202",
                         OrderedItems = "Chicken Feast, Chilli cheese poppers",
                         OrderedDrinks = "Strawberry Daiquri, Frozen lemonade",
                         Subtotal = 280.23m,
                         Discount = 50m,
                         VAT = 45.62m,
                         Total = 275.85m
                     });
            modelBuilder.Entity<KitchenOrder>()
                     .HasData(
                     new
                     {
                         KitchenOrderId = 4,
                         TableNumber = "Table 1",
                         KitchenOrderNumber = "SIT-0203",
                         OrderedItems = "Blueberry cheescake slice, Blueberry cheescake slice",
                         OrderedDrinks = "Blood Mary,Virgin Mojito",
                         Subtotal = 210.70m,
                         Discount = 21.07m,
                         VAT = 34.30m,
                         Total = 223.93m
                     });
            modelBuilder.Entity<KitchenOrder>()
                   .HasData(
                   new
                   {
                       KitchenOrderId = 5,
                       TableNumber = "Table 4",
                       KitchenOrderNumber = "SIT-0204",
                       OrderedItems = "Blueberry cheescake slice, Blueberry cheescake slice",
                       OrderedDrinks = "Virgin Mojito",
                       Subtotal = 125.56m,
                       Discount = 12.56m,
                       VAT = 20.44m,
                       Total = 133.44m
                   });
            modelBuilder.Entity<KitchenOrder>()
                   .HasData(
                   new
                   {
                       KitchenOrderId = 6,
                       TableNumber = "",
                       KitchenOrderNumber = "TAKE-0002",
                       OrderedItems = "English Breakfast",
                       OrderedDrinks = "Cappuccino",
                       Subtotal = 135.02m,
                       Discount = 0m,
                       VAT = 21.98m,
                       Total = 157m
                   });
            modelBuilder.Entity<KitchenOrder>()
                  .HasData(
                  new
                  {
                      KitchenOrderId = 7,
                      TableNumber = "Table 6",
                      KitchenOrderNumber = "SIT-0205",
                      OrderedItems = "",
                      OrderedDrinks = "Strawberry Daiquri, Strawberry Daiquri, Blood Mary,Magarita,Strawberry Daiquri ",
                      Subtotal = 325.94m,
                      Discount = 0m,
                      VAT = 53.06m,
                      Total = 379m
                  });
            modelBuilder.Entity<KitchenOrder>()
                 .HasData(
                 new
                 {
                     KitchenOrderId = 8,
                     TableNumber = "",
                     KitchenOrderNumber = "TAKE-0003",
                     OrderedItems = "The Braai feast",
                     OrderedDrinks = "Strawberry Daiquri, Strawberry Daiquri",
                     Subtotal = 301.43m,
                     Discount = 35.05m,
                     VAT = 49.07m,
                     Total = 315.45m
                 });
            modelBuilder.Entity<KitchenOrder>()
                .HasData(
                new
                {
                    KitchenOrderId = 9,
                    TableNumber = "Table 5",
                    KitchenOrderNumber = "SIT-0206",
                    OrderedItems = "The Braai feast, Mexican salad",
                    OrderedDrinks = "Virgin Mojito, Virgin Mojito",
                    Subtotal = 280.02m,
                    Discount = 32.56m,
                    VAT = 45.58m,
                    Total = 293.04m
                });
            //seed data for Inventory_Price

            modelBuilder.Entity<Inventory_Price>()
                       .HasData(
                       new
                       {
                           InventoryPrice_Id = 1,
                           Price = 25m,
                           Inventory_ItemId = 1,
                           Date = DateTime.Now

                       });

            modelBuilder.Entity<Inventory_Price>()
                       .HasData(
                       new
                       {
                           InventoryPrice_Id = 2,
                           Price = 250m,
                           Inventory_ItemId = 2,
                           Date = DateTime.Now

                       });

            modelBuilder.Entity<Inventory_Price>()
                       .HasData(
                       new
                       {
                           InventoryPrice_Id = 3,
                           Price = 200m,
                           Inventory_ItemId = 3,
                           Date = DateTime.Now

                       });

            modelBuilder.Entity<Inventory_Price>()
                       .HasData(
                       new
                       {
                           InventoryPrice_Id = 4,
                           Price = 38m,
                           Inventory_ItemId = 4,
                           Date = DateTime.Now

                       });
            modelBuilder.Entity<Inventory_Price>()
                     .HasData(
                     new
                     {
                         InventoryPrice_Id = 5,
                         Price = 45m,
                         Inventory_ItemId = 5,
                         Date = DateTime.Now

                     });
            modelBuilder.Entity<Inventory_Price>()
                     .HasData(
                     new
                     {
                         InventoryPrice_Id = 6,
                         Price = 75m,
                         Inventory_ItemId = 6,
                         Date = DateTime.Now

                     });
            modelBuilder.Entity<Inventory_Price>()
                     .HasData(
                     new
                     {
                         InventoryPrice_Id = 7,
                         Price = 100m,
                         Inventory_ItemId = 7,
                         Date = DateTime.Now

                     });
            modelBuilder.Entity<Inventory_Price>()
                     .HasData(
                     new
                     {
                         InventoryPrice_Id = 8,
                         Price = 40m,
                         Inventory_ItemId = 8,
                         Date = DateTime.Now

                     });
            modelBuilder.Entity<Inventory_Price>()
                     .HasData(
                     new
                     {
                         InventoryPrice_Id = 9,
                         Price = 28m,
                         Inventory_ItemId = 9,
                         Date = DateTime.Now

                     });
            modelBuilder.Entity<Inventory_Price>()
                     .HasData(
                     new
                     {
                         InventoryPrice_Id = 10,
                         Price = 35m,
                         Inventory_ItemId = 10,
                         Date = DateTime.Now

                     });



            //Many to many with MenuItem
            modelBuilder.Entity<MenuItem>()
                        .HasOne(m => m.Menu_Type)
                        .WithMany()
                        .HasForeignKey(m => m.Menu_TypeId);

            modelBuilder.Entity<MenuItem>()
            .HasOne(m => m.MenuItem_Category)
            .WithMany()
            .HasForeignKey(m => m.Menu_CategoryId);

            modelBuilder.Entity<MenuItem>()
            .HasOne(m => m.Food_Type)
            .WithMany()
            .HasForeignKey(m => m.FoodTypeId);

            




            // For the Access_UserRole M2M payload (Uncomment code below and run migration to generate tables)
            modelBuilder.Entity<Access>()
			    .HasMany(t => t.User_Roles)
			    .WithMany(g => g.Accesses)
			    .UsingEntity<Access_UserRole>
			     (tg => tg.HasOne<User_Role>().WithMany(),
			      tg => tg.HasOne<Access>().WithMany());

			// For the Entertainer_EntertainmentType M2M  payload (Uncomment code below and run migration to generate tables)
			//modelBuilder.Entity<Entertainer>()
			//	.HasMany(t => t.Entertainment_Types)
			//	.WithMany(g => g.Entertainers)
			//	.UsingEntity<Entertainer_EntertainmentType>
			//	 (tg => tg.HasOne<Entertainment_Type>().WithMany(),
			//	  tg => tg.HasOne<Entertainer>().WithMany());

			// For the Entertainer_Schedule M2M payload (Uncomment code below and run migration to generate tables)
			//modelBuilder.Entity<Schedule>()
			//	.HasMany(t => t.Entertainers)
			//	.WithMany(g => g.Schedules)
			//	.UsingEntity<Entertainer_Schedule>
			//	 (tg => tg.HasOne<Entertainer>().WithMany(),
			//	  tg => tg.HasOne<Schedule>().WithMany());

			// For the Supplier_InventoryItem M2M payload (Uncomment code below and run migration to generate tables)
			modelBuilder.Entity<Inventory_Item>()
				.HasMany(t => t.Suppliers)
				.WithMany(g => g.Inventory_Items)
				.UsingEntity<Supplier_InventoryItem>
			 (tg => tg.HasOne<Supplier>().WithMany(),
				  tg => tg.HasOne<Inventory_Item>().WithMany());

			// For the Order_Drink M2M payload (Uncomment code below and run migration to generate tables)
			modelBuilder.Entity<Drink>()
				.HasMany(t => t.Orders)
				.WithMany(g => g.Drinks)
				.UsingEntity<Order_Drink>
				 (tg => tg.HasOne<Order>().WithMany(),
				  tg => tg.HasOne<Drink>().WithMany());

			// For the Order_MenuItem M2M payload (Uncomment code below and run migration to generate tables)
			modelBuilder.Entity<Order>()
				.HasMany(t => t.MenuItems)
				.WithMany(g => g.Orders)
				.UsingEntity<Order_MenuItem>
				 (tg => tg.HasOne<MenuItem>().WithMany(),
				  tg => tg.HasOne<Order>().WithMany());

            //Event
           // modelBuilder.Entity<Administrator>()

           // .HasOne(sti => sti.Events)

           //.WithMany()

           //.HasForeignKey(sti => sti.AdministratorId);

           // modelBuilder.Entity<Event>()

           //.HasKey(sti => sti.EventId);
        }
	}
}
