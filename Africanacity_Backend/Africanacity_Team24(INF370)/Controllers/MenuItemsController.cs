using Africanacity_Team24_INF370_.models;
using Microsoft.AspNetCore.Mvc;
using Africanacity_Team24_INF370_.models.Restraurant;


namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[menuItemscontroller]")]
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
        public async Task<IActionResult> GetMenuItemAsync(int MenuItemId)
        {
            try
            {
                var result = await _repository.GetMenuItemAsync(MenuItemId);

                if (result == null) return NotFound("Menu Item does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

    }
}
