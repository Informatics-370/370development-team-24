using Africanacity_Team24_INF370_.EmailService;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Inventory;
using Microsoft.AspNetCore.Mvc;



namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class SendNotificationController : Controller
    {
        private readonly IEmailService _emailService;
        private readonly AppDbContext _appDbContext;

        public SendNotificationController(IEmailService emailService, AppDbContext context)
        {
            _emailService = emailService;
            _appDbContext = context;
        }
        [HttpPost]
        [Route("SendEmail")]
        public async Task<IActionResult> SendNotification()
        {
            int predefinedLevel = 5;

            // Get the inventory item from the database based on the predefined level
            var item = _appDbContext.Inventory_Items
                .Where(item => item.Quantity < predefinedLevel)
                .OrderBy(item => item.Quantity) // Order by quantity (ascending) to get the item with the lowest quantity first
                .FirstOrDefault();

            if (item != null)
            {
                await _emailService.CheckAndSendNotificationAsync(item.ItemName, item.Quantity, predefinedLevel);
            }

            return Ok(); // Return an HTTP 200 OK response
        }// Retu // Return an HTTP 200 OK response
    }
    }

