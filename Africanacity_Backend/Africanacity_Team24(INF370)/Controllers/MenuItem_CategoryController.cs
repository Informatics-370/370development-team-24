using Microsoft.AspNetCore.Mvc;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Africanacity_Team24_INF370_.Controllers
{y
    [Route("api/MenuItem_Category")]
    [ApiController]
    public class MenuItem_CategoryController : ControllerBase
    {
        private readonly IRepository _repository;

        public MenuItem_CategoryController(IRepository repository)
        {
            _repository = repository;
        }

        //ERROR CODES FOR DOCUMENTED ERRORS
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]


        // GET: api/<MenuItem_CategoryController>
        [HttpGet]
        [Route("GetAllMenuItemCategories")]
        public async Task<IActionResult> GetAllMenuItemCategories()
        {
            try
            {
                var categories = await _repository.GetAllMenuItemCategoriesAsync();
                return Ok(categories);
            }
            catch (Exception)
            {
                /*Fix error message*/
                //return StatusCode(500, "Enter some error message");
                return StatusCode(StatusCodes.Status500InternalServerError, "No such values");
            }
        }

        // GET api/<MenuItem_CategoryController>/5
        [HttpGet("GetMenuItemCategory/{Menu_CategoryId}")]
        public async Task<ActionResult> GetMenuItemCategoryAsync(int Menu_CategoryId)
        {
            try
            {
                var menuItemCat = await _repository.GetMenuItemCategoryAsync(Menu_CategoryId);
                if (menuItemCat == null) return NotFound("Food type does not exist.");
                return Ok(menuItemCat);
            }
            catch (Exception)
            {
                //return StatusCode(500, "Enter some error message");
                return StatusCode(StatusCodes.Status500InternalServerError, "No such values");
            }
        }

        // Add menu item category
        [HttpPost]
        [Route("AddMenuItemCategory")]
        /*public void Post([FromBody] MenuItem_Category menuItem_Category) 
        { 
            _repository.Add(menuItem_Category);
            _repository.SaveChangesAsync();
        }*/
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddMenuItemCategory(MenuItem_CategoryViewModel micvm)
        {
            var menuItem_Category = new MenuItem_Category { Menu_CategoryId = micvm.Menu_CategoryId, Name = micvm.Name, Description = micvm.Description };

            try
            {
                _repository.Add(menuItem_Category);
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // fix error message
                //return BadRequest("Invalid Transaction");
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return Ok(menuItem_Category);
        }

        // Edit menu item category
        [HttpPut]
        [Route("EditMenuItemCategory/{Menu_CategoryId}")]
        public async Task<ActionResult<MenuItem_CategoryViewModel>> EditMenuItemCategory(int Menu_CategoryId, MenuItem_CategoryViewModel micvm)
        {
            try
            {
                var existingMenuItem_Category = await _repository.GetMenuItemCategoryAsync(Menu_CategoryId);

                // fix error message
                if (existingMenuItem_Category == null) return NotFound($"The drink type does not exist");

                existingMenuItem_Category.Name = micvm.Name;

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingMenuItem_Category);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        // Delete menu item category
        [HttpDelete]
        [Route("DeleteMenuItemCategory/{Menu_CategoryId}")]
        public async Task<IActionResult> DeleteMenuItemCategory(int Menu_CategoryId)
        {
            try
            {
                var existingMenuItem_Category = await _repository.GetMenuItemCategoryAsync(Menu_CategoryId);

                // fix error message
                if (existingMenuItem_Category == null) return NotFound($"The food type does not exist");

                _repository.Delete(existingMenuItem_Category);

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingMenuItem_Category);
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
