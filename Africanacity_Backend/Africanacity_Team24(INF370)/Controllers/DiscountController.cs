using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Components.Routing;
using Africanacity_Team24_INF370_.models;
using System.Reflection.Metadata.Ecma335;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;
using Africanacity_Team24_INF370_.models.Booking;
using Africanacity_Team24_INF370_.models.Administration;

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


        //Get all Discount amounts
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
        [Route("GetADiscountPercentage/{discountId}")]
        public async Task<IActionResult> GetADiscountPercentageAsync(int discountId)
        {
            try
            {
                var result = await _repository.GetADiscountPercentageAsync(discountId);

                if (result == null) return NotFound("Discount does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        //Add new discount

        [HttpPost]
        [Route("AddADiscountPercentage")]
        public async Task<IActionResult> AddADiscountPercentage(DiscountViewModel dvm)
        {
            var discountPercentage = new Discount { Name = dvm.Name, Description = dvm.Description, Amount = dvm.Amount,
            Start_Date = dvm.Start_Date, End_Date = dvm.End_Date};

            try
            {
                _repository.Add(discountPercentage);
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid operation");
            }

            return Ok(discountPercentage);
        }

        //Edit Discount
        [HttpPut]
        [Route("EditADiscountPercentage/{discountId}")]
        public async Task<ActionResult<DiscountViewModel>> EditADiscountPercentage(int discountId, DiscountViewModel viewModel)
        {
            try
            {
                var existingDiscount = await _repository.GetADiscountPercentageAsync(discountId);
                if (existingDiscount == null) return NotFound($"The discount percentage does not exist");

                existingDiscount.Name = viewModel.Name;
                existingDiscount.Description = viewModel.Description;
                existingDiscount.Amount = viewModel.Amount;
                existingDiscount.Start_Date = viewModel.Start_Date;
                existingDiscount.End_Date = viewModel.End_Date;

                if (await _repository.SaveChangesAsync())
                {
                    return Ok(existingDiscount);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
        //Delete Discount
        [HttpDelete]
        [Route("DeleteADiscountPercentage/{discountId}")]
        public async Task<IActionResult> DeleteADiscountPercentage(int discountId)
        {
            try
            {
                var existingDiscount = await _repository.GetADiscountPercentageAsync(discountId);

                if (existingDiscount == null) return NotFound($"The discount percentage does not exist");

                _repository.Delete(existingDiscount);

                if (await _repository.SaveChangesAsync()) return Ok(existingDiscount);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }



    }
}
