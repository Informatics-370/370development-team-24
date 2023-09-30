using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Components.Routing;
using Africanacity_Team24_INF370_.models;
using System.Reflection.Metadata.Ecma335;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;
using Africanacity_Team24_INF370_.models.Administration;

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VatController : ControllerBase
    {
        private readonly IRepository _repository;

        public VatController(IRepository repository)
        {
            _repository = repository;
        }


        //Get all Vat amounts
        [HttpGet]
        [Route("GetAllVatPercentages")]
        public async Task<IActionResult> GetAllVatPercentages()
        {
            try
            {
                var vatPercentages = await _repository.GetAllVatPercentagesAsync();
                return Ok(vatPercentages);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet]
        [Route("GetAVatPercentage/{VatId}")]
        public async Task<IActionResult> GetAVatPercentageAsync(int vatId)
        {
            try
            {
                var result = await _repository.GetAVatPercentageAsync(vatId);

                if (result == null) return NotFound("VAT does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        //Create VAT Amount
        [HttpPost]
        [Route("AddAVatPercentage")]
        public async Task<IActionResult> AddAVatPercentage(VatViewModel vm)
        {
            var vatPercentage = new VAT
            {
                Amount = vm.Amount,
            };

            try
            {
                _repository.Add(vatPercentage);
                await _repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid operation");
            }

            return Ok(vatPercentage);
        }



    }
}
