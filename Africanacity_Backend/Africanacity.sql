USE [master]
GO
/****** Object:  Database [Africanacity]    Script Date: 2023/05/16 05:16:44 ******/
CREATE DATABASE [Africanacity]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Africanacity', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Africanacity.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Africanacity_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\Africanacity_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Africanacity] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Africanacity].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Africanacity] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Africanacity] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Africanacity] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Africanacity] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Africanacity] SET ARITHABORT OFF 
GO
ALTER DATABASE [Africanacity] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Africanacity] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Africanacity] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Africanacity] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Africanacity] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Africanacity] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Africanacity] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Africanacity] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Africanacity] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Africanacity] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Africanacity] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Africanacity] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Africanacity] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Africanacity] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Africanacity] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Africanacity] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [Africanacity] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Africanacity] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Africanacity] SET  MULTI_USER 
GO
ALTER DATABASE [Africanacity] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Africanacity] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Africanacity] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Africanacity] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Africanacity] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Africanacity] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [Africanacity] SET QUERY_STORE = OFF
GO
USE [Africanacity]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Access_UserRoles]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Access_UserRoles](
	[AccessesAccessId] [int] NOT NULL,
	[User_RolesUser_RoleId] [int] NOT NULL,
 CONSTRAINT [PK_Access_UserRoles] PRIMARY KEY CLUSTERED 
(
	[AccessesAccessId] ASC,
	[User_RolesUser_RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Accesses]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Accesses](
	[AccessId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Accesses] PRIMARY KEY CLUSTERED 
(
	[AccessId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Administrators]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Administrators](
	[AdministratorId] [int] IDENTITY(1,1) NOT NULL,
	[Surname] [nvarchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[Email_Address] [nvarchar](50) NULL,
	[Physical_Address] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](10) NOT NULL,
	[UserId] [int] NULL,
 CONSTRAINT [PK_Administrators] PRIMARY KEY CLUSTERED 
(
	[AdministratorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](450) NOT NULL,
	[ProviderKey] [nvarchar](450) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](450) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Booking_Statuses]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Booking_Statuses](
	[Booking_StatusId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Booking_Statuses] PRIMARY KEY CLUSTERED 
(
	[Booking_StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Bookings]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Bookings](
	[BookingId] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[Booking_StatusId] [int] NULL,
	[EntertainerId] [int] NULL,
 CONSTRAINT [PK_Bookings] PRIMARY KEY CLUSTERED 
(
	[BookingId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Discounts]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Discounts](
	[DiscountId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[Amount] [decimal](18, 2) NOT NULL,
	[Start_Date] [datetime2](7) NOT NULL,
	[End_Date] [datetime2](7) NOT NULL,
	[AdministratorId] [int] NULL,
 CONSTRAINT [PK_Discounts] PRIMARY KEY CLUSTERED 
(
	[DiscountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Drink_Prices]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Drink_Prices](
	[Drink_PriceId] [int] IDENTITY(1,1) NOT NULL,
	[Amount] [int] NOT NULL,
	[DrinkId] [int] NULL,
 CONSTRAINT [PK_Drink_Prices] PRIMARY KEY CLUSTERED 
(
	[Drink_PriceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Drink_Types]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Drink_Types](
	[Drink_TypeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Drink_Types] PRIMARY KEY CLUSTERED 
(
	[Drink_TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Drinks]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Drinks](
	[DrinkId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Drink_TypeId] [int] NULL,
 CONSTRAINT [PK_Drinks] PRIMARY KEY CLUSTERED 
(
	[DrinkId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee_Roles]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee_Roles](
	[Employee_RoleId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Employee_Roles] PRIMARY KEY CLUSTERED 
(
	[Employee_RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[EmployeeId] [int] IDENTITY(1,1) NOT NULL,
	[Surname] [nvarchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[Email_Address] [nvarchar](50) NULL,
	[Physical_Address] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](10) NOT NULL,
	[Employee_RoleId] [int] NULL,
	[UserId] [int] NULL,
 CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED 
(
	[EmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Entertainer_Entertainments]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Entertainer_Entertainments](
	[EntertainersEntertainerId] [int] NOT NULL,
	[Entertainment_TypesEntertainment_TypeId] [int] NOT NULL,
 CONSTRAINT [PK_Entertainer_Entertainments] PRIMARY KEY CLUSTERED 
(
	[EntertainersEntertainerId] ASC,
	[Entertainment_TypesEntertainment_TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Entertainer_Schedules]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Entertainer_Schedules](
	[EntertainersEntertainerId] [int] NOT NULL,
	[SchedulesScheduleId] [int] NOT NULL,
 CONSTRAINT [PK_Entertainer_Schedules] PRIMARY KEY CLUSTERED 
(
	[EntertainersEntertainerId] ASC,
	[SchedulesScheduleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Entertainers]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Entertainers](
	[EntertainerId] [int] IDENTITY(1,1) NOT NULL,
	[Surname] [nvarchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[Email_Address] [nvarchar](50) NULL,
	[Physical_Address] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](10) NOT NULL,
	[UserId] [int] NULL,
 CONSTRAINT [PK_Entertainers] PRIMARY KEY CLUSTERED 
(
	[EntertainerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Entertainment_Type]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Entertainment_Type](
	[Entertainment_TypeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Entertainment_Type] PRIMARY KEY CLUSTERED 
(
	[Entertainment_TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Events]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Events](
	[EventId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[AdministratorId] [int] NULL,
 CONSTRAINT [PK_Events] PRIMARY KEY CLUSTERED 
(
	[EventId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Food_Types]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Food_Types](
	[FoodTypeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Food_Types] PRIMARY KEY CLUSTERED 
(
	[FoodTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Help_Categories]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Help_Categories](
	[Help_CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Help_Categories] PRIMARY KEY CLUSTERED 
(
	[Help_CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Helps]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Helps](
	[HelpId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[AdministratorId] [int] NULL,
	[Help_CategoryId] [int] NULL,
 CONSTRAINT [PK_Helps] PRIMARY KEY CLUSTERED 
(
	[HelpId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inventory_Items]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inventory_Items](
	[Inventory_ItemId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[AdministratorId] [int] NULL,
	[Inventory_TypeId] [int] NULL,
 CONSTRAINT [PK_Inventory_Items] PRIMARY KEY CLUSTERED 
(
	[Inventory_ItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Inventory_Types]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Inventory_Types](
	[Inventory_TypeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Inventory_Types] PRIMARY KEY CLUSTERED 
(
	[Inventory_TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Menu_Types]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Menu_Types](
	[Menu_TypeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Menu_Types] PRIMARY KEY CLUSTERED 
(
	[Menu_TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MenuItem_Categories]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MenuItem_Categories](
	[Menu_CategoryId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_MenuItem_Categories] PRIMARY KEY CLUSTERED 
(
	[Menu_CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MenuItem_Prices]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MenuItem_Prices](
	[MenuItem_PriceId] [int] IDENTITY(1,1) NOT NULL,
	[Amount] [decimal](18, 2) NOT NULL,
	[MenuItemId] [int] NULL,
 CONSTRAINT [PK_MenuItem_Prices] PRIMARY KEY CLUSTERED 
(
	[MenuItem_PriceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MenuItems]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MenuItems](
	[MenuItemId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[Food_TypeFoodTypeId] [int] NULL,
	[MenuItem_CategoryMenu_CategoryId] [int] NULL,
	[Menu_TypeId] [int] NULL,
 CONSTRAINT [PK_MenuItems] PRIMARY KEY CLUSTERED 
(
	[MenuItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order_Drinks]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_Drinks](
	[DrinksDrinkId] [int] NOT NULL,
	[OrdersOrderId] [int] NOT NULL,
	[Quantity] [int] NOT NULL,
 CONSTRAINT [PK_Order_Drinks] PRIMARY KEY CLUSTERED 
(
	[DrinksDrinkId] ASC,
	[OrdersOrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order_MenuItems]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_MenuItems](
	[MenuItemsMenuItemId] [int] NOT NULL,
	[OrdersOrderId] [int] NOT NULL,
 CONSTRAINT [PK_Order_MenuItems] PRIMARY KEY CLUSTERED 
(
	[MenuItemsMenuItemId] ASC,
	[OrdersOrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order_Statuses]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_Statuses](
	[Order_StatusId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Order_Statuses] PRIMARY KEY CLUSTERED 
(
	[Order_StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Orders]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[OrderId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[EmployeeId] [int] NULL,
	[Order_StatusId] [int] NULL,
	[Payment_MethodId] [int] NULL,
	[Table_NumberId] [int] NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[OrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Passwords]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Passwords](
	[PasswordId] [int] IDENTITY(1,1) NOT NULL,
	[HashPassword] [nvarchar](10) NOT NULL,
	[Dataset] [nvarchar](10) NOT NULL,
	[UserId] [int] NULL,
 CONSTRAINT [PK_Passwords] PRIMARY KEY CLUSTERED 
(
	[PasswordId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payment_Methods]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payment_Methods](
	[Payment_MethodId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Payment_Methods] PRIMARY KEY CLUSTERED 
(
	[Payment_MethodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Payments](
	[PaymentId] [int] IDENTITY(1,1) NOT NULL,
	[Amount] [decimal](18, 2) NOT NULL,
	[Payment_MethodId] [int] NULL,
 CONSTRAINT [PK_Payments] PRIMARY KEY CLUSTERED 
(
	[PaymentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedule_Statuses]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedule_Statuses](
	[Schedule_StatusId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Schedule_Statuses] PRIMARY KEY CLUSTERED 
(
	[Schedule_StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Schedules]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Schedules](
	[ScheduleId] [int] IDENTITY(1,1) NOT NULL,
	[Date] [datetime2](7) NOT NULL,
	[Start_Time] [datetime2](7) NOT NULL,
	[End_Time] [datetime2](7) NOT NULL,
	[AdministratorId] [int] NULL,
	[Schedule_StatusId] [int] NULL,
 CONSTRAINT [PK_Schedules] PRIMARY KEY CLUSTERED 
(
	[ScheduleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Supplier_InventoryItems]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Supplier_InventoryItems](
	[Inventory_ItemsInventory_ItemId] [int] NOT NULL,
	[SuppliersSupplierId] [int] NOT NULL,
 CONSTRAINT [PK_Supplier_InventoryItems] PRIMARY KEY CLUSTERED 
(
	[Inventory_ItemsInventory_ItemId] ASC,
	[SuppliersSupplierId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Supplier_Types]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Supplier_Types](
	[Supplier_TypeId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_Supplier_Types] PRIMARY KEY CLUSTERED 
(
	[Supplier_TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Suppliers]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Suppliers](
	[SupplierId] [int] IDENTITY(1,1) NOT NULL,
	[Surname] [nvarchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[Email_Address] [nvarchar](50) NULL,
	[Physical_Address] [nvarchar](max) NULL,
	[City] [nvarchar](max) NULL,
	[State] [nvarchar](2) NULL,
	[PostalCode] [nvarchar](5) NULL,
	[PhoneNumber] [nvarchar](10) NOT NULL,
	[AdministratorId] [int] NULL,
	[Supplier_TypeId] [int] NULL,
 CONSTRAINT [PK_Suppliers] PRIMARY KEY CLUSTERED 
(
	[SupplierId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Table_Numbers]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Table_Numbers](
	[Table_NumberId] [int] IDENTITY(1,1) NOT NULL,
	[Number] [int] NOT NULL,
 CONSTRAINT [PK_Table_Numbers] PRIMARY KEY CLUSTERED 
(
	[Table_NumberId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Titles]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Titles](
	[TitleId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Titles] PRIMARY KEY CLUSTERED 
(
	[TitleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User_Roles]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User_Roles](
	[User_RoleId] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
 CONSTRAINT [PK_User_Roles] PRIMARY KEY CLUSTERED 
(
	[User_RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [nvarchar](15) NOT NULL,
	[TitleId] [int] NULL,
	[User_RoleId] [int] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vats]    Script Date: 2023/05/16 05:16:45 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vats](
	[VatId] [int] IDENTITY(1,1) NOT NULL,
	[Description] [nvarchar](100) NOT NULL,
	[Amount] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_Vats] PRIMARY KEY CLUSTERED 
(
	[VatId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_Access_UserRoles_User_RolesUser_RoleId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Access_UserRoles_User_RolesUser_RoleId] ON [dbo].[Access_UserRoles]
(
	[User_RolesUser_RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Administrators_UserId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Administrators_UserId] ON [dbo].[Administrators]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 2023/05/16 05:16:45 ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 2023/05/16 05:16:45 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Bookings_Booking_StatusId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Bookings_Booking_StatusId] ON [dbo].[Bookings]
(
	[Booking_StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Bookings_EntertainerId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Bookings_EntertainerId] ON [dbo].[Bookings]
(
	[EntertainerId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Discounts_AdministratorId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Discounts_AdministratorId] ON [dbo].[Discounts]
(
	[AdministratorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Drink_Prices_DrinkId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Drink_Prices_DrinkId] ON [dbo].[Drink_Prices]
(
	[DrinkId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Drinks_Drink_TypeId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Drinks_Drink_TypeId] ON [dbo].[Drinks]
(
	[Drink_TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Employees_Employee_RoleId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Employees_Employee_RoleId] ON [dbo].[Employees]
(
	[Employee_RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Employees_UserId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Employees_UserId] ON [dbo].[Employees]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Entertainer_Entertainments_Entertainment_TypesEntertainment_TypeId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Entertainer_Entertainments_Entertainment_TypesEntertainment_TypeId] ON [dbo].[Entertainer_Entertainments]
(
	[Entertainment_TypesEntertainment_TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Entertainer_Schedules_SchedulesScheduleId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Entertainer_Schedules_SchedulesScheduleId] ON [dbo].[Entertainer_Schedules]
(
	[SchedulesScheduleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Entertainers_UserId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Entertainers_UserId] ON [dbo].[Entertainers]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Events_AdministratorId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Events_AdministratorId] ON [dbo].[Events]
(
	[AdministratorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Helps_AdministratorId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Helps_AdministratorId] ON [dbo].[Helps]
(
	[AdministratorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Helps_Help_CategoryId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Helps_Help_CategoryId] ON [dbo].[Helps]
(
	[Help_CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Inventory_Items_AdministratorId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Inventory_Items_AdministratorId] ON [dbo].[Inventory_Items]
(
	[AdministratorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Inventory_Items_Inventory_TypeId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Inventory_Items_Inventory_TypeId] ON [dbo].[Inventory_Items]
(
	[Inventory_TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_MenuItem_Prices_MenuItemId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_MenuItem_Prices_MenuItemId] ON [dbo].[MenuItem_Prices]
(
	[MenuItemId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_MenuItems_Food_TypeFoodTypeId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_MenuItems_Food_TypeFoodTypeId] ON [dbo].[MenuItems]
(
	[Food_TypeFoodTypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_MenuItems_Menu_TypeId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_MenuItems_Menu_TypeId] ON [dbo].[MenuItems]
(
	[Menu_TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_MenuItems_MenuItem_CategoryMenu_CategoryId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_MenuItems_MenuItem_CategoryMenu_CategoryId] ON [dbo].[MenuItems]
(
	[MenuItem_CategoryMenu_CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Order_Drinks_OrdersOrderId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Order_Drinks_OrdersOrderId] ON [dbo].[Order_Drinks]
(
	[OrdersOrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Order_MenuItems_OrdersOrderId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Order_MenuItems_OrdersOrderId] ON [dbo].[Order_MenuItems]
(
	[OrdersOrderId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Orders_EmployeeId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Orders_EmployeeId] ON [dbo].[Orders]
(
	[EmployeeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Orders_Order_StatusId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Orders_Order_StatusId] ON [dbo].[Orders]
(
	[Order_StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Orders_Payment_MethodId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Orders_Payment_MethodId] ON [dbo].[Orders]
(
	[Payment_MethodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Orders_Table_NumberId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Orders_Table_NumberId] ON [dbo].[Orders]
(
	[Table_NumberId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Passwords_UserId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Passwords_UserId] ON [dbo].[Passwords]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Payments_Payment_MethodId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Payments_Payment_MethodId] ON [dbo].[Payments]
(
	[Payment_MethodId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Schedules_AdministratorId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Schedules_AdministratorId] ON [dbo].[Schedules]
(
	[AdministratorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Schedules_Schedule_StatusId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Schedules_Schedule_StatusId] ON [dbo].[Schedules]
(
	[Schedule_StatusId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Supplier_InventoryItems_SuppliersSupplierId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Supplier_InventoryItems_SuppliersSupplierId] ON [dbo].[Supplier_InventoryItems]
(
	[SuppliersSupplierId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Suppliers_AdministratorId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Suppliers_AdministratorId] ON [dbo].[Suppliers]
(
	[AdministratorId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Suppliers_Supplier_TypeId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Suppliers_Supplier_TypeId] ON [dbo].[Suppliers]
(
	[Supplier_TypeId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Users_TitleId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Users_TitleId] ON [dbo].[Users]
(
	[TitleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Users_User_RoleId]    Script Date: 2023/05/16 05:16:45 ******/
CREATE NONCLUSTERED INDEX [IX_Users_User_RoleId] ON [dbo].[Users]
(
	[User_RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Access_UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_Access_UserRoles_Accesses_AccessesAccessId] FOREIGN KEY([AccessesAccessId])
REFERENCES [dbo].[Accesses] ([AccessId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Access_UserRoles] CHECK CONSTRAINT [FK_Access_UserRoles_Accesses_AccessesAccessId]
GO
ALTER TABLE [dbo].[Access_UserRoles]  WITH CHECK ADD  CONSTRAINT [FK_Access_UserRoles_User_Roles_User_RolesUser_RoleId] FOREIGN KEY([User_RolesUser_RoleId])
REFERENCES [dbo].[User_Roles] ([User_RoleId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Access_UserRoles] CHECK CONSTRAINT [FK_Access_UserRoles_User_Roles_User_RolesUser_RoleId]
GO
ALTER TABLE [dbo].[Administrators]  WITH CHECK ADD  CONSTRAINT [FK_Administrators_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Administrators] CHECK CONSTRAINT [FK_Administrators_Users_UserId]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD  CONSTRAINT [FK_Bookings_Booking_Statuses_Booking_StatusId] FOREIGN KEY([Booking_StatusId])
REFERENCES [dbo].[Booking_Statuses] ([Booking_StatusId])
GO
ALTER TABLE [dbo].[Bookings] CHECK CONSTRAINT [FK_Bookings_Booking_Statuses_Booking_StatusId]
GO
ALTER TABLE [dbo].[Bookings]  WITH CHECK ADD  CONSTRAINT [FK_Bookings_Entertainers_EntertainerId] FOREIGN KEY([EntertainerId])
REFERENCES [dbo].[Entertainers] ([EntertainerId])
GO
ALTER TABLE [dbo].[Bookings] CHECK CONSTRAINT [FK_Bookings_Entertainers_EntertainerId]
GO
ALTER TABLE [dbo].[Discounts]  WITH CHECK ADD  CONSTRAINT [FK_Discounts_Administrators_AdministratorId] FOREIGN KEY([AdministratorId])
REFERENCES [dbo].[Administrators] ([AdministratorId])
GO
ALTER TABLE [dbo].[Discounts] CHECK CONSTRAINT [FK_Discounts_Administrators_AdministratorId]
GO
ALTER TABLE [dbo].[Drink_Prices]  WITH CHECK ADD  CONSTRAINT [FK_Drink_Prices_Drinks_DrinkId] FOREIGN KEY([DrinkId])
REFERENCES [dbo].[Drinks] ([DrinkId])
GO
ALTER TABLE [dbo].[Drink_Prices] CHECK CONSTRAINT [FK_Drink_Prices_Drinks_DrinkId]
GO
ALTER TABLE [dbo].[Drinks]  WITH CHECK ADD  CONSTRAINT [FK_Drinks_Drink_Types_Drink_TypeId] FOREIGN KEY([Drink_TypeId])
REFERENCES [dbo].[Drink_Types] ([Drink_TypeId])
GO
ALTER TABLE [dbo].[Drinks] CHECK CONSTRAINT [FK_Drinks_Drink_Types_Drink_TypeId]
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD  CONSTRAINT [FK_Employees_Employee_Roles_Employee_RoleId] FOREIGN KEY([Employee_RoleId])
REFERENCES [dbo].[Employee_Roles] ([Employee_RoleId])
GO
ALTER TABLE [dbo].[Employees] CHECK CONSTRAINT [FK_Employees_Employee_Roles_Employee_RoleId]
GO
ALTER TABLE [dbo].[Employees]  WITH CHECK ADD  CONSTRAINT [FK_Employees_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Employees] CHECK CONSTRAINT [FK_Employees_Users_UserId]
GO
ALTER TABLE [dbo].[Entertainer_Entertainments]  WITH CHECK ADD  CONSTRAINT [FK_Entertainer_Entertainments_Entertainers_EntertainersEntertainerId] FOREIGN KEY([EntertainersEntertainerId])
REFERENCES [dbo].[Entertainers] ([EntertainerId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Entertainer_Entertainments] CHECK CONSTRAINT [FK_Entertainer_Entertainments_Entertainers_EntertainersEntertainerId]
GO
ALTER TABLE [dbo].[Entertainer_Entertainments]  WITH CHECK ADD  CONSTRAINT [FK_Entertainer_Entertainments_Entertainment_Type_Entertainment_TypesEntertainment_TypeId] FOREIGN KEY([Entertainment_TypesEntertainment_TypeId])
REFERENCES [dbo].[Entertainment_Type] ([Entertainment_TypeId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Entertainer_Entertainments] CHECK CONSTRAINT [FK_Entertainer_Entertainments_Entertainment_Type_Entertainment_TypesEntertainment_TypeId]
GO
ALTER TABLE [dbo].[Entertainer_Schedules]  WITH CHECK ADD  CONSTRAINT [FK_Entertainer_Schedules_Entertainers_EntertainersEntertainerId] FOREIGN KEY([EntertainersEntertainerId])
REFERENCES [dbo].[Entertainers] ([EntertainerId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Entertainer_Schedules] CHECK CONSTRAINT [FK_Entertainer_Schedules_Entertainers_EntertainersEntertainerId]
GO
ALTER TABLE [dbo].[Entertainer_Schedules]  WITH CHECK ADD  CONSTRAINT [FK_Entertainer_Schedules_Schedules_SchedulesScheduleId] FOREIGN KEY([SchedulesScheduleId])
REFERENCES [dbo].[Schedules] ([ScheduleId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Entertainer_Schedules] CHECK CONSTRAINT [FK_Entertainer_Schedules_Schedules_SchedulesScheduleId]
GO
ALTER TABLE [dbo].[Entertainers]  WITH CHECK ADD  CONSTRAINT [FK_Entertainers_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Entertainers] CHECK CONSTRAINT [FK_Entertainers_Users_UserId]
GO
ALTER TABLE [dbo].[Events]  WITH CHECK ADD  CONSTRAINT [FK_Events_Administrators_AdministratorId] FOREIGN KEY([AdministratorId])
REFERENCES [dbo].[Administrators] ([AdministratorId])
GO
ALTER TABLE [dbo].[Events] CHECK CONSTRAINT [FK_Events_Administrators_AdministratorId]
GO
ALTER TABLE [dbo].[Helps]  WITH CHECK ADD  CONSTRAINT [FK_Helps_Administrators_AdministratorId] FOREIGN KEY([AdministratorId])
REFERENCES [dbo].[Administrators] ([AdministratorId])
GO
ALTER TABLE [dbo].[Helps] CHECK CONSTRAINT [FK_Helps_Administrators_AdministratorId]
GO
ALTER TABLE [dbo].[Helps]  WITH CHECK ADD  CONSTRAINT [FK_Helps_Help_Categories_Help_CategoryId] FOREIGN KEY([Help_CategoryId])
REFERENCES [dbo].[Help_Categories] ([Help_CategoryId])
GO
ALTER TABLE [dbo].[Helps] CHECK CONSTRAINT [FK_Helps_Help_Categories_Help_CategoryId]
GO
ALTER TABLE [dbo].[Inventory_Items]  WITH CHECK ADD  CONSTRAINT [FK_Inventory_Items_Administrators_AdministratorId] FOREIGN KEY([AdministratorId])
REFERENCES [dbo].[Administrators] ([AdministratorId])
GO
ALTER TABLE [dbo].[Inventory_Items] CHECK CONSTRAINT [FK_Inventory_Items_Administrators_AdministratorId]
GO
ALTER TABLE [dbo].[Inventory_Items]  WITH CHECK ADD  CONSTRAINT [FK_Inventory_Items_Inventory_Types_Inventory_TypeId] FOREIGN KEY([Inventory_TypeId])
REFERENCES [dbo].[Inventory_Types] ([Inventory_TypeId])
GO
ALTER TABLE [dbo].[Inventory_Items] CHECK CONSTRAINT [FK_Inventory_Items_Inventory_Types_Inventory_TypeId]
GO
ALTER TABLE [dbo].[MenuItem_Prices]  WITH CHECK ADD  CONSTRAINT [FK_MenuItem_Prices_MenuItems_MenuItemId] FOREIGN KEY([MenuItemId])
REFERENCES [dbo].[MenuItems] ([MenuItemId])
GO
ALTER TABLE [dbo].[MenuItem_Prices] CHECK CONSTRAINT [FK_MenuItem_Prices_MenuItems_MenuItemId]
GO
ALTER TABLE [dbo].[MenuItems]  WITH CHECK ADD  CONSTRAINT [FK_MenuItems_Food_Types_Food_TypeFoodTypeId] FOREIGN KEY([Food_TypeFoodTypeId])
REFERENCES [dbo].[Food_Types] ([FoodTypeId])
GO
ALTER TABLE [dbo].[MenuItems] CHECK CONSTRAINT [FK_MenuItems_Food_Types_Food_TypeFoodTypeId]
GO
ALTER TABLE [dbo].[MenuItems]  WITH CHECK ADD  CONSTRAINT [FK_MenuItems_Menu_Types_Menu_TypeId] FOREIGN KEY([Menu_TypeId])
REFERENCES [dbo].[Menu_Types] ([Menu_TypeId])
GO
ALTER TABLE [dbo].[MenuItems] CHECK CONSTRAINT [FK_MenuItems_Menu_Types_Menu_TypeId]
GO
ALTER TABLE [dbo].[MenuItems]  WITH CHECK ADD  CONSTRAINT [FK_MenuItems_MenuItem_Categories_MenuItem_CategoryMenu_CategoryId] FOREIGN KEY([MenuItem_CategoryMenu_CategoryId])
REFERENCES [dbo].[MenuItem_Categories] ([Menu_CategoryId])
GO
ALTER TABLE [dbo].[MenuItems] CHECK CONSTRAINT [FK_MenuItems_MenuItem_Categories_MenuItem_CategoryMenu_CategoryId]
GO
ALTER TABLE [dbo].[Order_Drinks]  WITH CHECK ADD  CONSTRAINT [FK_Order_Drinks_Drinks_DrinksDrinkId] FOREIGN KEY([DrinksDrinkId])
REFERENCES [dbo].[Drinks] ([DrinkId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order_Drinks] CHECK CONSTRAINT [FK_Order_Drinks_Drinks_DrinksDrinkId]
GO
ALTER TABLE [dbo].[Order_Drinks]  WITH CHECK ADD  CONSTRAINT [FK_Order_Drinks_Orders_OrdersOrderId] FOREIGN KEY([OrdersOrderId])
REFERENCES [dbo].[Orders] ([OrderId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order_Drinks] CHECK CONSTRAINT [FK_Order_Drinks_Orders_OrdersOrderId]
GO
ALTER TABLE [dbo].[Order_MenuItems]  WITH CHECK ADD  CONSTRAINT [FK_Order_MenuItems_MenuItems_MenuItemsMenuItemId] FOREIGN KEY([MenuItemsMenuItemId])
REFERENCES [dbo].[MenuItems] ([MenuItemId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order_MenuItems] CHECK CONSTRAINT [FK_Order_MenuItems_MenuItems_MenuItemsMenuItemId]
GO
ALTER TABLE [dbo].[Order_MenuItems]  WITH CHECK ADD  CONSTRAINT [FK_Order_MenuItems_Orders_OrdersOrderId] FOREIGN KEY([OrdersOrderId])
REFERENCES [dbo].[Orders] ([OrderId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Order_MenuItems] CHECK CONSTRAINT [FK_Order_MenuItems_Orders_OrdersOrderId]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Employees_EmployeeId] FOREIGN KEY([EmployeeId])
REFERENCES [dbo].[Employees] ([EmployeeId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Employees_EmployeeId]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Order_Statuses_Order_StatusId] FOREIGN KEY([Order_StatusId])
REFERENCES [dbo].[Order_Statuses] ([Order_StatusId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Order_Statuses_Order_StatusId]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Payment_Methods_Payment_MethodId] FOREIGN KEY([Payment_MethodId])
REFERENCES [dbo].[Payment_Methods] ([Payment_MethodId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Payment_Methods_Payment_MethodId]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Table_Numbers_Table_NumberId] FOREIGN KEY([Table_NumberId])
REFERENCES [dbo].[Table_Numbers] ([Table_NumberId])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Table_Numbers_Table_NumberId]
GO
ALTER TABLE [dbo].[Passwords]  WITH CHECK ADD  CONSTRAINT [FK_Passwords_Users_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([UserId])
GO
ALTER TABLE [dbo].[Passwords] CHECK CONSTRAINT [FK_Passwords_Users_UserId]
GO
ALTER TABLE [dbo].[Payments]  WITH CHECK ADD  CONSTRAINT [FK_Payments_Payment_Methods_Payment_MethodId] FOREIGN KEY([Payment_MethodId])
REFERENCES [dbo].[Payment_Methods] ([Payment_MethodId])
GO
ALTER TABLE [dbo].[Payments] CHECK CONSTRAINT [FK_Payments_Payment_Methods_Payment_MethodId]
GO
ALTER TABLE [dbo].[Schedules]  WITH CHECK ADD  CONSTRAINT [FK_Schedules_Administrators_AdministratorId] FOREIGN KEY([AdministratorId])
REFERENCES [dbo].[Administrators] ([AdministratorId])
GO
ALTER TABLE [dbo].[Schedules] CHECK CONSTRAINT [FK_Schedules_Administrators_AdministratorId]
GO
ALTER TABLE [dbo].[Schedules]  WITH CHECK ADD  CONSTRAINT [FK_Schedules_Schedule_Statuses_Schedule_StatusId] FOREIGN KEY([Schedule_StatusId])
REFERENCES [dbo].[Schedule_Statuses] ([Schedule_StatusId])
GO
ALTER TABLE [dbo].[Schedules] CHECK CONSTRAINT [FK_Schedules_Schedule_Statuses_Schedule_StatusId]
GO
ALTER TABLE [dbo].[Supplier_InventoryItems]  WITH CHECK ADD  CONSTRAINT [FK_Supplier_InventoryItems_Inventory_Items_Inventory_ItemsInventory_ItemId] FOREIGN KEY([Inventory_ItemsInventory_ItemId])
REFERENCES [dbo].[Inventory_Items] ([Inventory_ItemId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Supplier_InventoryItems] CHECK CONSTRAINT [FK_Supplier_InventoryItems_Inventory_Items_Inventory_ItemsInventory_ItemId]
GO
ALTER TABLE [dbo].[Supplier_InventoryItems]  WITH CHECK ADD  CONSTRAINT [FK_Supplier_InventoryItems_Suppliers_SuppliersSupplierId] FOREIGN KEY([SuppliersSupplierId])
REFERENCES [dbo].[Suppliers] ([SupplierId])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Supplier_InventoryItems] CHECK CONSTRAINT [FK_Supplier_InventoryItems_Suppliers_SuppliersSupplierId]
GO
ALTER TABLE [dbo].[Suppliers]  WITH CHECK ADD  CONSTRAINT [FK_Suppliers_Administrators_AdministratorId] FOREIGN KEY([AdministratorId])
REFERENCES [dbo].[Administrators] ([AdministratorId])
GO
ALTER TABLE [dbo].[Suppliers] CHECK CONSTRAINT [FK_Suppliers_Administrators_AdministratorId]
GO
ALTER TABLE [dbo].[Suppliers]  WITH CHECK ADD  CONSTRAINT [FK_Suppliers_Supplier_Types_Supplier_TypeId] FOREIGN KEY([Supplier_TypeId])
REFERENCES [dbo].[Supplier_Types] ([Supplier_TypeId])
GO
ALTER TABLE [dbo].[Suppliers] CHECK CONSTRAINT [FK_Suppliers_Supplier_Types_Supplier_TypeId]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_Titles_TitleId] FOREIGN KEY([TitleId])
REFERENCES [dbo].[Titles] ([TitleId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_Titles_TitleId]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_User_Roles_User_RoleId] FOREIGN KEY([User_RoleId])
REFERENCES [dbo].[User_Roles] ([User_RoleId])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_User_Roles_User_RoleId]
GO
USE [master]
GO
ALTER DATABASE [Africanacity] SET  READ_WRITE 
GO
