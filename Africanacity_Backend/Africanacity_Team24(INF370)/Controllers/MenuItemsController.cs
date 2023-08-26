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


namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemsController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly AppDbContext _appDbContext;
        public MenuItemsController(IRepository repository, AppDbContext appDbContext)
        {
            _repository = repository;
            _appDbContext = appDbContext;
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
                var result = await _repository.GetMenuItemAsync(MenuItemId);

                if (result == null)
                {
                    return NotFound(); // Return 404 if the menu item is not found
                }

                var menuItem = new
                {
                    result.MenuItemId,
                    result.Name,
                    result.Description,
                    MenuTypeName = result.Menu_Type.Name,
                    FoodTypeName = result.Food_Type.Name,
                    MenuCategoryName = result.MenuItem_Category.Name,
                    
                };

                return Ok(menuItem);
            }
           
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }

            
        }

        //get the prices
        [HttpGet]
        [Route("GetMenuItemPrice/{MenuItemId}")]
        public IActionResult GetMenuItemPrice(int MenuItemId)
        {
            try
            {
                var price = _appDbContext.MenuItem_Prices
                    .Where(price => price.MenuItemId == MenuItemId)
                    .FirstOrDefault()?.Amount;

                if (price != null)
                {
                    return Ok(new { price });
                }
                else
                {
                    return NotFound("Price not found for the given inventory item.");
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
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

  
            //to add to menu item table
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

                // Create the MenuItem_Price instance
                var menuItemPrice = new MenuItem_Price
                {
                    MenuItemId = menuItem.MenuItemId,
                    Amount = Convert.ToDecimal(formData["amount"])
                    
                };

                _repository.Add(menuItemPrice);
                await _repository.SaveChangesAsync();

            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }
            
            
            return Ok(menuItem);
        }





        //[HttpPut]
        //    [Route("EditMenuItem/{MenuItemId}")]
        //    public async Task<ActionResult<MenuItemViewModel>> EditMenuItem(int MenuItemId, [FromBody] MenuItemViewModel menuItemViewModel)
        //    {
        //        try
        //        {
        //            var existingMeal = await _repository.GetMenuItemAsync(MenuItemId);
        //            if (existingMeal == null) return NotFound($"The menu item does not exist");

        //            existingMeal.Name = menuItemViewModel.Name;
        //            existingMeal.Description = menuItemViewModel.Description;
        //            existingMeal.Menu_TypeId = menuItemViewModel.MenuTypeId;
        //            existingMeal.FoodTypeId = menuItemViewModel.FoodTypeId;
        //            existingMeal.Menu_CategoryId = menuItemViewModel.MenuCategoryId;



        //            if (await _repository.SaveChangesAsync())
        //            {
        //                return Ok(existingMeal);
        //            }
        //        }
        //        catch (Exception)
        //        {
        //            return StatusCode(500, "Internal Server Error. Please contact support.");
        //        }
        //        return BadRequest("Your request is invalid.");
        //    }




        //edit menu item with price attribute
        [HttpPut]
        [Route("EditMenuItemWithPrice/{MenuItemId}")]
        
        public async Task<IActionResult> EditMenuItemWithPrice(int menuItemId, [FromBody] MenuItem updatedMenuItem)
        {
            if (menuItemId != updatedMenuItem.MenuItemId)
            {
                return BadRequest();
            }

            try
            {
                // Retrieve the existing menu item with related data
                var existingMenuItem = await _repository.GetMenuItemAsync(menuItemId);

                if (existingMenuItem == null)
                {
                    return NotFound();
                }

                // Update the properties of the existing menu item
                existingMenuItem.Name = updatedMenuItem.Name;
                existingMenuItem.Description = updatedMenuItem.Description;

                // Update the related data
                existingMenuItem.Menu_Type = await _repository.GetMenuTypeAsync(updatedMenuItem.Menu_TypeId);
                existingMenuItem.Food_Type = await _repository.GetFoodTypeAsync(updatedMenuItem.FoodTypeId);
                existingMenuItem.MenuItem_Category = await _repository.GetMenuItemCategoryAsync(updatedMenuItem.Menu_CategoryId);
                


                //prices
                foreach (var price in updatedMenuItem.MenuItem_Prices)
                {
                    // Update the prices for the existing menu item
                    var existingPrice = existingMenuItem.MenuItem_Prices.FirstOrDefault(p => p.MenuItem_PriceId == price.MenuItem_PriceId);

                    if (existingPrice != null)
                    {
                        existingPrice.Amount = price.Amount;
                    }
                }

                // Save changes to the database
                await _repository.SaveChangesAsync();

                return Ok();
            }
            catch (Exception)
            {
                // Handle exceptions appropriately
                return StatusCode(500, "Internal server error");
            }
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
