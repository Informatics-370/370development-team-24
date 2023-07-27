using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Components.Routing;
using Africanacity_Team24_INF370_.models;
using System.Reflection.Metadata.Ecma335;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;



namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IRepository _repository;
        
        public OrderController(IRepository repository)
        {
            _repository = repository;
            
        }


        //Get all table numbers

        [HttpGet]
        [Route("GetAllTableNumbers")]
        public async Task<IActionResult> GetAllTableNumbers()
        {
            try
            {
                var results = await _repository.GetAllTableNumbersAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }


        //save kicthen orders
        [HttpPost]
        [Route("SaveKitchenOrder")]
        public IActionResult SaveKitchenOrder([FromBody] KitchenOrderViewModel kitchenOrder)
        {
            try
            {
                // Process the submitted data using the ViewModel without navigation properties
                // For example, you can access the ordered items and drinks like this:
                foreach (var orderedItem in kitchenOrder.OrderedItems)
                {
                    // Access the properties of orderedItem (MenuItemViewModel)
                    int menuItemId = orderedItem.MenuItemId;
                    string name = orderedItem.Name;
                    // ... and so on ...
                }

                foreach (var orderedDrink in kitchenOrder.OrderedDrinks)
                {
                    // Access the properties of orderedDrink (DrinkViewModel)
                    int drinkId = orderedDrink.DrinkId;
                    string name = orderedDrink.Name;
                    // ... and so on ...
                }

                // ... rest of the code ...

                // Return an appropriate response
                return Ok(new { message = "Kitchen order saved successfully." });
            }
            catch (Exception ex)
            {
                // Handle any exceptions that may occur during processing
                return BadRequest("Error saving kitchen order: " + ex.Message);
            }
        }



        //get kitchen order
        [HttpGet]
        [Route("GetKitchenOrder/{kitchenOrderNumber}")]
        public async Task<ActionResult<KitchenOrder>> GetKitchenOrder(string kitchenOrderNumber)
        {
            try
            {
                var kitchenOrder = await _repository.GetKitchenOrderByNumberAsync(kitchenOrderNumber);
                if (kitchenOrder == null)
                {
                    return NoContent(); // 204 No Content
                }
                return Ok(kitchenOrder); // 200 OK
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        //get Vat by Id
        [HttpGet]
        [Route("GetVatItem/{VatId}")]
        public async Task<IActionResult> GetVatItemAsync(int VatId)
        {
            try
            {
                var vatItem = await _repository.GetVatItemAsync(VatId);

                if (vatItem == null)
                {
                    return NotFound();
                }

                return Ok(vatItem);
            }

            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }


        }

        //get Discount by Id
        [HttpGet]
        [Route("GetDiscountItem/{DiscountId}")]
        public async Task<IActionResult> GetDiscountItemAsync(int DiscountId)
        {
            try
            {
                var discountItem = await _repository.GetDiscountItemAsync(DiscountId);

                if (discountItem == null)
                {
                    return NotFound();
                }

                return Ok(discountItem);
            }

            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }


        }


















    }










}
