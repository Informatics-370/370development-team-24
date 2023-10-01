using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.Factory;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Africanacity_Team24_INF370_.models.Login;
using Africanacity_Team24_INF370_.models.Administration.Admin;
using System;
using Africanacity_Team24_INF370_;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Africanacity_Team24_INF370_.EmailService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Server.IIS.Core;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors(options => options.AddDefaultPolicy(
				include =>
				{
					include.AllowAnyHeader();
					include.AllowAnyMethod();
					include.AllowAnyOrigin();

				}));
builder.Services.AddControllers();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSwaggerGen(c =>
{
	c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		In = ParameterLocation.Header,
		Description = "Add Bearer Token",
		Name = "Authorization",
		Type = SecuritySchemeType.Http,
		BearerFormat = "JWT",
		Scheme = "bearer"
	});
	c.AddSecurityRequirement(new OpenApiSecurityRequirement
					{
						{
							new OpenApiSecurityScheme
							{
								Reference=new OpenApiReference
								{
									Type=ReferenceType.SecurityScheme,
									Id = "Bearer"
								}
							},
							new string[]{ }
						}
					});
});

builder.Services.AddIdentity<AppUser, IdentityRole>(options =>
{
	options.Password.RequireUppercase = false;
	options.Password.RequireLowercase = false;
	options.Password.RequireNonAlphanumeric = false;
	options.Password.RequireDigit = true;
	options.Password.RequiredLength = 8;
	options.User.RequireUniqueEmail = true;
})
.AddEntityFrameworkStores<AppDbContext>()
.AddDefaultTokenProviders();




//builder.Services.AddAuthentication()
//				.AddCookie()
//				.AddJwtBearer(options =>
//				{
//					options.TokenValidationParameters = new TokenValidationParameters()
//					{
//						ValidIssuer = builder.Configuration["Tokens:Issuer"],
//						ValidAudience = builder.Configuration["Tokens:Audience"],
//						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Tokens:Key"]))
//					};
//				});

builder.Services.AddAuthentication(x =>
{
	x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
	x.RequireHttpsMetadata = false;
	x.SaveToken = true;
	x.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuerSigningKey = true,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("veryverysceret.....")),
		ValidateAudience = false,
		ValidateIssuer = false,
		ClockSkew = TimeSpan.Zero
	};
});

builder.Services.AddScoped<IUserClaimsPrincipalFactory<AppUser>, AppUserClaimsPrincipalFactory>();

builder.Services.Configure<DataProtectionTokenProviderOptions>(options => options.TokenLifespan = TimeSpan.FromHours(3));

builder.Services.AddDbContext<AppDbContext>(options =>
			 options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IRepository, Repository>();
builder.Services.AddScoped<IEmailService, EmailService>();

//builder.Services.Configure<IISServerOptions>(options =>
//{
//	options.MaxRequestBodySize = int.MaxValue; // Set the maximum request body size
//});


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors();
app.UseAuthorization();
app.UseAuthentication();
app.UseStaticFiles();
app.MapControllers();

app.Run();