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
        public async Task<IActionResult> SaveKitchenOrder([FromBody] KitchenOrderViewModel kitchenOrder)
        {
            try
            {
                // Create a new instance of KitchenOrder and map the data from the view model
                var newKitchenOrder = new KitchenOrder
                {
                    TableNumber = kitchenOrder.TableNumber,
                    KitchenOrderNumber = kitchenOrder.KitchenOrderNumber,
                    // Map the selected menu item names and drink names to their corresponding properties
                    OrderedItems = kitchenOrder.OrderedItems.Select(item => item.Name).ToList(),
                    OrderedDrinks = kitchenOrder.OrderedDrinks.Select(drink => drink.Name).ToList(),
                    Subtotal = kitchenOrder.Subtotal,
                    VAT = kitchenOrder.VAT,
                    Discount = kitchenOrder.Discount,
                    
                };

                    // Save the newKitchenOrder to the database using your DbContext
                _repository.Add(newKitchenOrder);
                await _repository.SaveChangesAsync();

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
        [Route("GetAllKitchenOrders")]
        public async Task<ActionResult<List<KitchenOrder>>> GetAllKitchenOrders()
        {
            try
            {
                var kitchenOrders = await _repository.GetAllKitchenOrdersAsync();
                return Ok(kitchenOrders);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
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
