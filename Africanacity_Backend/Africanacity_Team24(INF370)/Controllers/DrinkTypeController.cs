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
    public class DrinkTypeController : ControllerBase
	{
		private readonly IRepository _repository;

		public DrinkTypeController(IRepository repository) 
		{
			_repository = repository;
		}

        //ERROR CODES FOR DOCUMENTED ERRORS
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

		// getting a list of all the drink types
		[HttpGet]
		[Route("GetAllDrinkTypes")]
		public async Task<IActionResult> GetAllDrinkTypes()
		{
			try
			{
				var drinktypes = await _repository.GetAllDrinkTypesAsync();
				return Ok(drinktypes);
			}
			catch (Exception)
			{
				/*Fix error message*/
				//return StatusCode(500, "Enter some error message");
				return StatusCode(StatusCodes.Status500InternalServerError, "No such values");
			}
		}

		//getting drink type using id
		[HttpGet]
		[Route("GetDrinkType/{Drink_TypeId}")]
		public async Task<ActionResult> GetDrinkType(int Drink_TypeId)
		{
			try
			{
                var drinktypes = await _repository.GetDrinkTypeAsync(Drink_TypeId);
				if (drinktypes == null) return NotFound("Drink type does not exist.");
				return Ok(drinktypes);
            }
			catch(Exception)
			{
				return StatusCode(500, "Enter some error message");
			}

        }

        // Add drink type
        [HttpPost]
        [Route("AddDrinkType")]
        public async Task<IActionResult> AddDrinkType(DrinkTypeViewModel dtvm)
        {
            var drinkType = new Drink_Type { Name = dtvm.Name};

            try
            {
                _repository.Add(drinkType);
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // fix error message
                return BadRequest("Invalid Transaction");
            }

            return Ok(drinkType);
        }

        // Edit drink type
        [HttpPut]
        [Route("EditDrinkType/{Drink_TypeId}")]
        public async Task<ActionResult<DrinkTypeViewModel>> EditDrinkType(int Drink_TypeId, DrinkTypeViewModel dtvm)
        {
            try
            {
                var existingDrinkType = await _repository.GetDrinkTypeAsync(Drink_TypeId);

                // fix error message
                if (existingDrinkType == null) return NotFound($"The drink type does not exist");

                existingDrinkType.Name = dtvm.Name;

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingDrinkType);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        // Delete drink type
        [HttpDelete]
        [Route("DeleteDrinkType/{Drink_TypeId}")]
        public async Task<IActionResult> DeleteDrinkType(int Drink_TypeId)
        {
            try
            {
                var existingDrinkType = await _repository.GetDrinkTypeAsync(Drink_TypeId);

                // fix error message
                if (existingDrinkType == null) return NotFound($"The food type does not exist");

                _repository.Delete(existingDrinkType);

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingDrinkType);
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
