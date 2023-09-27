using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Components.Routing;
using Africanacity_Team24_INF370_.models;
using System.Reflection.Metadata.Ecma335;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
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
        public async Task <ActionResult> GetAllMenuItemCategories()
        {
            try
            {
                var categories = await _repository.GetAllMenuItemCategoriesAsync();

                dynamic menuCategories = categories.Select(p => new
                {
                    p.Menu_CategoryId,
                    p.Name,
                    p.Description,
                    MenuTypeName = p.Menu_Type.Name,
                  
                });

                return Ok(menuCategories);
            }
            catch (Exception)
            {
                /*Fix error message*/
                //return StatusCode(500, "Enter some error message");
                return StatusCode(StatusCodes.Status500InternalServerError, "No such values");
            }
        }

        // GET api/<MenuItem_CategoryController>/5
        [HttpGet("GetMenuItemCategory/{menu_CategoryId}")]
        public async Task<ActionResult> GetMenuItemCategoryAsync(int menu_CategoryId)
        {
            try
            {
                var menuItemCat = await _repository.GetMenuItemCategoryAsync(menu_CategoryId);
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
      
      
        public async Task<IActionResult> AddMenuItemCategory(IFormCollection formData)
        {

            //tree diagram
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var menuItemCategory = new MenuItem_Category
            {
                Name = formData["name"],
                Description = formData["description"],
                Menu_TypeId = Convert.ToInt32(formData["menuType"]),
               
            };


            try
            {
                _repository.Add(menuItemCategory);
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // fix error message
                //return BadRequest("Invalid Transaction");
                return StatusCode(StatusCodes.Status400BadRequest);
            }

            return Ok(menuItemCategory);

        }

        // Edit menu item category
        [HttpPut]
        [Route("EditMenuItemCategory/{menu_CategoryId}")]
        public async Task<ActionResult<MenuItem_CategoryViewModel>> EditMenuItemCategory(int menu_CategoryId, MenuItem_CategoryViewModel micvm)
        {
            //try
            //{
            //    var existingMenuItem_Category = await _repository.GetMenuItemCategoryAsync(Menu_CategoryId);

            //    // fix error message
            //    if (existingMenuItem_Category == null) return NotFound($"The drink type does not exist");

            //    existingMenuItem_Category.Name = micvm.Name;

            //    if (await _repository.SaveChangesAsync())
            //    {
            //        return Ok(existingMenuItem_Category);
            //    }
            //}
            //catch (Exception)
            //{
            //    return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            //}
            //return BadRequest("Your request is invalid");
            try
            {
                var existingCourse = await _repository.GetMenuItemCategoryAsync(menu_CategoryId);
                if (existingCourse == null) return NotFound($"The menu item category does not exist");

                existingCourse.Name = micvm.Name;
                existingCourse.Description = micvm.Description;

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingCourse);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        // Delete menu item category
        [HttpDelete]
        [Route("DeleteMenuItemCategory/{menu_CategoryId}")]
        public async Task<IActionResult> DeleteMenuItemCategory(int menu_CategoryId)
        {
            //try
            //{
                //    var existingMenuItem_Category = await _repository.GetMenuItemCategoryAsync(Menu_CategoryId);

                //    // fix error message
                //    if (existingMenuItem_Category == null) return NotFound($"The food type does not exist");

                //    _repository.Delete(existingMenuItem_Category);

                //    if (await _repository.SaveChangesAsync())
                //    {
                //        return Ok(existingMenuItem_Category);
                //    }
                //}
                //catch (Exception)
                //{
                //    return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
                //}
                //return BadRequest("Your request is invalid
                try
                {
                    var existingCourse = await _repository.GetMenuItemCategoryAsync(menu_CategoryId);

                    if (existingCourse == null) return NotFound($"The menu item category does not exist");

                    _repository.Delete(existingCourse);

                    if (await _repository.SaveChangesAsync()) return Ok(existingCourse);

                }
                catch (Exception)
                {
                    return StatusCode(500, "Internal Server Error. Please contact support.");
                }
                return BadRequest("Your request is invalid.");
            }
    }
}
