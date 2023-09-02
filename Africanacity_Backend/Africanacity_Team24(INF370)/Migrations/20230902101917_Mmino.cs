using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Africanacity_Team24_INF370_.Migrations
{
    public partial class Mmino : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Accesses",
                columns: table => new
                {
                    AccessId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accesses", x => x.AccessId);
                });

            migrationBuilder.CreateTable(
                name: "Administrators",
                columns: table => new
                {
                    AdministratorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Surname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email_Address = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Physical_Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrators", x => x.AdministratorId);
                });

            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    PhysicalAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshTokenExpiryTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ResetPasswordToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResetPasswordTokenExpiry = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Booking_Statuses",
                columns: table => new
                {
                    Booking_StatusId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Booking_Statuses", x => x.Booking_StatusId);
                });

            migrationBuilder.CreateTable(
                name: "Drink_Prices",
                columns: table => new
                {
                    Drink_PriceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    DrinkId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drink_Prices", x => x.Drink_PriceId);
                });

            migrationBuilder.CreateTable(
                name: "Drink_Types",
                columns: table => new
                {
                    Drink_TypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drink_Types", x => x.Drink_TypeId);
                });

            migrationBuilder.CreateTable(
                name: "Employee_Roles",
                columns: table => new
                {
                    Employee_RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee_Roles", x => x.Employee_RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Entertainer_Entertainments",
                columns: table => new
                {
                    Entertainer_EntertainmentTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entertainer_Entertainments", x => x.Entertainer_EntertainmentTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Entertainer_Schedules",
                columns: table => new
                {
                    Entertainer_ScheduleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entertainer_Schedules", x => x.Entertainer_ScheduleId);
                });

            migrationBuilder.CreateTable(
                name: "Entertainers",
                columns: table => new
                {
                    EntertainerId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Surname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email_Address = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Physical_Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entertainers", x => x.EntertainerId);
                });

            migrationBuilder.CreateTable(
                name: "Food_Types",
                columns: table => new
                {
                    FoodTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Food_Types", x => x.FoodTypeId);
                });

            migrationBuilder.CreateTable(
                name: "Genders",
                columns: table => new
                {
                    GenderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GenderId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Genders", x => x.GenderId);
                    table.ForeignKey(
                        name: "FK_Genders_Genders_GenderId1",
                        column: x => x.GenderId1,
                        principalTable: "Genders",
                        principalColumn: "GenderId");
                });

            migrationBuilder.CreateTable(
                name: "Help_Categories",
                columns: table => new
                {
                    Help_CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Help_Categories", x => x.Help_CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Inventory_Types",
                columns: table => new
                {
                    Inventory_TypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventory_Types", x => x.Inventory_TypeId);
                });

            migrationBuilder.CreateTable(
                name: "IonicAppUsers",
                columns: table => new
                {
                    IonicAppUserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email_Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshTokenExpiryTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IonicAppUsers", x => x.IonicAppUserId);
                });

            migrationBuilder.CreateTable(
                name: "Menu_Types",
                columns: table => new
                {
                    Menu_TypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menu_Types", x => x.Menu_TypeId);
                });

            migrationBuilder.CreateTable(
                name: "MenuItem_Categories",
                columns: table => new
                {
                    Menu_CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    MenuItem_CategoryMenu_CategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuItem_Categories", x => x.Menu_CategoryId);
                    table.ForeignKey(
                        name: "FK_MenuItem_Categories_MenuItem_Categories_MenuItem_CategoryMenu_CategoryId",
                        column: x => x.MenuItem_CategoryMenu_CategoryId,
                        principalTable: "MenuItem_Categories",
                        principalColumn: "Menu_CategoryId");
                });

            migrationBuilder.CreateTable(
                name: "Order_Statuses",
                columns: table => new
                {
                    Order_StatusId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order_Statuses", x => x.Order_StatusId);
                });

            migrationBuilder.CreateTable(
                name: "OrderTypes",
                columns: table => new
                {
                    OrderType_ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderTypes", x => x.OrderType_ID);
                });

            migrationBuilder.CreateTable(
                name: "Passwords",
                columns: table => new
                {
                    PasswordId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HashPassword = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Dataset = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Passwords", x => x.PasswordId);
                });

            migrationBuilder.CreateTable(
                name: "Payment_Methods",
                columns: table => new
                {
                    Payment_MethodId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payment_Methods", x => x.Payment_MethodId);
                });

            migrationBuilder.CreateTable(
                name: "Schedule_Statuses",
                columns: table => new
                {
                    Schedule_StatusId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedule_Statuses", x => x.Schedule_StatusId);
                });

            migrationBuilder.CreateTable(
                name: "Supplier_Types",
                columns: table => new
                {
                    Supplier_TypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplier_Types", x => x.Supplier_TypeId);
                });

            migrationBuilder.CreateTable(
                name: "Table_Numbers",
                columns: table => new
                {
                    Table_NumberId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TableID = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Table_Numbers", x => x.Table_NumberId);
                });

            migrationBuilder.CreateTable(
                name: "Titles",
                columns: table => new
                {
                    TitleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Titles", x => x.TitleId);
                });

            migrationBuilder.CreateTable(
                name: "User_Roles",
                columns: table => new
                {
                    User_RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User_Roles", x => x.User_RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Vats",
                columns: table => new
                {
                    VatId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vats", x => x.VatId);
                });

            migrationBuilder.CreateTable(
                name: "Discounts",
                columns: table => new
                {
                    DiscountId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Start_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    End_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AdministratorId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Discounts", x => x.DiscountId);
                    table.ForeignKey(
                        name: "FK_Discounts_Administrators_AdministratorId",
                        column: x => x.AdministratorId,
                        principalTable: "Administrators",
                        principalColumn: "AdministratorId");
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    EventId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AdministratorId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.EventId);
                    table.ForeignKey(
                        name: "FK_Events_Administrators_AdministratorId",
                        column: x => x.AdministratorId,
                        principalTable: "Administrators",
                        principalColumn: "AdministratorId");
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Drinks",
                columns: table => new
                {
                    DrinkId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Drink_TypeId = table.Column<int>(type: "int", nullable: false),
                    Drink_TypeId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Drinks", x => x.DrinkId);
                    table.ForeignKey(
                        name: "FK_Drinks_Drink_Types_Drink_TypeId",
                        column: x => x.Drink_TypeId,
                        principalTable: "Drink_Types",
                        principalColumn: "Drink_TypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Drinks_Drink_Types_Drink_TypeId1",
                        column: x => x.Drink_TypeId1,
                        principalTable: "Drink_Types",
                        principalColumn: "Drink_TypeId");
                });

            migrationBuilder.CreateTable(
                name: "OtherDrinks",
                columns: table => new
                {
                    OtherDrinkId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Drink_TypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtherDrinks", x => x.OtherDrinkId);
                    table.ForeignKey(
                        name: "FK_OtherDrinks_Drink_Types_Drink_TypeId",
                        column: x => x.Drink_TypeId,
                        principalTable: "Drink_Types",
                        principalColumn: "Drink_TypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Entertainment_Type",
                columns: table => new
                {
                    Entertainment_TypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EntertainerId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entertainment_Type", x => x.Entertainment_TypeId);
                    table.ForeignKey(
                        name: "FK_Entertainment_Type_Entertainers_EntertainerId",
                        column: x => x.EntertainerId,
                        principalTable: "Entertainers",
                        principalColumn: "EntertainerId");
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Surname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email_Address = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Physical_Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Employment_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Employee_RoleId = table.Column<int>(type: "int", nullable: false),
                    GenderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                    table.ForeignKey(
                        name: "FK_Employees_Employee_Roles_Employee_RoleId",
                        column: x => x.Employee_RoleId,
                        principalTable: "Employee_Roles",
                        principalColumn: "Employee_RoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Employees_Genders_GenderId",
                        column: x => x.GenderId,
                        principalTable: "Genders",
                        principalColumn: "GenderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Helps",
                columns: table => new
                {
                    HelpId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AdministratorId = table.Column<int>(type: "int", nullable: true),
                    Help_CategoryId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Helps", x => x.HelpId);
                    table.ForeignKey(
                        name: "FK_Helps_Administrators_AdministratorId",
                        column: x => x.AdministratorId,
                        principalTable: "Administrators",
                        principalColumn: "AdministratorId");
                    table.ForeignKey(
                        name: "FK_Helps_Help_Categories_Help_CategoryId",
                        column: x => x.Help_CategoryId,
                        principalTable: "Help_Categories",
                        principalColumn: "Help_CategoryId");
                });

            migrationBuilder.CreateTable(
                name: "Inventory_Items",
                columns: table => new
                {
                    Inventory_ItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ItemName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Inventory_TypeId = table.Column<int>(type: "int", nullable: false),
                    AdministratorId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventory_Items", x => x.Inventory_ItemId);
                    table.ForeignKey(
                        name: "FK_Inventory_Items_Administrators_AdministratorId",
                        column: x => x.AdministratorId,
                        principalTable: "Administrators",
                        principalColumn: "AdministratorId");
                    table.ForeignKey(
                        name: "FK_Inventory_Items_Inventory_Types_Inventory_TypeId",
                        column: x => x.Inventory_TypeId,
                        principalTable: "Inventory_Types",
                        principalColumn: "Inventory_TypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MenuItems",
                columns: table => new
                {
                    MenuItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Menu_TypeId = table.Column<int>(type: "int", nullable: false),
                    Menu_CategoryId = table.Column<int>(type: "int", nullable: false),
                    FoodTypeId = table.Column<int>(type: "int", nullable: false),
                    Food_TypeFoodTypeId1 = table.Column<int>(type: "int", nullable: true),
                    Menu_TypeId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuItems", x => x.MenuItemId);
                    table.ForeignKey(
                        name: "FK_MenuItems_Food_Types_Food_TypeFoodTypeId1",
                        column: x => x.Food_TypeFoodTypeId1,
                        principalTable: "Food_Types",
                        principalColumn: "FoodTypeId");
                    table.ForeignKey(
                        name: "FK_MenuItems_Food_Types_FoodTypeId",
                        column: x => x.FoodTypeId,
                        principalTable: "Food_Types",
                        principalColumn: "FoodTypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MenuItems_Menu_Types_Menu_TypeId",
                        column: x => x.Menu_TypeId,
                        principalTable: "Menu_Types",
                        principalColumn: "Menu_TypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MenuItems_Menu_Types_Menu_TypeId1",
                        column: x => x.Menu_TypeId1,
                        principalTable: "Menu_Types",
                        principalColumn: "Menu_TypeId");
                    table.ForeignKey(
                        name: "FK_MenuItems_MenuItem_Categories_Menu_CategoryId",
                        column: x => x.Menu_CategoryId,
                        principalTable: "MenuItem_Categories",
                        principalColumn: "Menu_CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Payment_MethodId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.PaymentId);
                    table.ForeignKey(
                        name: "FK_Payments_Payment_Methods_Payment_MethodId",
                        column: x => x.Payment_MethodId,
                        principalTable: "Payment_Methods",
                        principalColumn: "Payment_MethodId");
                });

            migrationBuilder.CreateTable(
                name: "Suppliers",
                columns: table => new
                {
                    SupplierId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SupplierName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email_Address = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Physical_Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Supplier_TypeId = table.Column<int>(type: "int", nullable: false),
                    AdministratorId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suppliers", x => x.SupplierId);
                    table.ForeignKey(
                        name: "FK_Suppliers_Administrators_AdministratorId",
                        column: x => x.AdministratorId,
                        principalTable: "Administrators",
                        principalColumn: "AdministratorId");
                    table.ForeignKey(
                        name: "FK_Suppliers_Supplier_Types_Supplier_TypeId",
                        column: x => x.Supplier_TypeId,
                        principalTable: "Supplier_Types",
                        principalColumn: "Supplier_TypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Access_UserRoles",
                columns: table => new
                {
                    AccessesAccessId = table.Column<int>(type: "int", nullable: false),
                    User_RolesUser_RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Access_UserRoles", x => new { x.AccessesAccessId, x.User_RolesUser_RoleId });
                    table.ForeignKey(
                        name: "FK_Access_UserRoles_Accesses_AccessesAccessId",
                        column: x => x.AccessesAccessId,
                        principalTable: "Accesses",
                        principalColumn: "AccessId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Access_UserRoles_User_Roles_User_RolesUser_RoleId",
                        column: x => x.User_RolesUser_RoleId,
                        principalTable: "User_Roles",
                        principalColumn: "User_RoleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    ScheduleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Start_Time = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    End_Time = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EventId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AdministratorId = table.Column<int>(type: "int", nullable: true),
                    Schedule_StatusId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Schedules", x => x.ScheduleId);
                    table.ForeignKey(
                        name: "FK_Schedules_Administrators_AdministratorId",
                        column: x => x.AdministratorId,
                        principalTable: "Administrators",
                        principalColumn: "AdministratorId");
                    table.ForeignKey(
                        name: "FK_Schedules_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "EventId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Schedules_Schedule_Statuses_Schedule_StatusId",
                        column: x => x.Schedule_StatusId,
                        principalTable: "Schedule_Statuses",
                        principalColumn: "Schedule_StatusId");
                });

            migrationBuilder.CreateTable(
                name: "OtherDrinkPrices",
                columns: table => new
                {
                    OtherDrinkPriceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OtherDrinkId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtherDrinkPrices", x => x.OtherDrinkPriceId);
                    table.ForeignKey(
                        name: "FK_OtherDrinkPrices_OtherDrinks_OtherDrinkId",
                        column: x => x.OtherDrinkId,
                        principalTable: "OtherDrinks",
                        principalColumn: "OtherDrinkId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "bookings",
                columns: table => new
                {
                    BookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Instagram = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Demo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Entertainment_TypeId = table.Column<int>(type: "int", nullable: false),
                    Eventname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Additional = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Booking_StatusId = table.Column<int>(type: "int", nullable: true),
                    EntertainerId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_bookings", x => x.BookingId);
                    table.ForeignKey(
                        name: "FK_bookings_Booking_Statuses_Booking_StatusId",
                        column: x => x.Booking_StatusId,
                        principalTable: "Booking_Statuses",
                        principalColumn: "Booking_StatusId");
                    table.ForeignKey(
                        name: "FK_bookings_Entertainers_EntertainerId",
                        column: x => x.EntertainerId,
                        principalTable: "Entertainers",
                        principalColumn: "EntertainerId");
                    table.ForeignKey(
                        name: "FK_bookings_Entertainment_Type_Entertainment_TypeId",
                        column: x => x.Entertainment_TypeId,
                        principalTable: "Entertainment_Type",
                        principalColumn: "Entertainment_TypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pending_Bookings",
                columns: table => new
                {
                    Pending_BookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Instagram = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    Eventname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Additional = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Demo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Entertainment_TypeId = table.Column<int>(type: "int", nullable: false),
                    EventId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pending_Bookings", x => x.Pending_BookingId);
                    table.ForeignKey(
                        name: "FK_Pending_Bookings_Entertainment_Type_Entertainment_TypeId",
                        column: x => x.Entertainment_TypeId,
                        principalTable: "Entertainment_Type",
                        principalColumn: "Entertainment_TypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Pending_Bookings_Events_EventId",
                        column: x => x.EventId,
                        principalTable: "Events",
                        principalColumn: "EventId");
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ContactNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    PhysicalAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RefreshTokenExpiryTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ResetPasswordToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResetPasswordTokenExpiry = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EntertainmentType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Entertainment_TypeId = table.Column<int>(type: "int", nullable: false),
                    TitleId = table.Column<int>(type: "int", nullable: true),
                    User_RoleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Entertainment_Type_Entertainment_TypeId",
                        column: x => x.Entertainment_TypeId,
                        principalTable: "Entertainment_Type",
                        principalColumn: "Entertainment_TypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Users_Titles_TitleId",
                        column: x => x.TitleId,
                        principalTable: "Titles",
                        principalColumn: "TitleId");
                    table.ForeignKey(
                        name: "FK_Users_User_Roles_User_RoleId",
                        column: x => x.User_RoleId,
                        principalTable: "User_Roles",
                        principalColumn: "User_RoleId");
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: true),
                    Order_StatusId = table.Column<int>(type: "int", nullable: true),
                    Payment_MethodId = table.Column<int>(type: "int", nullable: true),
                    Table_NumberId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_Orders_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "EmployeeId");
                    table.ForeignKey(
                        name: "FK_Orders_Order_Statuses_Order_StatusId",
                        column: x => x.Order_StatusId,
                        principalTable: "Order_Statuses",
                        principalColumn: "Order_StatusId");
                    table.ForeignKey(
                        name: "FK_Orders_Payment_Methods_Payment_MethodId",
                        column: x => x.Payment_MethodId,
                        principalTable: "Payment_Methods",
                        principalColumn: "Payment_MethodId");
                    table.ForeignKey(
                        name: "FK_Orders_Table_Numbers_Table_NumberId",
                        column: x => x.Table_NumberId,
                        principalTable: "Table_Numbers",
                        principalColumn: "Table_NumberId");
                });

            migrationBuilder.CreateTable(
                name: "Inventory_Prices",
                columns: table => new
                {
                    InventoryPrice_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Inventory_ItemId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventory_Prices", x => x.InventoryPrice_Id);
                    table.ForeignKey(
                        name: "FK_Inventory_Prices_Inventory_Items_Inventory_ItemId",
                        column: x => x.Inventory_ItemId,
                        principalTable: "Inventory_Items",
                        principalColumn: "Inventory_ItemId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StockTakes",
                columns: table => new
                {
                    StockTake_Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StockTake_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Inventory_ItemId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockTakes", x => x.StockTake_Id);
                    table.ForeignKey(
                        name: "FK_StockTakes_Inventory_Items_Inventory_ItemId",
                        column: x => x.Inventory_ItemId,
                        principalTable: "Inventory_Items",
                        principalColumn: "Inventory_ItemId");
                });

            migrationBuilder.CreateTable(
                name: "KitchenOrders",
                columns: table => new
                {
                    KitchenOrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TableNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KitchenOrderNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Subtotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    VAT = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Discount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Total = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Order_Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MenuItemId = table.Column<int>(type: "int", nullable: true),
                    OtherDrinkId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KitchenOrders", x => x.KitchenOrderId);
                    table.ForeignKey(
                        name: "FK_KitchenOrders_MenuItems_MenuItemId",
                        column: x => x.MenuItemId,
                        principalTable: "MenuItems",
                        principalColumn: "MenuItemId");
                    table.ForeignKey(
                        name: "FK_KitchenOrders_OtherDrinks_OtherDrinkId",
                        column: x => x.OtherDrinkId,
                        principalTable: "OtherDrinks",
                        principalColumn: "OtherDrinkId");
                });

            migrationBuilder.CreateTable(
                name: "MenuItem_Prices",
                columns: table => new
                {
                    MenuItem_PriceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MenuItemId = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuItem_Prices", x => x.MenuItem_PriceId);
                    table.ForeignKey(
                        name: "FK_MenuItem_Prices_MenuItems_MenuItemId",
                        column: x => x.MenuItemId,
                        principalTable: "MenuItems",
                        principalColumn: "MenuItemId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Supplier_InventoryItems",
                columns: table => new
                {
                    Inventory_ItemsInventory_ItemId = table.Column<int>(type: "int", nullable: false),
                    SuppliersSupplierId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplier_InventoryItems", x => new { x.Inventory_ItemsInventory_ItemId, x.SuppliersSupplierId });
                    table.ForeignKey(
                        name: "FK_Supplier_InventoryItems_Inventory_Items_Inventory_ItemsInventory_ItemId",
                        column: x => x.Inventory_ItemsInventory_ItemId,
                        principalTable: "Inventory_Items",
                        principalColumn: "Inventory_ItemId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Supplier_InventoryItems_Suppliers_SuppliersSupplierId",
                        column: x => x.SuppliersSupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "SupplierId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Supplier_Inventorys",
                columns: table => new
                {
                    SupplierItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Inventory_ItemId = table.Column<int>(type: "int", nullable: false),
                    SupplierId = table.Column<int>(type: "int", nullable: false),
                    Ordered_Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplier_Inventorys", x => x.SupplierItemId);
                    table.ForeignKey(
                        name: "FK_Supplier_Inventorys_Inventory_Items_Inventory_ItemId",
                        column: x => x.Inventory_ItemId,
                        principalTable: "Inventory_Items",
                        principalColumn: "Inventory_ItemId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Supplier_Inventorys_Suppliers_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Suppliers",
                        principalColumn: "SupplierId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EntertainerSchedule",
                columns: table => new
                {
                    EntertainersEntertainerId = table.Column<int>(type: "int", nullable: false),
                    SchedulesScheduleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EntertainerSchedule", x => new { x.EntertainersEntertainerId, x.SchedulesScheduleId });
                    table.ForeignKey(
                        name: "FK_EntertainerSchedule_Entertainers_EntertainersEntertainerId",
                        column: x => x.EntertainersEntertainerId,
                        principalTable: "Entertainers",
                        principalColumn: "EntertainerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EntertainerSchedule_Schedules_SchedulesScheduleId",
                        column: x => x.SchedulesScheduleId,
                        principalTable: "Schedules",
                        principalColumn: "ScheduleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DrinkOrder",
                columns: table => new
                {
                    DrinksDrinkId = table.Column<int>(type: "int", nullable: false),
                    OrdersOrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrinkOrder", x => new { x.DrinksDrinkId, x.OrdersOrderId });
                    table.ForeignKey(
                        name: "FK_DrinkOrder_Drinks_DrinksDrinkId",
                        column: x => x.DrinksDrinkId,
                        principalTable: "Drinks",
                        principalColumn: "DrinkId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DrinkOrder_Orders_OrdersOrderId",
                        column: x => x.OrdersOrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MenuItemOrder",
                columns: table => new
                {
                    MenuItemsMenuItemId = table.Column<int>(type: "int", nullable: false),
                    OrdersOrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MenuItemOrder", x => new { x.MenuItemsMenuItemId, x.OrdersOrderId });
                    table.ForeignKey(
                        name: "FK_MenuItemOrder_MenuItems_MenuItemsMenuItemId",
                        column: x => x.MenuItemsMenuItemId,
                        principalTable: "MenuItems",
                        principalColumn: "MenuItemId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MenuItemOrder_Orders_OrdersOrderId",
                        column: x => x.OrdersOrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StockTakeItems",
                columns: table => new
                {
                    StockTakeItemId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Inventory_ItemId = table.Column<int>(type: "int", nullable: false),
                    StockTake_Id = table.Column<int>(type: "int", nullable: false),
                    StockTake_Id1 = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StockTakeItems", x => x.StockTakeItemId);
                    table.ForeignKey(
                        name: "FK_StockTakeItems_Inventory_Items_Inventory_ItemId",
                        column: x => x.Inventory_ItemId,
                        principalTable: "Inventory_Items",
                        principalColumn: "Inventory_ItemId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StockTakeItems_StockTakes_StockTake_Id1",
                        column: x => x.StockTake_Id1,
                        principalTable: "StockTakes",
                        principalColumn: "StockTake_Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order_Drinks",
                columns: table => new
                {
                    OtherDrinkId = table.Column<int>(type: "int", nullable: false),
                    KitchenOrderId = table.Column<int>(type: "int", nullable: false),
                    OrderDrinkId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    OtherDrinkId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order_Drinks", x => new { x.KitchenOrderId, x.OtherDrinkId });
                    table.ForeignKey(
                        name: "FK_Order_Drinks_KitchenOrders_KitchenOrderId",
                        column: x => x.KitchenOrderId,
                        principalTable: "KitchenOrders",
                        principalColumn: "KitchenOrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_Drinks_OtherDrinks_OtherDrinkId",
                        column: x => x.OtherDrinkId,
                        principalTable: "OtherDrinks",
                        principalColumn: "OtherDrinkId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_Drinks_OtherDrinks_OtherDrinkId1",
                        column: x => x.OtherDrinkId1,
                        principalTable: "OtherDrinks",
                        principalColumn: "OtherDrinkId");
                });

            migrationBuilder.CreateTable(
                name: "Order_MenuItems",
                columns: table => new
                {
                    MenuItemId = table.Column<int>(type: "int", nullable: false),
                    KitchenOrderId = table.Column<int>(type: "int", nullable: false),
                    OrderMenuItemId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order_MenuItems", x => new { x.KitchenOrderId, x.MenuItemId });
                    table.ForeignKey(
                        name: "FK_Order_MenuItems_KitchenOrders_KitchenOrderId",
                        column: x => x.KitchenOrderId,
                        principalTable: "KitchenOrders",
                        principalColumn: "KitchenOrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_MenuItems_MenuItems_MenuItemId",
                        column: x => x.MenuItemId,
                        principalTable: "MenuItems",
                        principalColumn: "MenuItemId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WriteOffs",
                columns: table => new
                {
                    WriteOffId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StockTakeItemId = table.Column<int>(type: "int", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WriteOffs", x => x.WriteOffId);
                    table.ForeignKey(
                        name: "FK_WriteOffs_StockTakeItems_StockTakeItemId",
                        column: x => x.StockTakeItemId,
                        principalTable: "StockTakeItems",
                        principalColumn: "StockTakeItemId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DiscrepencyItems",
                columns: table => new
                {
                    DiscrepId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuantityDifference = table.Column<int>(type: "int", nullable: false),
                    Inventory_ItemId = table.Column<int>(type: "int", nullable: false),
                    ItemName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WriteOffStockWriteOffId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiscrepencyItems", x => x.DiscrepId);
                    table.ForeignKey(
                        name: "FK_DiscrepencyItems_WriteOffs_WriteOffStockWriteOffId",
                        column: x => x.WriteOffStockWriteOffId,
                        principalTable: "WriteOffs",
                        principalColumn: "WriteOffId");
                });

            migrationBuilder.InsertData(
                table: "Discounts",
                columns: new[] { "DiscountId", "AdministratorId", "Amount", "Description", "End_Date", "Name", "Start_Date" },
                values: new object[] { 1, null, 0.05m, "10% Discount", new DateTime(2023, 9, 12, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(7650), "Month end discount", new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(7648) });

            migrationBuilder.InsertData(
                table: "Drink_Prices",
                columns: new[] { "Drink_PriceId", "Amount", "DrinkId" },
                values: new object[,]
                {
                    { 1, 55m, 1 },
                    { 2, 75m, 2 },
                    { 3, 99m, 3 },
                    { 4, 45m, 4 },
                    { 5, 65m, 5 },
                    { 6, 100m, 6 }
                });

            migrationBuilder.InsertData(
                table: "Drink_Types",
                columns: new[] { "Drink_TypeId", "Name" },
                values: new object[,]
                {
                    { 1, "Alcohol" },
                    { 2, "Non-Alcohol" }
                });

            migrationBuilder.InsertData(
                table: "Employee_Roles",
                columns: new[] { "Employee_RoleId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "The waiter serves the customers and takes orders", "Waiter" },
                    { 2, "The chef prepares the meals and notifies the waiter of ready orders.", "Chef" },
                    { 3, "The kitchen staff assists the chef prepare meals.", "Kitchen Staff" }
                });

            migrationBuilder.InsertData(
                table: "Entertainment_Type",
                columns: new[] { "Entertainment_TypeId", "Description", "EntertainerId", "Name" },
                values: new object[,]
                {
                    { 1, "Poetry recitations", null, "Poetry" },
                    { 2, "One-liners for a comedic performance", null, "StandUp Comedy" },
                    { 3, "Present dance as an art form, ballet, amapiano styles, hipHop dancers", null, "Dance" },
                    { 4, "Artits who perform own music. All types of music", null, "Music" }
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "EventId", "AdministratorId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, null, "An event filled with spectacular music performances and art display ", "Smooth Sunday" },
                    { 2, null, "An event where various forms of entertainments take place", "Wacky Wednesday" },
                    { 3, null, " poets are invited to recite poems and another kind of artistry ", "Poetry Musings" }
                });

            migrationBuilder.InsertData(
                table: "Food_Types",
                columns: new[] { "FoodTypeId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "Meals consisting of chicken", "Chicken" },
                    { 2, "Meals consisting of beef", "Beef" },
                    { 3, "Meals suitable for vegetarians", "Vegetarian" },
                    { 4, "Meals suitable for Vegans", "Vegan" }
                });

            migrationBuilder.InsertData(
                table: "Genders",
                columns: new[] { "GenderId", "GenderId1", "Name" },
                values: new object[,]
                {
                    { 1, null, "Male" },
                    { 2, null, "Female" },
                    { 3, null, "Other" }
                });

            migrationBuilder.InsertData(
                table: "Helps",
                columns: new[] { "HelpId", "AdministratorId", "Description", "Help_CategoryId", "Name" },
                values: new object[,]
                {
                    { 1, null, "MMINO Restaurant serves various types of cuisines", null, "What food does MMINO Restaurant serve?" },
                    { 2, null, "MMINO Restaurant is located in Hatfield,Pretoria. 1005 Arcadia Street", null, "Where is MMINO Restaurant?" },
                    { 3, null, "You can book for a live entertainment on the website.", null, "How how do you book for a live entertainment slot?" }
                });

            migrationBuilder.InsertData(
                table: "Inventory_Types",
                columns: new[] { "Inventory_TypeId", "Description", "Name" },
                values: new object[,]
                {
                    { 1, "For all food inventory items", "Food" },
                    { 2, "For all Non-Alcoholic Drink inventory items", "Non-Alcoholic Drinks" },
                    { 3, "For all Alcoholic Drink inventory items", "Alcoholic Drinks" }
                });

            migrationBuilder.InsertData(
                table: "MenuItem_Categories",
                columns: new[] { "Menu_CategoryId", "Description", "MenuItem_CategoryMenu_CategoryId", "Name" },
                values: new object[,]
                {
                    { 1, "Meals between 7am to 12pm", null, "Breakfast" },
                    { 2, "Appetisers", null, "Starter" },
                    { 3, "Big and Filling meals", null, "Main" },
                    { 4, "Special things for those with a sweet tooth", null, "Dessert" },
                    { 5, "For those hungry but not hungry", null, "Light Meals" }
                });

            migrationBuilder.InsertData(
                table: "Menu_Types",
                columns: new[] { "Menu_TypeId", "Name" },
                values: new object[,]
                {
                    { 1, "Breakfast" },
                    { 2, "All Day" }
                });

            migrationBuilder.InsertData(
                table: "OrderTypes",
                columns: new[] { "OrderType_ID", "Name" },
                values: new object[,]
                {
                    { 1, "Sit-In" },
                    { 2, "Takeaway" }
                });

            migrationBuilder.InsertData(
                table: "Supplier_Types",
                columns: new[] { "Supplier_TypeId", "Description", "Name" },
                values: new object[] { 1, "For Alcohol Suppliers", "Alcohol" });

            migrationBuilder.InsertData(
                table: "Supplier_Types",
                columns: new[] { "Supplier_TypeId", "Description", "Name" },
                values: new object[,]
                {
                    { 2, "Suppliers who sell meat and poultry", "Meat and Poultry" },
                    { 3, "Stores that sell all types", "General" },
                    { 4, "Stores that supplier baking ingrediants", "Bakery" }
                });

            migrationBuilder.InsertData(
                table: "Table_Numbers",
                columns: new[] { "Table_NumberId", "TableID" },
                values: new object[,]
                {
                    { 1, "Table 1" },
                    { 2, "Table 2" },
                    { 3, "Table 3" },
                    { 4, "Table 4" },
                    { 5, "Table 5" },
                    { 6, "Table 6" }
                });

            migrationBuilder.InsertData(
                table: "Vats",
                columns: new[] { "VatId", "Amount" },
                values: new object[,]
                {
                    { 1, 0.10m },
                    { 2, 0.15m }
                });

            migrationBuilder.InsertData(
                table: "Drinks",
                columns: new[] { "DrinkId", "Drink_TypeId", "Drink_TypeId1", "Name" },
                values: new object[,]
                {
                    { 1, 1, null, "Margarita" },
                    { 2, 1, null, "Strawberry Daiquri" },
                    { 3, 1, null, "Blood Mary" },
                    { 4, 2, null, "Virgin Mojito" },
                    { 5, 2, null, "Cappuccino" },
                    { 6, 2, null, "Frozen lemonade" }
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "EmployeeId", "Email_Address", "Employee_RoleId", "Employment_Date", "FirstName", "GenderId", "PhoneNumber", "Physical_Address", "Surname" },
                values: new object[,]
                {
                    { 1, "VanessaJames@gmail.com", 1, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(5949), "Vanessa", 2, "0847541236", "404 Jacob Street", "James" },
                    { 2, "SerenaWilliams@gmail.com", 2, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(5981), "Serena", 2, "0842341236", "132 Harriet Street", "Williams" },
                    { 3, "EdrisElba@gmail.com", 1, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(5996), "Edris", 1, "0212378798", "245 homelyn Street", "Elba" },
                    { 4, "NyongoLupita@gmail.com", 2, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(6008), "Lupita", 2, "0455783475", "254 Summer Street", "Nyongo" },
                    { 5, "MicheaJackson@gmail.com", 2, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(6019), "Micheal", 3, "0874567836", "567 Winter Street", "Jackson" },
                    { 6, "TaehyungKim@gmial.com", 1, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(6034), "Taehyung", 1, "0874562134", "345 Shallow  Street", "Kim" },
                    { 7, "ZendayaColeman@gmail.com", 1, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(6046), "Zendaya", 2, "0212378798", "243 Super Street ", "Coleman" },
                    { 8, "RogerFederal@gmail.com", 1, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(6058), "Roger", 3, "0612346487", "987 Wall Street", "Federal" },
                    { 9, "JenniferLOpez@gmail.com", 2, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(6069), "Jennifer", 3, "0874834576", "967 Ballard Street", "Lopez" },
                    { 10, "ChadwickBoseman@gmail.com", 2, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(6082), "Chadwick", 1, "0923456789", "483 Alien Street", "Boseman" }
                });

            migrationBuilder.InsertData(
                table: "Inventory_Items",
                columns: new[] { "Inventory_ItemId", "AdministratorId", "Description", "Inventory_TypeId", "ItemName", "Quantity" },
                values: new object[,]
                {
                    { 1, null, "Freshly produced", 1, "Lettuce", 2 },
                    { 2, null, "Used for all chicken dishes", 1, "Chicken", 6 },
                    { 3, null, "Needs to be cooked well", 1, "Mogodu", 5 },
                    { 4, null, "Served in all drinks with the gin recipie", 3, "Gin", 15 },
                    { 5, null, "To Quench your Thirst", 2, "Coke", 24 },
                    { 6, null, "For those who like no taste", 2, "Sarkling Water", 30 },
                    { 7, null, "Many different types served", 3, "Beer", 12 },
                    { 8, null, "One of the starches served with each dish", 1, "Rice", 4 },
                    { 9, null, "One of the starches served with each dish", 1, "Maize Meal", 3 },
                    { 10, null, "For those who do not like fizz", 2, "Apple Juice", 24 }
                });

            migrationBuilder.InsertData(
                table: "MenuItems",
                columns: new[] { "MenuItemId", "Description", "FoodTypeId", "Food_TypeFoodTypeId1", "Menu_CategoryId", "Menu_TypeId", "Menu_TypeId1", "Name" },
                values: new object[,]
                {
                    { 1, "Two larger chicken burger, 6 pcs nuggets, two large fries", 1, null, 3, 2, null, "Chicken Feast" },
                    { 2, "Pap, boerewors an Tbone steak", 2, null, 3, 2, null, "The Braai feast" },
                    { 3, "Mozarella stuffe cheese balls", 3, null, 2, 2, null, "Chilli cheese poppers" },
                    { 4, "A green salad with salsa mix", 4, null, 5, 2, null, "Mexican salad" },
                    { 5, "Delicious cheesecake with blueberry sauce topping", 3, null, 4, 2, null, "Blueberry cheescake slice" },
                    { 6, "Delicious everyday english breakfast with eggs and bacon", 1, null, 1, 1, null, "English Breakfast" },
                    { 7, "Smoothy bowl with blueberries, almond milk and honey", 4, null, 1, 1, null, "Blueberry smoothy bowl" },
                    { 8, "A toasted panini sandwich with beef sausages, tomatos and cheese", 2, null, 1, 1, null, "Toatsed beef panini sandwich" }
                });

            migrationBuilder.InsertData(
                table: "OtherDrinks",
                columns: new[] { "OtherDrinkId", "Description", "Drink_TypeId", "Name" },
                values: new object[,]
                {
                    { 1, "Vodka, pineapple juice and lemon syrup", 1, "Margarita" },
                    { 2, "Crushed ice lemonade juice ", 2, "Frozen Lemonade" },
                    { 3, "Crushed ice, strawberry lemonade, vodka, strawberry syrup", 1, "Strawberry Diaquri " }
                });

            migrationBuilder.InsertData(
                table: "Schedules",
                columns: new[] { "ScheduleId", "AdministratorId", "Date", "Description", "End_Time", "EventId", "Schedule_StatusId", "Start_Time", "Title" },
                values: new object[,]
                {
                    { 1, null, new DateTime(2023, 6, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Musician can book performance", "14:30 PM", 1, null, "14;00 PM", "Music slot" },
                    { 2, null, new DateTime(2023, 8, 2, 0, 0, 0, 0, DateTimeKind.Unspecified), "Contemporary Dance performance", "21:30 PM", 2, null, "21;00 PM", "Dance slot " },
                    { 3, null, new DateTime(2023, 7, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), "Poet recital", "19:15 PM", 3, null, "19;00 PM", "Poetry" }
                });

            migrationBuilder.InsertData(
                table: "Suppliers",
                columns: new[] { "SupplierId", "AdministratorId", "Email_Address", "PhoneNumber", "Physical_Address", "SupplierName", "Supplier_TypeId" },
                values: new object[,]
                {
                    { 1, null, "checkers@gmail.com", "0122345654", "416 Kirkness St, Arcadia", "Checkers", 3 },
                    { 2, null, "pnp@gmail.com", "0110456543", "Hatfield Plaza 1122 Burnett Street", "Pick `n Pay", 3 }
                });

            migrationBuilder.InsertData(
                table: "Suppliers",
                columns: new[] { "SupplierId", "AdministratorId", "Email_Address", "PhoneNumber", "Physical_Address", "SupplierName", "Supplier_TypeId" },
                values: new object[] { 3, null, "liquorRack@gmail.com", "0656781230", "Hatfield Plaza 1145 Burnett Street", "Liquor Rack", 1 });

            migrationBuilder.InsertData(
                table: "Suppliers",
                columns: new[] { "SupplierId", "AdministratorId", "Email_Address", "PhoneNumber", "Physical_Address", "SupplierName", "Supplier_TypeId" },
                values: new object[] { 4, null, "bakerMan@gmail.com", "0714567890", "HillCrest Boulevard 110 Lynnwood", "BakerMan", 4 });

            migrationBuilder.InsertData(
                table: "Suppliers",
                columns: new[] { "SupplierId", "AdministratorId", "Email_Address", "PhoneNumber", "Physical_Address", "SupplierName", "Supplier_TypeId" },
                values: new object[] { 5, null, "MJButcher@gmail.com", "0865045674", "143 Atterbury Street", "Mr Jacks Butcher", 2 });

            migrationBuilder.InsertData(
                table: "Inventory_Prices",
                columns: new[] { "InventoryPrice_Id", "Date", "Inventory_ItemId", "Price" },
                values: new object[,]
                {
                    { 1, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(7703), 1, 25m },
                    { 2, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(7716), 2, 250m },
                    { 3, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(7727), 3, 200m },
                    { 4, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(7738), 4, 38m },
                    { 5, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(7750), 5, 45m },
                    { 6, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(7762), 6, 75m },
                    { 7, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(7773), 7, 100m },
                    { 8, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(7784), 8, 40m },
                    { 9, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(7795), 9, 28m },
                    { 10, new DateTime(2023, 9, 2, 12, 19, 15, 296, DateTimeKind.Local).AddTicks(7807), 10, 35m }
                });

            migrationBuilder.InsertData(
                table: "MenuItem_Prices",
                columns: new[] { "MenuItem_PriceId", "Amount", "MenuItemId" },
                values: new object[,]
                {
                    { 1, 50.50m, 5 },
                    { 2, 105.35m, 1 },
                    { 3, 35.10m, 4 },
                    { 5, 200.50m, 2 },
                    { 6, 45.50m, 3 },
                    { 10, 92.00m, 6 },
                    { 11, 52.00m, 7 },
                    { 12, 35.00m, 8 }
                });

            migrationBuilder.InsertData(
                table: "OtherDrinkPrices",
                columns: new[] { "OtherDrinkPriceId", "Amount", "OtherDrinkId" },
                values: new object[,]
                {
                    { 1, 69m, 1 },
                    { 2, 60m, 2 },
                    { 3, 75m, 3 }
                });

            migrationBuilder.InsertData(
                table: "Supplier_Inventorys",
                columns: new[] { "SupplierItemId", "Inventory_ItemId", "Ordered_Quantity", "SupplierId" },
                values: new object[] { 1, 1, 33, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_Access_UserRoles_User_RolesUser_RoleId",
                table: "Access_UserRoles",
                column: "User_RolesUser_RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_bookings_Booking_StatusId",
                table: "bookings",
                column: "Booking_StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_bookings_EntertainerId",
                table: "bookings",
                column: "EntertainerId");

            migrationBuilder.CreateIndex(
                name: "IX_bookings_Entertainment_TypeId",
                table: "bookings",
                column: "Entertainment_TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Discounts_AdministratorId",
                table: "Discounts",
                column: "AdministratorId");

            migrationBuilder.CreateIndex(
                name: "IX_DiscrepencyItems_WriteOffStockWriteOffId",
                table: "DiscrepencyItems",
                column: "WriteOffStockWriteOffId");

            migrationBuilder.CreateIndex(
                name: "IX_DrinkOrder_OrdersOrderId",
                table: "DrinkOrder",
                column: "OrdersOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Drinks_Drink_TypeId",
                table: "Drinks",
                column: "Drink_TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Drinks_Drink_TypeId1",
                table: "Drinks",
                column: "Drink_TypeId1");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_Employee_RoleId",
                table: "Employees",
                column: "Employee_RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_GenderId",
                table: "Employees",
                column: "GenderId");

            migrationBuilder.CreateIndex(
                name: "IX_EntertainerSchedule_SchedulesScheduleId",
                table: "EntertainerSchedule",
                column: "SchedulesScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_Entertainment_Type_EntertainerId",
                table: "Entertainment_Type",
                column: "EntertainerId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_AdministratorId",
                table: "Events",
                column: "AdministratorId");

            migrationBuilder.CreateIndex(
                name: "IX_Genders_GenderId1",
                table: "Genders",
                column: "GenderId1");

            migrationBuilder.CreateIndex(
                name: "IX_Helps_AdministratorId",
                table: "Helps",
                column: "AdministratorId");

            migrationBuilder.CreateIndex(
                name: "IX_Helps_Help_CategoryId",
                table: "Helps",
                column: "Help_CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_Items_AdministratorId",
                table: "Inventory_Items",
                column: "AdministratorId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_Items_Inventory_TypeId",
                table: "Inventory_Items",
                column: "Inventory_TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_Prices_Inventory_ItemId",
                table: "Inventory_Prices",
                column: "Inventory_ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_KitchenOrders_MenuItemId",
                table: "KitchenOrders",
                column: "MenuItemId");

            migrationBuilder.CreateIndex(
                name: "IX_KitchenOrders_OtherDrinkId",
                table: "KitchenOrders",
                column: "OtherDrinkId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItem_Categories_MenuItem_CategoryMenu_CategoryId",
                table: "MenuItem_Categories",
                column: "MenuItem_CategoryMenu_CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItem_Prices_MenuItemId",
                table: "MenuItem_Prices",
                column: "MenuItemId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItemOrder_OrdersOrderId",
                table: "MenuItemOrder",
                column: "OrdersOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_Food_TypeFoodTypeId1",
                table: "MenuItems",
                column: "Food_TypeFoodTypeId1");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_FoodTypeId",
                table: "MenuItems",
                column: "FoodTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_Menu_CategoryId",
                table: "MenuItems",
                column: "Menu_CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_Menu_TypeId",
                table: "MenuItems",
                column: "Menu_TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_Menu_TypeId1",
                table: "MenuItems",
                column: "Menu_TypeId1");

            migrationBuilder.CreateIndex(
                name: "IX_Order_Drinks_OtherDrinkId",
                table: "Order_Drinks",
                column: "OtherDrinkId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_Drinks_OtherDrinkId1",
                table: "Order_Drinks",
                column: "OtherDrinkId1");

            migrationBuilder.CreateIndex(
                name: "IX_Order_MenuItems_MenuItemId",
                table: "Order_MenuItems",
                column: "MenuItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_EmployeeId",
                table: "Orders",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Order_StatusId",
                table: "Orders",
                column: "Order_StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Payment_MethodId",
                table: "Orders",
                column: "Payment_MethodId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_Table_NumberId",
                table: "Orders",
                column: "Table_NumberId");

            migrationBuilder.CreateIndex(
                name: "IX_OtherDrinkPrices_OtherDrinkId",
                table: "OtherDrinkPrices",
                column: "OtherDrinkId");

            migrationBuilder.CreateIndex(
                name: "IX_OtherDrinks_Drink_TypeId",
                table: "OtherDrinks",
                column: "Drink_TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_Payment_MethodId",
                table: "Payments",
                column: "Payment_MethodId");

            migrationBuilder.CreateIndex(
                name: "IX_Pending_Bookings_Entertainment_TypeId",
                table: "Pending_Bookings",
                column: "Entertainment_TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Pending_Bookings_EventId",
                table: "Pending_Bookings",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_AdministratorId",
                table: "Schedules",
                column: "AdministratorId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_EventId",
                table: "Schedules",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_Schedule_StatusId",
                table: "Schedules",
                column: "Schedule_StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_StockTakeItems_Inventory_ItemId",
                table: "StockTakeItems",
                column: "Inventory_ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_StockTakeItems_StockTake_Id1",
                table: "StockTakeItems",
                column: "StockTake_Id1");

            migrationBuilder.CreateIndex(
                name: "IX_StockTakes_Inventory_ItemId",
                table: "StockTakes",
                column: "Inventory_ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Supplier_InventoryItems_SuppliersSupplierId",
                table: "Supplier_InventoryItems",
                column: "SuppliersSupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_Supplier_Inventorys_Inventory_ItemId",
                table: "Supplier_Inventorys",
                column: "Inventory_ItemId");

            migrationBuilder.CreateIndex(
                name: "IX_Supplier_Inventorys_SupplierId",
                table: "Supplier_Inventorys",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_AdministratorId",
                table: "Suppliers",
                column: "AdministratorId");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_Supplier_TypeId",
                table: "Suppliers",
                column: "Supplier_TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Entertainment_TypeId",
                table: "Users",
                column: "Entertainment_TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_TitleId",
                table: "Users",
                column: "TitleId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_User_RoleId",
                table: "Users",
                column: "User_RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_WriteOffs_StockTakeItemId",
                table: "WriteOffs",
                column: "StockTakeItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Access_UserRoles");

            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "bookings");

            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.DropTable(
                name: "DiscrepencyItems");

            migrationBuilder.DropTable(
                name: "Drink_Prices");

            migrationBuilder.DropTable(
                name: "DrinkOrder");

            migrationBuilder.DropTable(
                name: "Entertainer_Entertainments");

            migrationBuilder.DropTable(
                name: "Entertainer_Schedules");

            migrationBuilder.DropTable(
                name: "EntertainerSchedule");

            migrationBuilder.DropTable(
                name: "Helps");

            migrationBuilder.DropTable(
                name: "Inventory_Prices");

            migrationBuilder.DropTable(
                name: "IonicAppUsers");

            migrationBuilder.DropTable(
                name: "MenuItem_Prices");

            migrationBuilder.DropTable(
                name: "MenuItemOrder");

            migrationBuilder.DropTable(
                name: "Order_Drinks");

            migrationBuilder.DropTable(
                name: "Order_MenuItems");

            migrationBuilder.DropTable(
                name: "OrderTypes");

            migrationBuilder.DropTable(
                name: "OtherDrinkPrices");

            migrationBuilder.DropTable(
                name: "Passwords");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Pending_Bookings");

            migrationBuilder.DropTable(
                name: "Supplier_InventoryItems");

            migrationBuilder.DropTable(
                name: "Supplier_Inventorys");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Vats");

            migrationBuilder.DropTable(
                name: "Accesses");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Booking_Statuses");

            migrationBuilder.DropTable(
                name: "WriteOffs");

            migrationBuilder.DropTable(
                name: "Drinks");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropTable(
                name: "Help_Categories");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "KitchenOrders");

            migrationBuilder.DropTable(
                name: "Suppliers");

            migrationBuilder.DropTable(
                name: "Entertainment_Type");

            migrationBuilder.DropTable(
                name: "Titles");

            migrationBuilder.DropTable(
                name: "User_Roles");

            migrationBuilder.DropTable(
                name: "StockTakeItems");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Schedule_Statuses");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Order_Statuses");

            migrationBuilder.DropTable(
                name: "Payment_Methods");

            migrationBuilder.DropTable(
                name: "Table_Numbers");

            migrationBuilder.DropTable(
                name: "MenuItems");

            migrationBuilder.DropTable(
                name: "OtherDrinks");

            migrationBuilder.DropTable(
                name: "Supplier_Types");

            migrationBuilder.DropTable(
                name: "Entertainers");

            migrationBuilder.DropTable(
                name: "StockTakes");

            migrationBuilder.DropTable(
                name: "Employee_Roles");

            migrationBuilder.DropTable(
                name: "Genders");

            migrationBuilder.DropTable(
                name: "Food_Types");

            migrationBuilder.DropTable(
                name: "Menu_Types");

            migrationBuilder.DropTable(
                name: "MenuItem_Categories");

            migrationBuilder.DropTable(
                name: "Drink_Types");

            migrationBuilder.DropTable(
                name: "Inventory_Items");

            migrationBuilder.DropTable(
                name: "Administrators");

            migrationBuilder.DropTable(
                name: "Inventory_Types");
        }
    }
}
