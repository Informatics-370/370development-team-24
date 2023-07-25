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
        public async Task<ActionResult<KitchenOrder>> SaveKitchenOrder(KitchenOrder kitchenOrder)
        {
            // Make sure to set the timestamp to the current date and time
            kitchenOrder.Timestamp = DateTime.Now;

            // Save the KitchenOrder to the database
            _repository.Add(kitchenOrder);
            await _repository.SaveChangesAsync();

            return CreatedAtAction("GetKitchenOrder", new { id = kitchenOrder.KitchenOrderId }, kitchenOrder);
        }

















    }










}
