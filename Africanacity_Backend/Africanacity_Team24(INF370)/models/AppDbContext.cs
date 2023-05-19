using System.Collections.Generic;
using System.Reflection.Emit;
using System;
using Microsoft.EntityFrameworkCore;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Admin;
using Africanacity_Team24_INF370_.models.Booking;
using Africanacity_Team24_INF370_.models.Inventory;
using Africanacity_Team24_INF370_.models.Restraurant;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Africanacity_Team24_INF370_.models.Login;
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
		public DbSet<Employee> Employees { get; set; }
        public DbSet<Employee_Role> Employee_Roles { get; set; }
		public DbSet<Help> Helps { get; set; }
		public DbSet<Help_Category> Help_Categories{ get; set; }
		public DbSet<Password> Passwords { get; set; }
		public DbSet<Title> Titles { get; set; }
		public DbSet<User> Users { get; set; }
		public DbSet<User_Role> User_Roles { get; set; }
		public DbSet<VAT> Vats { get; set; }

		//Booking model
		public DbSet<Bookings> Bookings { get; set; }
		public DbSet<Booking_Status> Booking_Statuses { get; set; }
		public DbSet<Entertainer> Entertainers { get; set; }
		public DbSet<Entertainer_EntertainmentType> Entertainer_Entertainments { get; set; }
		public DbSet<Entertainer_Schedule> Entertainer_Schedules { get; set; }
		public DbSet<Event> Events { get; set; }
		public DbSet<Schedule> Schedules { get; set; }
		public DbSet<Schedule_Status> Schedule_Statuses { get; set; }


		//Inventory model
		public DbSet<Inventory_Item> Inventory_Items { get; set; }
		public DbSet<Inventory_Type> Inventory_Types { get; set; }
		public DbSet<Supplier> Suppliers { get; set; }
		public DbSet<Supplier_InventoryItem> Supplier_InventoryItems { get; set; }
		public DbSet<Supplier_Type> Supplier_Types { get; set; }

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
		public DbSet<Payment> Payments { get; set; }
		public DbSet<Payment_Method> Payment_Methods { get; set; }
		public DbSet<Table_Number> Table_Numbers { get; set; }
		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
            // Create Seed Data For the Employee Table:
            modelBuilder.Entity<Employee>()
						   .HasData(
						   new
						   {
							   EmployeeId = 1,
							   Surname = "James",
							   FirstName = "Vanessa",
							   Email_Address = "VanessaJames@gmail.com",
							   Physical_Address = "404 Jacob Street",
							   PhoneNumber = "0847541236"

						   });
            modelBuilder.Entity<Employee>()
                         .HasData(
                         new
                         {
                             EmployeeId = 2,
                             Surname = "Williams",
                             FirstName = "Serena",
                             Email_Address = "SerenaWilliams@gmail.com",
                             Physical_Address = "132 Harriet Street",
                             PhoneNumber = "0842341236"

                         });
            modelBuilder.Entity<Employee>()
                         .HasData(
                         new
                         {
                             EmployeeId = 3,
                             Surname = "Elba",
                             FirstName = "Edris",
                             Email_Address = "EdrisElba@gmail.com",
                             Physical_Address = "245 homelyn Street",
                             PhoneNumber = "0212378798"

                         });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 4,
                            Surname = "Nyongo",
                            FirstName = "Lupita",
                            Email_Address = "NyongoLupita@gmail.com",
                            Physical_Address = "254 Summer Street",
                            PhoneNumber = "0455783475"

                        });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 5,
                            Surname = "Jackson",
                            FirstName = "Micheal",
                            Email_Address = "MicheaJackson@gmail.com",
                            Physical_Address = "567 Winter Street",
                            PhoneNumber = "0874567836"

                        });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 6,
                            Surname = "Kim",
                            FirstName = "Taehyung",
                            Email_Address = "TaehyungKim@gmial.com",
                            Physical_Address = "345 Shallow  Street",
                            PhoneNumber = "0874562134"

                        });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 7,
                            Surname = "Coleman",
                            FirstName = "Zendaya",
                            Email_Address = "ZendayaColeman@gmail.com",
                            Physical_Address = "243 Super Street ",
                            PhoneNumber = "0212378798"

                        });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 8,
                            Surname = "Federal",
                            FirstName = "Roger",
                            Email_Address = "RogerFederal@gmail.com",
                            Physical_Address = "987 Wall Street",
                            PhoneNumber = "0612346487"

                        });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 9,
                            Surname = "Lopez",
                            FirstName = "Jennifer",
                            Email_Address = "JenniferLOpez@gmail.com",
                            Physical_Address = "967 Ballard Street",
                            PhoneNumber = "0874834576"

                        });
            modelBuilder.Entity<Employee>()
                        .HasData(
                        new
                        {
                            EmployeeId = 10,
                            Surname = "Boseman",
                            FirstName = "Chadwick",
                            Email_Address = "ChadwickBoseman@gmail.com",
                            Physical_Address = "483 Alien Street",
                            PhoneNumber = "0923456789"

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




            // For the Access_UserRole M2M payload (Uncomment code below and run migration to generate tables)
            modelBuilder.Entity<Access>()
			    .HasMany(t => t.User_Roles)
			    .WithMany(g => g.Accesses)
			    .UsingEntity<Access_UserRole>
			     (tg => tg.HasOne<User_Role>().WithMany(),
			      tg => tg.HasOne<Access>().WithMany());

			// For the Entertainer_EntertainmentType M2M  payload (Uncomment code below and run migration to generate tables)
			modelBuilder.Entity<Entertainer>()
				.HasMany(t => t.Entertainment_Types)
				.WithMany(g => g.Entertainers)
				.UsingEntity<Entertainer_EntertainmentType>
				 (tg => tg.HasOne<Entertainment_Type>().WithMany(),
				  tg => tg.HasOne<Entertainer>().WithMany());

			// For the Entertainer_Schedule M2M payload (Uncomment code below and run migration to generate tables)
			modelBuilder.Entity<Schedule>()
				.HasMany(t => t.Entertainers)
				.WithMany(g => g.Schedules)
				.UsingEntity<Entertainer_Schedule>
				 (tg => tg.HasOne<Entertainer>().WithMany(),
				  tg => tg.HasOne<Schedule>().WithMany());

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
		}
	}
}
