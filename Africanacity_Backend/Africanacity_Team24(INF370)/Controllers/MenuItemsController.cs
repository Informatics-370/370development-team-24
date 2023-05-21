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


        /* public IActionResult Index()
         {


             return View();
         }*/

        [HttpGet]
        [Route("GetAllMenuItems")]
        public async Task<IActionResult> GetAllMenuItems()
        {
            try
            {
                var results = await _repository.GetAllMenuItemAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet]
        [Route("GetMenuItem/{MenuItemId}")]
        public async Task<IActionResult> GetMenuItemAsync(int MenuItem_Id)
        {
            try
            {
                var result = await _repository.GetMenuItemAsync(MenuItem_Id);

                if (result == null) return NotFound("Menu Item does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost]
        [Route("AddMenuItem")]
        public async Task<IActionResult> AddMenuItem(MenuItemViewModel menuItemViewModel)
        {
            var menuItem = new MenuItem {MenuItemId = menuItemViewModel.MenuItemId, Name = menuItemViewModel.Name, Description = menuItemViewModel.Description, };

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
        [Route("EditMenuItem/{menuItemId}")]
        public async Task<ActionResult<MenuItemViewModel>> EditMenuItem(int MenuItemId, MenuItemViewModel menuItemViewModel)
        {
            try
            {
                var existingMeal = await _repository.GetMenuItemAsync(MenuItemId);
                if (existingMeal == null) return NotFound($"The course does not exist");

                existingMeal.Name = menuItemViewModel.Name;
                existingMeal.Description = menuItemViewModel.Description;
                


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

                if (existingMeal == null) return NotFound($"The course does not exist");

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
