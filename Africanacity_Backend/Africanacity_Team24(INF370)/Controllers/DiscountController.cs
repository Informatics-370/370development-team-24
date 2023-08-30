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
    public class DiscountController : ControllerBase
    {
        private readonly IRepository _repository;

        public DiscountController(IRepository repository)
        {
            _repository = repository;
        }


        //Get all Vat amounts
        [HttpGet]
        [Route("GetAllDiscountPercentages")]
        public async Task<IActionResult> GetAllDiscountPercentages()
        {
            try
            {
                var discountPercentages = await _repository.GetAllDiscountPercentagesAsync();
                return Ok(discountPercentages);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet]
        [Route("GetADiscountPercentage/{DiscountId}")]
        public async Task<IActionResult> GetADiscountPercentageAsync(int DiscountId)
        {
            try
            {
                var result = await _repository.GetADiscountPercentageAsync(DiscountId);

                if (result == null) return NotFound("Course does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }




    }
}
