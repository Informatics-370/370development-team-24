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
    public class MenuItem_PriceController : ControllerBase
    {
        private readonly IRepository _repository;

        public MenuItem_PriceController(IRepository repository)
        {
            _repository = repository;
        }

        //Get menu items'prices
        [HttpGet]
        [Route("GetAllMenuItemPrices")]
        public async Task<IActionResult> GetAllMenuItemPrices()
        {
            try
            {
                var menuItemPrices = await _repository.GetAllMenuItemPricesAsync();
                return Ok(menuItemPrices);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        //get a specific menu item's price
        [HttpGet]
        [Route("GetAMenuItemPrice/{MenuItem_PriceId}")]
        public async Task<IActionResult> GetAMenuItemPriceAsync(int MenuItem_PriceId)
        {
            try
            {
                var result = await _repository.GetAMenuItemPriceAsync(MenuItem_PriceId);

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
        [Route("AddMenuItemPrice")]
        public async Task<IActionResult> AddMenuItemPrice(MenuItemPriceViewModel menuItemPriceViewModel)
        {
            var menuItemPrice = new MenuItem_Price { Amount = menuItemPriceViewModel.Amount};

            try
            {
                _repository.Add(menuItemPrice);
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }

            return Ok(menuItemPrice);
        }

        //Update
        [HttpPut]
        [Route("EditMenuItemPrice/{MenuItem_PriceId}")]
        public async Task<ActionResult<MenuItemPriceViewModel>> EditMenuItemPrice (int MenuItem_PriceId, MenuItemPriceViewModel menuItemPriceViewModel)
        {
            try
            {
                var existingMenuItemPrice = await _repository.GetAMenuItemPriceAsync(MenuItem_PriceId);
                if (existingMenuItemPrice == null) return NotFound($"The course does not exist");

               existingMenuItemPrice.Amount = menuItemPriceViewModel.Amount;



                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingMenuItemPrice);
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
        [Route("DeleteMenuItemPrice/{MenuItem_PriceId}")]
        public async Task<IActionResult> DeleteMenuItemPrice(int MenuItem_PriceId)
        {
            try
            {
                var existingMenuItemPrice = await _repository.GetAMenuItemPriceAsync(MenuItem_PriceId);

                if (existingMenuItemPrice == null) return NotFound($"The course does not exist");

                _repository.Delete(existingMenuItemPrice);

                if (await _repository.SaveChangesAsync()) return Ok(existingMenuItemPrice);

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
    }
}
