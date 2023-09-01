using Africanacity_Team24_INF370_.EmailService;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Inventory;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.IO;

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
        //[HttpPost]
        //[Route("SendEmailNotification")]
        //public async Task<IActionResult> SendEmailNotification()
        //{
        //    int predefinedLevel = 5;

        //    // Get the inventory item from the database based on the predefined level
        //    var item = _appDbContext.Inventory_Items
        //        .Where(item => item.Quantity < predefinedLevel)
        //        .OrderBy(item => item.Quantity) // Order by quantity (ascending) to get the item with the lowest quantity first
        //        .FirstOrDefault();

        //    if (item != null)
        //    {
        //        await _emailService.CheckAndSendNotificationAsync(item.ItemName, item.Quantity, predefinedLevel);
        //    }

        //    return Ok(); // Return an HTTP 200 OK response
        //}

        [HttpPost]
        [Route("SendEmailNotification")]
        public async Task<IActionResult> SendEmailNotification(string itemName) // Pass the item name as a parameter
        {
            int predefinedLevel = 5;

            // Get the inventory item from the database based on the specified item name
            var item = _appDbContext.Inventory_Items
                .FirstOrDefault(item => item.ItemName == itemName); // No more Where or OrderBy

            if (item != null)
            {
                await _emailService.CheckAndSendNotificationAsync(item.ItemName, item.Quantity, predefinedLevel);
            }

            return Ok(); // Return an HTTP 200 OK response
        }


        [HttpPost]
        [Route("SavePDF")]
        public IActionResult SavePDF([FromBody] JObject data)
        {
            try
            {
                // Extract the Base64 string from the JSON object
                var base64Data = data.Value<string>("base64Data");

                // Decode the base64 data
                var bytes = Convert.FromBase64String(base64Data);

                // Specify the file path and name to save the PDF
                var filePath = Path.Combine("PathToYourDesiredFolder", "inventory_checklist.pdf");

                // Save the PDF file
                System.IO.File.WriteAllBytes(filePath, bytes);

                return Ok(); // Return an HTTP 200 OK response
            }
            catch (Exception ex)
            {
                return BadRequest("Error saving PDF: " + ex.Message);
            }
        }

        //[HttpPost]
        //[Route("SaveEmployeeList")]
        //public IActionResult SaveEmployeeList([FromBody] JObject data)
        //{
        //    try
        //    {
        //        // Extract the Base64 string from the JSON object
        //        var base64Data = data.Value<string>("base64Data");

        //        // Decode the base64 data
        //        var bytes = Convert.FromBase64String(base64Data);

        //        // Specify the file path and name to save the PDF
        //        var filePath = Path.Combine("PathToYourDesiredFolder", "employee_listing.pdf");

        //        // Save the PDF file
        //        System.IO.File.WriteAllBytes(filePath, bytes);

        //        return Ok(); // Return an HTTP 200 OK response
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("Error saving PDF: " + ex.Message);
        //    }
        //}
    }
}
