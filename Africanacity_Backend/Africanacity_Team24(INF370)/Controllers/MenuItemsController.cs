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
    public class MenuItemsController : ControllerBase
    {
        private readonly IRepository _repository;
        public MenuItemsController(IRepository repository)
        {
            _repository = repository;
        }

        //getting a list of the table menu items

        [HttpGet]
        [Route("MenuItemListing")]
        public async Task<ActionResult> MenuItemListing()
        {
            try
            {
                var results = await _repository.GetAllMenuItemsAsync();

                dynamic menuItems = results.Select(p => new
                {
                    p.MenuItemId,
                    p.Name,
                    p.Description,
                    MenuTypeName = p.Menu_Type.Name,
                    FoodTypeName = p.Food_Type.Name,
                    MenuCategoryName = p.MenuItem_Category.Name,
                    p.IsActive,
                    p.IsDeleted,
                });

                return Ok(menuItems);
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }


        [HttpGet]
        [Route("GetAllMenuItems")]
        public async Task<IActionResult> GetAllMenuItems()
        {
            try
            {
                var results = await _repository.GetAllMenuItemsAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet]
        [Route("GetMenuItem/{MenuItemId}")]
        public async Task<IActionResult> GetMenuItemAsync(int MenuItemId)
        {
            try
            {
                var menuItem = await _repository.GetMenuItemAsync(MenuItemId);

                if (menuItem == null)
                {
                    return NotFound();
                }

                return Ok(menuItem);
            }
           
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }

            
        }

        //adding a menu item
        [HttpPost]
        [Route("AddMenuItem")]
        public async Task<IActionResult> AddMenuItem(IFormCollection formData)
        {
            // Implementation goes here

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var menuItem = new MenuItem
            {
                Name = formData["name"],
                Description = formData["description"],
                Menu_TypeId = Convert.ToInt32(formData["menuType"]),
                FoodTypeId = Convert.ToInt32(formData["foodType"]),
                Menu_CategoryId = Convert.ToInt32(formData["menuCategory"]),
            };

            try
            {
                _repository.Add(menuItem);
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }

            return Ok(menuItem);
        }



    

    [HttpPut]
        [Route("EditMenuItem/{MenuItemId}")]
        public async Task<ActionResult<MenuItemViewModel>> EditMenuItem(int MenuItemId, [FromBody] MenuItemViewModel menuItemViewModel)
        {
            try
            {
                var existingMeal = await _repository.GetMenuItemAsync(MenuItemId);
                if (existingMeal == null) return NotFound($"The menu item does not exist");

                existingMeal.Name = menuItemViewModel.Name;
                existingMeal.Description = menuItemViewModel.Description;
                existingMeal.Menu_TypeId = menuItemViewModel.MenuTypeId;
                existingMeal.FoodTypeId = menuItemViewModel.FoodTypeId;
                existingMeal.Menu_CategoryId = menuItemViewModel.MenuCategoryId;
                


                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingMeal);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        [HttpDelete]
        [Route("DeleteMenuItem/{MenuItemId}")]
        public async Task<IActionResult> DeleteMenuItem(int MenuItemId)
        {
            try
            {
                var existingMeal = await _repository.GetMenuItemAsync(MenuItemId);

                if (existingMeal == null) return NotFound($"The menu item does not exist");

                _repository.Delete(existingMeal);

                if (await _repository.SaveChangesAsync()) return Ok(existingMeal);

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

    }
}
