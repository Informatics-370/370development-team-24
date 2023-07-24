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

			modelBuilder.Entity<User>().ToTable("Users");
			base.OnModelCreating(modelBuilder);

			// Create Seed Data For the Events Table:

      modelBuilder.Entity<Event>()
			 .HasData(
			 new
			 {
				 EventId = 1,
				 Event_Name = "Smooth Sunday",
				 Description = "An event filled with spectacular music performances and art display "
			 });

			modelBuilder.Entity<Event>()
				   .HasData(
				   new
				   {
					   EventId = 2,
					   Event_Name = "Wacky Wednesday",
					   Description = "An event where various forms of entertainments take place"
				   });

			modelBuilder.Entity<Event>()
				  .HasData(
				  new
				  {
					  EventId = 3,
					  Event_Name = "Poetry Musings",
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


						// Create Seed Data For the Employee Table:
						modelBuilder.Entity<Employee>()
						   .HasData(
						   new
						   {
							   EmployeeId = 1,
							   Surname = "James",
							   FirstName = "Vanessa",
							   Email_Address = "VanessaJames@gmial.com",
							   PhysicalAddress = "404 Jacob Street",
							   City = "Pretoria",
							   State = "Gauteng",
							   PostalCode = "0181",
							   PhoneNumber = "0847541236"

						   });
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
		}
	}
}
