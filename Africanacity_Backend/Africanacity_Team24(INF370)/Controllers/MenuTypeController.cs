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

        [HttpPost]
        [Route("AddMenuType")]
        public async Task<IActionResult> AddMenuType(MenuTypeViewModel menuTypeViewModel)
        {
            var menuType = new Menu_Type { Name = menuTypeViewModel.Name };

            try
            {
                _repository.Add(menuType);
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }

            return Ok(menuType);
        }



        //get menu category by menu type
        //[HttpGet]
        //[Route("GetMenuCategoriesForMenuType/{Menu_TypeId}")]
        //public async Task<IActionResult> GetMenuCategoriesForMenuType(int Menu_TypeId)
        //{
        //    try
        //    {
        //        var result = await _repository.GetMenuCategoriesForMenuTypeAsync(Menu_TypeId);

        //        if (result == null) return NotFound("Course does not exist");

        //        return Ok(result);
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(500, "Internal Server Error. Please contact support");
        //    }
        //}

        ////[HttpGet]
        ////[Route("GetFoodTypesForMenuType/{Menu_TypeId}")]
        ////public async Task<IActionResult> GetFoodTypesForMenuType(int Menu_TypeId)
        ////{
        ////    try
        ////    {
        ////        var result = await _repository.GetFoodTypesForMenuTypeAsync(Menu_TypeId);

        ////        if (result == null) return NotFound("Course does not exist");

        ////        return Ok(result);
        ////    }
        ////    catch (Exception)
        ////    {
        ////        return StatusCode(500, "Internal Server Error. Please contact support");
        ////    }
        ////}


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
