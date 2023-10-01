using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Components.Routing;
using Africanacity_Team24_INF370_.models;
using System.Reflection.Metadata.Ecma335;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;
using System.Data.Entity.Infrastructure;
using System.Text.Json.Serialization;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System;


namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodTypeController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly AppDbContext _appDbContext;

        public FoodTypeController(IRepository repository, AppDbContext appDbContext)
        {
            _repository = repository;
            _appDbContext = appDbContext;
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
        [Route("GetFoodType/{foodTypeId}")]
        public async Task<ActionResult> GetFoodType(int foodTypeId)
        {
            try
            {
                var foodType = await _appDbContext.Food_Types
                    .Include(ft => ft.MenuCategoryFoodTypes)
                    .FirstOrDefaultAsync(f => f.FoodTypeId == foodTypeId);

                if (foodType == null) return NotFound("Food type does not exist.");

                var foodTypeViewModel = new FoodTypeViewModel
                {
                    Name = foodType.Name,
                    Description = foodType.Description,
                    MenuCategoryFoodTypeItems = foodType.MenuCategoryFoodTypes
               .Select(mcf => new MenuCategoryFoodTypeViewModel
               {
                   Menu_CategoryId = mcf.Menu_CategoryId
               })
               .ToList()
                };

                return Ok(foodTypeViewModel);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }
        // Add food type
        [HttpPost]
        [Route("AddFoodType")]
        public async Task<IActionResult> AddFoodType(FoodTypeViewModel ftvm)
        {

            //tree diagram
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                var foodType = new Food_Type
                {
                    Name = ftvm.Name,
                    Description = ftvm.Description,
                    MenuCategoryFoodTypes = new List<MenuCategoryFoodType>()


                };

                foreach (var item in ftvm.MenuCategoryFoodTypeItems)
                {
                    var menuCategoryFoodType = new MenuCategoryFoodType
                    {
                        Menu_CategoryId = item.Menu_CategoryId,
                    };

                    var menuCategoryId = _appDbContext.MenuItem_Categories.FirstOrDefault(i => i.Menu_CategoryId == menuCategoryFoodType.Menu_CategoryId);
                    foodType.MenuCategoryFoodTypes.Add(menuCategoryFoodType); //add the menuCategoryFoodTypeItem to the associative table
                }

                var options = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve,
                    // other options...
                };

                var jsonString = JsonSerializer.Serialize(foodType, options);  

                _appDbContext.Food_Types.Add(foodType);
                _appDbContext.SaveChanges();
                return Ok(jsonString);
            }
            catch (Exception ex)
            {
                var innerExceptionMessage = ex.InnerException?.Message ?? "No inner exception message available";
                return BadRequest($"Error: {ex.Message}. Inner Exception: {innerExceptionMessage}");
            }
            
        }
    

        // Edit food type
        [HttpPut]
        [Route("EditFoodType/{foodTypeId}")]
        public async Task<ActionResult<FoodTypeViewModel>> EditFoodType(int foodTypeId, FoodTypeViewModel ftvm)
        {
            try
            {
                var existingFoodType = await _repository.GetFoodTypeAsync(foodTypeId);

                // fix error message
                if (existingFoodType == null) return NotFound($"The food type does not exist");

                existingFoodType.Name = ftvm.Name;
                existingFoodType.Description = ftvm.Description;

                // Update the associated menu categories
                existingFoodType.MenuCategoryFoodTypes.Clear(); // Clear existing associations

                foreach (var item in ftvm.MenuCategoryFoodTypeItems)
                {
                    var menuCategoryFoodType = new MenuCategoryFoodType
                    {
                        Menu_CategoryId = item.Menu_CategoryId,
                    };

                    existingFoodType.MenuCategoryFoodTypes.Add(menuCategoryFoodType);
                }

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
        [Route("DeleteFoodType/{foodTypeId}")]
        public async Task<IActionResult> DeleteFoodType(int foodTypeId)
        {
            try
            {
                var existingFoodType = await _repository.GetFoodTypeAsync(foodTypeId);

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
