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
    public class OtherDrinkController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly AppDbContext _appDbContext;
        public OtherDrinkController(IRepository repository, AppDbContext appDbContext)
        {
            _repository = repository;
            _appDbContext = appDbContext;
        }


        //getting a lisr of table drink items
        [HttpGet]
        [Route("DrinkItemListing")]
        public async Task<ActionResult> DrinkItemListing()
        {
            try
            {
                var results = await _repository.GetAllDrinkItemsAsync();

                dynamic drinks = results.Select(p => new
                {
                    p.OtherDrinkId,
                    p.Name,
                    p.Description,
                    DrinkTypeName = p.Drink_Type.Name,
                });

                return Ok(drinks);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }


        //ADD A DRINK
        [HttpPost]
        [Route("AddDrinkItem")]
        public async Task<IActionResult> AddDrinkItem(IFormCollection formData)
        {
            // Implementation goes here

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            //to add to menu item table
            var drink = new OtherDrink
            {
                Name = formData["name"],
                Description = formData["description"],
                Drink_TypeId = Convert.ToInt32(formData["drinkTypeName"]),
                
            };



            try
            {
                _repository.Add(drink);
                await _repository.SaveChangesAsync();

                // Create the MenuItem_Price instance
                var drinkPrice = new OtherDrinkPrice
                {
                    OtherDrinkId = drink.OtherDrinkId,
                    Amount = Convert.ToDecimal(formData["amount"])

                };

                _repository.Add(drinkPrice);
                await _repository.SaveChangesAsync();

            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }


            return Ok(drink);
        }












    }
}
