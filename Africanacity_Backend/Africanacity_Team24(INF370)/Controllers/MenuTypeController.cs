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
    }
}
