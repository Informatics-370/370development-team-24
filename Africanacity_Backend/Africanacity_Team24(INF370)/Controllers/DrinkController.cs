using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Components.Routing;
using Africanacity_Team24_INF370_.models;
using System.Reflection.Metadata.Ecma335;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/controller")]
    [ApiController]
    public class DrinkController : ControllerBase
    {
        private readonly IRepository _repository;

        public DrinkController(IRepository repository)
        {
            _repository = repository;
        }

        //ERROR CODES FOR DOCUMENTED ERRORS
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        // getting a list of all the drink items
        [HttpGet]
        [Route("GetAllDrinks")]
        public async Task<IActionResult> GetAllDrinks()
        {
            try
            {
                var drinkItems = await _repository.GetAllDrinksAsync();
                return Ok(drinkItems);
            }
            catch (Exception)
            {
                /*Fix error message*/
                //return StatusCode(500, "Enter some error message");
                return StatusCode(StatusCodes.Status500InternalServerError, "No such values");
            }
        }

        //getting drink item using id
        [HttpGet]
        [Route("GetDrinkItem/{DrinkId }")]
        public async Task<ActionResult> GetDrinkItem(int DrinkId)
        {
            try
            {
                var drinkItem = await _repository.GetDrinkItemAsync(DrinkId);
                if (drinkItem == null) return NotFound("Drink type does not exist.");
                return Ok(drinkItem);
            }
            catch (Exception)
            {
                return StatusCode(500, "Enter some error message");
            }

        }

        // Add drink item
        [HttpPost]
        [Route("AddDrinkItem")]
        public async Task<IActionResult> AddDrinkItem(DrinkViewModel drinkViewModel)
        {
            var drinkItem = new Drink { Name = drinkViewModel.Name };

            try
            {
                _repository.Add(drinkItem);
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // fix error message
                return BadRequest("Invalid Transaction");
            }

            return Ok(drinkItem);
        }

        // Edit drink item
        [HttpPut]
        [Route("EditDrinkItem/{DrinkId}")]
        public async Task<ActionResult<DrinkViewModel>> EditDrinkItem(int DrinkId, DrinkViewModel drinkViewModel)
        {
            try
            {
                var existingDrinkItem = await _repository.GetDrinkItemAsync(DrinkId);

                // fix error message
                if (existingDrinkItem == null) return NotFound($"The drink type does not exist");

                existingDrinkItem.Name = drinkViewModel.Name;

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingDrinkItem);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        // Delete drink item
        [HttpDelete]
        [Route("DeleteDrinkItem/{DrinkId}")]
        public async Task<IActionResult> DeleteDrinkItem(int DrinkId)
        {
            try
            {
                var existingDrinkItem = await _repository.GetDrinkItemAsync(DrinkId);

                // fix error message
                if (existingDrinkItem == null) return NotFound($"The food type does not exist");

                _repository.Delete(existingDrinkItem);

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingDrinkItem);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }
    }
}
