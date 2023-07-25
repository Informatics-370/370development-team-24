using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Africanacity_Team24_INF370_.EmailService; // Ensure you are using the correct namespace for IEmailService and EmailService

namespace Africanacity_Team24_INF370_
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Register the IEmailService and EmailService
            services.AddScoped<IEmailService, Africanacity_Team24_INF370_.EmailService.EmailService>();

            // Add other services and configurations as needed
            // ...
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // ...
        }
    }
}
