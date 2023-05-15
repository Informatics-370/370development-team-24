using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Components.Routing;
using Africanacity_Team24_INF370_.models;
using System.Reflection.Metadata.Ecma335;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/foodTypeController")]
    [ApiController]
    public class FoodTypeController : ControllerBase
    {
        private readonly IRepository _repository;

        public FoodTypeController(IRepository repository)
        {
            _repository = repository;
        }

        // getting a list of all the food types
        [HttpGet]
        [Route("GetAllFoodTypes")]
        public async Task<IActionResult> GetAllFoodTypes()
        {
            try
            {
                var foodtypes = await _repository.GetAllFoodTypesAsync();
                return Ok(foodtypes);
            }
            catch (Exception)
            {
                /*Fix error message*/
                return StatusCode(500, "Enter some error message");
            }
        }

        //getting food type using id
        [HttpGet]
        [Route("GetFoodType/{FoodTypeId}")]
        public async Task<ActionResult> GetFoodType(int FoodTypeId)
        {
            try
            {
                var foodtypes = await _repository.GetFoodTypeAsync(FoodTypeId);
                if (foodtypes == null) return NotFound("Food type does not exist.");
                return Ok(foodtypes);
            }
            catch (Exception)
            {
                return StatusCode(500, "Enter some error message");
            }

        }

        // Add food type
        [HttpPost]
        [Route("AddFoodType")]
        public async Task<IActionResult> AddFoodType(FoodTypeViewModel ftvm)
        {
            var foodType = new Food_Type { Name = ftvm.Name, Description = ftvm.Description };

            try
            {
                _repository.Add(foodType);
                await _repository.SaveChangesAsync();
            }
            catch (Exception) 
            {
                // fix error message
                return BadRequest("Invalid Transaction");
            }

            return Ok(foodType);
        }

        // Edit food type
        [HttpPut]
        [Route("EditFoodType/{FoodTypeId}")]
        public async Task<ActionResult<FoodTypeViewModel>> EditFoodType(int FoodTypeId, FoodTypeViewModel ftvm)
        {
            try
            {
                var existingFoodType = await _repository.GetFoodTypeAsync(FoodTypeId);

                // fix error message
                if (existingFoodType == null) return NotFound($"The food type does not exist");

                existingFoodType.Name = ftvm.Name;
                existingFoodType.Description = ftvm.Description;

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingFoodType);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        // Delete food type
        [HttpDelete]
        [Route("DeleteFoodType/{FoodTypeId}")]
        public async Task<IActionResult> DeleteFoodType(int FoodTypeId)
        {
            try
            {
                var existingFoodType = await _repository.GetFoodTypeAsync(FoodTypeId);

                // fix error message
                if (existingFoodType == null) return NotFound($"The food type does not exist");

                _repository.Delete(existingFoodType);

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingFoodType);
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
