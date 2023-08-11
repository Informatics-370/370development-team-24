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
        //[HttpGet]
        //[Route("GetAllDrinks")]
        //public async Task<IActionResult> GetAllDrinks()
        //{
        //    try
        //    {
        //        var drinkItems = await _repository.GetAllDrinksAsync();
        //        return Ok(drinkItems);
        //    }
        //    catch (Exception)
        //    {
        //        /*Fix error message*/
        //        //return StatusCode(500, "Enter some error message");
        //        return StatusCode(StatusCodes.Status500InternalServerError, "No such values");
        //    }
        //}


        [HttpGet]
        [Route("DrinkItemListing")]
        public async Task<ActionResult> DrinkItemListing()
        {
            try
            {
                var results = await _repository.GetAllDrinksAsync();

                dynamic drinks = results.Select(p => new
                {
                    p.DrinkId,
                    p.Name,
                    DrinkTypeName = p.Drink_Type.Name,
                });

                return Ok(drinks);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
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

        // Add drink
        //[HttpPost]
        //[Route("AddDrink")]
        //public async Task<IActionResult> AddDrink(DrinkViewModel dvm)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var drink = new Drink
        //    {
        //        Name = dvm.Name,
        //        Drink_TypeId = Convert.ToInt32(dvm.DrinkType),
        //    };

        //    try
        //    {
        //        _repository.Add(drink);
        //        await _repository.SaveChangesAsync();
        //    }
        //    catch (Exception)
        //    {
        //        return BadRequest("Invalid transaction");
        //    }

        //    return Ok(drink);
        //    /*var drink = new Drink { Name = dvm.Name };

        //    try
        //    {
        //        _repository.Add(drink);
        //        await _repository.SaveChangesAsync();
        //    }
        //    catch (Exception)
        //    {
        //        // fix error message
        //        return BadRequest("Invalid Transaction");
        //    }

        //    return Ok(drink);*/
        //}


        //add drink
        [HttpPost]
        [Route("AddDrink")]
        public async Task<IActionResult> AddDrink(IFormCollection formData)
        {
            // Implementation goes here

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!int.TryParse(formData["drinkType"], out int drinkTypeId))
            {
                return BadRequest("Invalid drinkType value.");
            }

            //to add to menu item table
            var drink = new Drink
            {
                Name = formData["name"],
                Drink_TypeId = Convert.ToInt32(formData["drinkType"])
               
            };
            try
            {
                _repository.Add(drink);
                await _repository.SaveChangesAsync();

                // Create the MenuItem_Price instance
                var drinkItemPrice = new Drink_Price
                {
                    DrinkId = drink.DrinkId,
                    Amount = Convert.ToDecimal(formData["amount"])

                };

                _repository.Add(drinkItemPrice);
                await _repository.SaveChangesAsync();

            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }


            return Ok(drink);
        }

        // Edit drink type
        [HttpPut]
        [Route("EditDrink/{drinkId}")]
        public async Task<ActionResult<DrinkViewModel>> EditDrink(int drinkId, DrinkViewModel dvm)
        {
            try
            {
                var existingDrink = await _repository.GetDrinkAsync(drinkId);

                // fix error message
                if (existingDrink == null) return NotFound($"The drink does not exist");

                existingDrink.Name = dvm.Name;

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingDrink);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        // Delete drink 
        [HttpDelete]
        [Route("DeleteDrink/{drinkId}")]
        public async Task<IActionResult> DeleteDrink(int drinkId)
        {
            try
            {
                var existingDrink = await _repository.GetDrinkTypeAsync(drinkId);

                // fix error message
                if (existingDrink == null) return NotFound($"The food type does not exist");

                _repository.Delete(existingDrink);

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingDrink);
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
