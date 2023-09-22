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
    public class MenuTypeController : ControllerBase
    {
        private readonly IRepository _repository;

        public MenuTypeController(IRepository repository)
        {
            _repository = repository;
        }

        //Get
        [HttpGet]
        [Route("GetAllMenuTypes")]
        public async Task<IActionResult> GetAllMenuTypes()
        {
            try
            {
                var menuTypes = await _repository.GetAllMenuTypesAsync();
                return Ok(menuTypes);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet]
        [Route("GetMenuType/{Menu_TypeId}")]
        public async Task<IActionResult> GetMenuTypeAsync(int Menu_TypeId)
        {
            try
            {
                var result = await _repository.GetMenuTypeAsync(Menu_TypeId);

                if (result == null) return NotFound("Course does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        //Create
        [HttpPost]
        [Route("AddMenuType")]
        public async Task<IActionResult> AddMenuType(MenuTypeViewModel menuTypeViewModel)
        {
            //tree diagram
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var menuType = new Menu_Type { Name = menuTypeViewModel.Name};

            try
            {
                _repository.Add(menuType);
                await _repository.SaveChangesAsync();


                //tree diagram --start

                // Update the Menu Type with associated Menu Categories and Food Types
                if (menuTypeViewModel.MenuCategories != null && menuTypeViewModel.MenuCategories.Any())
                {
                    var associatedMenuCategories = menuTypeViewModel.MenuCategories
                        .Select(mc => new MenuItem_Category
                        {
                            Name = mc.Name,
                            Description = mc.Description
                        }).ToList();

                    menuType.MenuCategories.AddRange(associatedMenuCategories);
                }

                if (menuTypeViewModel.FoodTypes != null && menuTypeViewModel.FoodTypes.Any())
                {
                    var associatedFoodTypes = menuTypeViewModel.FoodTypes
                        .Select(ft => new Food_Type
                        {
                            Name = ft.Name,
                            Description = ft.Description
                        }).ToList();

                    menuType.FoodTypes.AddRange(associatedFoodTypes);
                }
                //tree diagram --end

                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }

            return Ok(menuType);
        }

        //Update
        [HttpPut]
        [Route("EditMenuType/{Menu_TypeId}")]
        public async Task<ActionResult<MenuTypeViewModel>> EditMenuType(int Menu_TypeId, MenuTypeViewModel menuTypeViewModel)
        {
            try
            {
                var existingMenuType = await _repository.GetMenuTypeAsync(Menu_TypeId);
                if (existingMenuType== null) return NotFound($"The course does not exist");

                existingMenuType.Name = menuTypeViewModel.Name;
               


                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingMenuType);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        //Delete
        [HttpDelete]
        [Route("DeleteMenuType/{Menu_TypeId}")]
        public async Task<IActionResult> DeleteMenuType(int Menu_TypeId)
        {
            try
            {
                var existingMenuType = await _repository.GetMenuTypeAsync(Menu_TypeId);

                if (existingMenuType == null) return NotFound($"The course does not exist");

                _repository.Delete(existingMenuType);

                if (await _repository.SaveChangesAsync()) return Ok(existingMenuType);

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
    }
}
