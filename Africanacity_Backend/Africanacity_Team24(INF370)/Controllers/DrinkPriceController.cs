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
    public class DrinkPriceController : ControllerBase
    {
        private readonly IRepository _repository;

        public DrinkPriceController(IRepository repository)
        {
            _repository = repository;
        }

        //Get drink items'prices
        [HttpGet]
        [Route("GetAllDrinkItemPrices")]
        public async Task<IActionResult> GetAllDrinkItemPrices()
        {
            try
            {
                var drinkItemPrices = await _repository.GetAllDrinkItemPricesAsync();
                return Ok(drinkItemPrices);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        //get a specific menu item's price
        [HttpGet]
        [Route("GetADrinkItemPrice/{Drink_PriceId}")]
        public async Task<IActionResult> GetADrinkItemPriceAsync(int Drink_PriceId)
        {
            try
            {
                var result = await _repository.GetADrinkItemPriceAsync(Drink_PriceId);

                if (result == null) return NotFound("Course does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

	




}
}
