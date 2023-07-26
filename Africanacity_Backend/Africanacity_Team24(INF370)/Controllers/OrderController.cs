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
        public async Task<ActionResult<KitchenOrder>> SaveKitchenOrder(KitchenOrderViewModel kitchenOrderViewModel)
        {
            // Create a new KitchenOrder instance from the ViewModel
            var kitchenOrder = new KitchenOrder
            {
                KitchenOrderId = kitchenOrderViewModel.KitchenOrderId,
                TableNumber = kitchenOrderViewModel.TableNumber,
                KitchenOrderNumber = kitchenOrderViewModel.KitchenOrderNumber,
                OrderedItems = kitchenOrderViewModel.OrderedItems,
                OrderedDrinks = kitchenOrderViewModel.OrderedDrinks,
                Subtotal = kitchenOrderViewModel.Subtotal,
                VAT = kitchenOrderViewModel.VAT,
                Discount = kitchenOrderViewModel.Discount,
                
            };

            // Save the KitchenOrder to the database
            _repository.Add(kitchenOrder);
            await _repository.SaveChangesAsync();

            return CreatedAtAction("GetKitchenOrder", new { id = kitchenOrder.KitchenOrderId }, kitchenOrder);
        }



        //get kitchen order
        [HttpGet]
        [Route("GetKitchenOrder/{KitchenOrderNumber}")]

        public async Task<ActionResult<KitchenOrder>> GetKitchenOrder(string kitchenOrderNumber)
        {
            try
            {
                var kitchenOrder = await _repository.GetKitchenOrderByNumberAsync(kitchenOrderNumber);
                if (kitchenOrder == null)
                {
                    return NotFound();
                }
                return Ok(kitchenOrder);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

















    }










}
