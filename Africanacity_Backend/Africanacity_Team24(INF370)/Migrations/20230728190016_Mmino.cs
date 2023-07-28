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
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employee_Roles", x => x.Employee_RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Entertainment_Type",
                columns: table => new
                {
                    Entertainment_TypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entertainment_Type", x => x.Entertainment_TypeId);
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
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventory_Types", x => x.Inventory_TypeId);
                });

            migrationBuilder.CreateTable(
                name: "KitchenOrders",
                columns: table => new
                {
                    KitchenOrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TableNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    KitchenOrderNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderedItems = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderedDrinks = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Subtotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KitchenOrders", x => x.KitchenOrderId);
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
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
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
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vats", x => x.VatId);
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
                    Drink_TypeId = table.Column<int>(type: "int", nullable: false)
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
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    TitleId = table.Column<int>(type: "int", nullable: true),
                    User_RoleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
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
                name: "Administrators",
                columns: table => new
                {
                    AdministratorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Surname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email_Address = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Physical_Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrators", x => x.AdministratorId);
                    table.ForeignKey(
                        name: "FK_Administrators_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
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
                    Employee_RoleId = table.Column<int>(type: "int", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeId);
                    table.ForeignKey(
                        name: "FK_Employees_Employee_Roles_Employee_RoleId",
                        column: x => x.Employee_RoleId,
                        principalTable: "Employee_Roles",
                        principalColumn: "Employee_RoleId");
                    table.ForeignKey(
                        name: "FK_Employees_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
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
                    PhoneNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entertainers", x => x.EntertainerId);
                    table.ForeignKey(
                        name: "FK_Entertainers_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
                });

            migrationBuilder.CreateTable(
                name: "Passwords",
                columns: table => new
                {
                    PasswordId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HashPassword = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    Dataset = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Passwords", x => x.PasswordId);
                    table.ForeignKey(
                        name: "FK_Passwords_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId");
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
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    AdministratorId = table.Column<int>(type: "int", nullable: true)
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
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    AdministratorId = table.Column<int>(type: "int", nullable: true),
                    Inventory_TypeId = table.Column<int>(type: "int", nullable: true)
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
                        principalColumn: "Inventory_TypeId");
                });

            migrationBuilder.CreateTable(
                name: "Schedules",
                columns: table => new
                {
                    ScheduleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Start_Time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    End_Time = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                        name: "FK_Schedules_Schedule_Statuses_Schedule_StatusId",
                        column: x => x.Schedule_StatusId,
                        principalTable: "Schedule_Statuses",
                        principalColumn: "Schedule_StatusId");
                });

            migrationBuilder.CreateTable(
                name: "Suppliers",
                columns: table => new
                {
                    SupplierId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Surname = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email_Address = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Physical_Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    State = table.Column<string>(type: "nvarchar(2)", maxLength: 2, nullable: true),
                    PostalCode = table.Column<string>(type: "nvarchar(5)", maxLength: 5, nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    AdministratorId = table.Column<int>(type: "int", nullable: true),
                    Supplier_TypeId = table.Column<int>(type: "int", nullable: true)
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
                        principalColumn: "Supplier_TypeId");
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
                name: "Bookings",
                columns: table => new
                {
                    BookingId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Booking_StatusId = table.Column<int>(type: "int", nullable: true),
                    EntertainerId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bookings", x => x.BookingId);
                    table.ForeignKey(
                        name: "FK_Bookings_Booking_Statuses_Booking_StatusId",
                        column: x => x.Booking_StatusId,
                        principalTable: "Booking_Statuses",
                        principalColumn: "Booking_StatusId");
                    table.ForeignKey(
                        name: "FK_Bookings_Entertainers_EntertainerId",
                        column: x => x.EntertainerId,
                        principalTable: "Entertainers",
                        principalColumn: "EntertainerId");
                });

            migrationBuilder.CreateTable(
                name: "Entertainer_Entertainments",
                columns: table => new
                {
                    EntertainersEntertainerId = table.Column<int>(type: "int", nullable: false),
                    Entertainment_TypesEntertainment_TypeId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entertainer_Entertainments", x => new { x.EntertainersEntertainerId, x.Entertainment_TypesEntertainment_TypeId });
                    table.ForeignKey(
                        name: "FK_Entertainer_Entertainments_Entertainers_EntertainersEntertainerId",
                        column: x => x.EntertainersEntertainerId,
                        principalTable: "Entertainers",
                        principalColumn: "EntertainerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Entertainer_Entertainments_Entertainment_Type_Entertainment_TypesEntertainment_TypeId",
                        column: x => x.Entertainment_TypesEntertainment_TypeId,
                        principalTable: "Entertainment_Type",
                        principalColumn: "Entertainment_TypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Entertainer_Schedules",
                columns: table => new
                {
                    EntertainersEntertainerId = table.Column<int>(type: "int", nullable: false),
                    SchedulesScheduleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Entertainer_Schedules", x => new { x.EntertainersEntertainerId, x.SchedulesScheduleId });
                    table.ForeignKey(
                        name: "FK_Entertainer_Schedules_Entertainers_EntertainersEntertainerId",
                        column: x => x.EntertainersEntertainerId,
                        principalTable: "Entertainers",
                        principalColumn: "EntertainerId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Entertainer_Schedules_Schedules_SchedulesScheduleId",
                        column: x => x.SchedulesScheduleId,
                        principalTable: "Schedules",
                        principalColumn: "ScheduleId",
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
                name: "Order_Drinks",
                columns: table => new
                {
                    DrinksDrinkId = table.Column<int>(type: "int", nullable: false),
                    OrdersOrderId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order_Drinks", x => new { x.DrinksDrinkId, x.OrdersOrderId });
                    table.ForeignKey(
                        name: "FK_Order_Drinks_Drinks_DrinksDrinkId",
                        column: x => x.DrinksDrinkId,
                        principalTable: "Drinks",
                        principalColumn: "DrinkId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_Drinks_Orders_OrdersOrderId",
                        column: x => x.OrdersOrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order_MenuItems",
                columns: table => new
                {
                    MenuItemsMenuItemId = table.Column<int>(type: "int", nullable: false),
                    OrdersOrderId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order_MenuItems", x => new { x.MenuItemsMenuItemId, x.OrdersOrderId });
                    table.ForeignKey(
                        name: "FK_Order_MenuItems_MenuItems_MenuItemsMenuItemId",
                        column: x => x.MenuItemsMenuItemId,
                        principalTable: "MenuItems",
                        principalColumn: "MenuItemId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Order_MenuItems_Orders_OrdersOrderId",
                        column: x => x.OrdersOrderId,
                        principalTable: "Orders",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Discounts",
                columns: new[] { "DiscountId", "AdministratorId", "Amount", "Description", "End_Date", "Name", "Start_Date" },
                values: new object[] { 1, null, 0.10m, "10% Discount", new DateTime(2023, 8, 7, 21, 0, 14, 860, DateTimeKind.Local).AddTicks(8730), "Month end discount", new DateTime(2023, 7, 28, 21, 0, 14, 860, DateTimeKind.Local).AddTicks(8714) });

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
                    { 2, "The chef prepares the meals and notifies the waiter of ready orders.", "Chef" }
                });

            migrationBuilder.InsertData(
                table: "Employees",
                columns: new[] { "EmployeeId", "Email_Address", "Employee_RoleId", "FirstName", "PhoneNumber", "Physical_Address", "Surname", "UserId" },
                values: new object[,]
                {
                    { 1, "VanessaJames@gmail.com", null, "Vanessa", "0847541236", "404 Jacob Street", "James", null },
                    { 2, "SerenaWilliams@gmail.com", null, "Serena", "0842341236", "132 Harriet Street", "Williams", null },
                    { 3, "EdrisElba@gmail.com", null, "Edris", "0212378798", "245 homelyn Street", "Elba", null },
                    { 4, "NyongoLupita@gmail.com", null, "Lupita", "0455783475", "254 Summer Street", "Nyongo", null },
                    { 5, "MicheaJackson@gmail.com", null, "Micheal", "0874567836", "567 Winter Street", "Jackson", null },
                    { 6, "TaehyungKim@gmial.com", null, "Taehyung", "0874562134", "345 Shallow  Street", "Kim", null },
                    { 7, "ZendayaColeman@gmail.com", null, "Zendaya", "0212378798", "243 Super Street ", "Coleman", null },
                    { 8, "RogerFederal@gmail.com", null, "Roger", "0612346487", "987 Wall Street", "Federal", null },
                    { 9, "JenniferLOpez@gmail.com", null, "Jennifer", "0874834576", "967 Ballard Street", "Lopez", null },
                    { 10, "ChadwickBoseman@gmail.com", null, "Chadwick", "0923456789", "483 Alien Street", "Boseman", null }
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
                table: "Helps",
                columns: new[] { "HelpId", "AdministratorId", "Description", "Help_CategoryId", "Name" },
                values: new object[,]
                {
                    { 1, null, "MMINO Restaurant serves various types of cuisines", null, "What food does MMINO Restaurant serve?" },
                    { 2, null, "MMINO Restaurant is located in Hatfield,Pretoria. 1005 Arcadia Street", null, "Where is MMINO Restaurant?" },
                    { 3, null, "You can book for a live entertainment on the website.", null, "How how do you book for a live entertainment slot?" }
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
                table: "MenuItem_Prices",
                columns: new[] { "MenuItem_PriceId", "Amount", "MenuItemId" },
                values: new object[,]
                {
                    { 1, 50.50m, 5 },
                    { 2, 105.35m, 1 },
                    { 3, 35.10m, 4 },
                    { 5, 200.50m, 2 },
                    { 6, 45.50m, 3 }
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
                columns: new[] { "VatId", "Amount", "Description" },
                values: new object[,]
                {
                    { 1, 0.10m, "10% VAT on total" },
                    { 2, 0.15m, "15% VAT on total" }
                });

            migrationBuilder.InsertData(
                table: "Drinks",
                columns: new[] { "DrinkId", "Drink_TypeId", "Name" },
                values: new object[,]
                {
                    { 1, 1, "Margarita" },
                    { 2, 1, "Strawberry Daiquri" },
                    { 3, 1, "Blood Mary" },
                    { 4, 2, "Virgin Mojito" },
                    { 5, 2, "Cappuccino" },
                    { 6, 2, "Frozen lemonade" }
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

            migrationBuilder.CreateIndex(
                name: "IX_Access_UserRoles_User_RolesUser_RoleId",
                table: "Access_UserRoles",
                column: "User_RolesUser_RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Administrators_UserId",
                table: "Administrators",
                column: "UserId");

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
                name: "IX_Bookings_Booking_StatusId",
                table: "Bookings",
                column: "Booking_StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Bookings_EntertainerId",
                table: "Bookings",
                column: "EntertainerId");

            migrationBuilder.CreateIndex(
                name: "IX_Discounts_AdministratorId",
                table: "Discounts",
                column: "AdministratorId");

            migrationBuilder.CreateIndex(
                name: "IX_Drinks_Drink_TypeId",
                table: "Drinks",
                column: "Drink_TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_Employee_RoleId",
                table: "Employees",
                column: "Employee_RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_UserId",
                table: "Employees",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Entertainer_Entertainments_Entertainment_TypesEntertainment_TypeId",
                table: "Entertainer_Entertainments",
                column: "Entertainment_TypesEntertainment_TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Entertainer_Schedules_SchedulesScheduleId",
                table: "Entertainer_Schedules",
                column: "SchedulesScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_Entertainers_UserId",
                table: "Entertainers",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Events_AdministratorId",
                table: "Events",
                column: "AdministratorId");

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
                name: "IX_MenuItem_Categories_MenuItem_CategoryMenu_CategoryId",
                table: "MenuItem_Categories",
                column: "MenuItem_CategoryMenu_CategoryId");

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
                name: "IX_Order_Drinks_OrdersOrderId",
                table: "Order_Drinks",
                column: "OrdersOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_MenuItems_OrdersOrderId",
                table: "Order_MenuItems",
                column: "OrdersOrderId");

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
                name: "IX_Passwords_UserId",
                table: "Passwords",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_Payment_MethodId",
                table: "Payments",
                column: "Payment_MethodId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_AdministratorId",
                table: "Schedules",
                column: "AdministratorId");

            migrationBuilder.CreateIndex(
                name: "IX_Schedules_Schedule_StatusId",
                table: "Schedules",
                column: "Schedule_StatusId");

            migrationBuilder.CreateIndex(
                name: "IX_Supplier_InventoryItems_SuppliersSupplierId",
                table: "Supplier_InventoryItems",
                column: "SuppliersSupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_AdministratorId",
                table: "Suppliers",
                column: "AdministratorId");

            migrationBuilder.CreateIndex(
                name: "IX_Suppliers_Supplier_TypeId",
                table: "Suppliers",
                column: "Supplier_TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_TitleId",
                table: "Users",
                column: "TitleId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_User_RoleId",
                table: "Users",
                column: "User_RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Access_UserRoles");

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
                name: "Bookings");

            migrationBuilder.DropTable(
                name: "Discounts");

            migrationBuilder.DropTable(
                name: "Drink_Prices");

            migrationBuilder.DropTable(
                name: "Entertainer_Entertainments");

            migrationBuilder.DropTable(
                name: "Entertainer_Schedules");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Helps");

            migrationBuilder.DropTable(
                name: "KitchenOrders");

            migrationBuilder.DropTable(
                name: "MenuItem_Prices");

            migrationBuilder.DropTable(
                name: "Order_Drinks");

            migrationBuilder.DropTable(
                name: "Order_MenuItems");

            migrationBuilder.DropTable(
                name: "OrderTypes");

            migrationBuilder.DropTable(
                name: "Passwords");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Supplier_InventoryItems");

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
                name: "Entertainment_Type");

            migrationBuilder.DropTable(
                name: "Entertainers");

            migrationBuilder.DropTable(
                name: "Schedules");

            migrationBuilder.DropTable(
                name: "Help_Categories");

            migrationBuilder.DropTable(
                name: "Drinks");

            migrationBuilder.DropTable(
                name: "MenuItems");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Inventory_Items");

            migrationBuilder.DropTable(
                name: "Suppliers");

            migrationBuilder.DropTable(
                name: "Schedule_Statuses");

            migrationBuilder.DropTable(
                name: "Drink_Types");

            migrationBuilder.DropTable(
                name: "Food_Types");

            migrationBuilder.DropTable(
                name: "Menu_Types");

            migrationBuilder.DropTable(
                name: "MenuItem_Categories");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Order_Statuses");

            migrationBuilder.DropTable(
                name: "Payment_Methods");

            migrationBuilder.DropTable(
                name: "Table_Numbers");

            migrationBuilder.DropTable(
                name: "Inventory_Types");

            migrationBuilder.DropTable(
                name: "Administrators");

            migrationBuilder.DropTable(
                name: "Supplier_Types");

            migrationBuilder.DropTable(
                name: "Employee_Roles");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Titles");

            migrationBuilder.DropTable(
                name: "User_Roles");
        }
    }
}
