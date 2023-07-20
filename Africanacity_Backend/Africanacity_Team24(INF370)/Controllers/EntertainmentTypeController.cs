using Microsoft.AspNetCore.Mvc;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.View_Models;
using Org.BouncyCastle.Bcpg.OpenPgp;
using Africanacity_Team24_INF370_.models.Administration;
using Org.BouncyCastle.Asn1.Mozilla;
using Africanacity_Team24_INF370_.models.Booking;

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainmentTypeController: ControllerBase
    {
        private readonly IRepository _Repository;

        public EntertainmentTypeController(IRepository Repository)
        {
            _Repository = Repository;
        }

        [HttpGet]
        [Route("GetEntertainmentTypes")]
        public async Task<ActionResult> GetEntertainmentTypes()
        {
            try
            {
                var results = await _Repository.GetEntertainmentTypesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error.Contact Support");
            }
        }

        [HttpGet]
        [Route("GetEntertainmentType/{Entertainment_TypeId}")]
        public async Task<IActionResult> GetEntertainmentTypeAsync(int Entertainment_TypeId)
        {
            try
            {
                var result = await _Repository.GetEntertainmentTypeAsync(Entertainment_TypeId);

                if (result == null) return NotFound("Entertainment Type does not exist. You need to create a new entertainment first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support");
            }
        }


        [HttpPost]
        [Route("AddEntertainmentType")]
        public async Task<IActionResult> AddEntertainmentType(EntertainmentViewModel tvm)
        {
            var Entertainment = new Entertainment_Type { Name = tvm.Name, Description = tvm.Description };

            try
            {
                _Repository.Add(Entertainment);
                await _Repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid operation");
            }

            return Ok(Entertainment);
        }

        [HttpPut]
        [Route("EditEntertainmentType/{Entertainment_TypeId}")]
        public async Task<ActionResult<EntertainmentViewModel>> EditEntertainmentType(int Entertainment_TypeId, EntertainmentViewModel viewModel)
        {
            try
            {
                var existingType = await _Repository.GetEntertainmentTypeAsync(Entertainment_TypeId);
                if (existingType == null) return NotFound($"The entertainment type does not exist");

                existingType.Name = viewModel.Name;
                existingType.Description = viewModel.Description;

                if (await _Repository.SaveChangesAsync())
                {
                    return Ok(existingType);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        [HttpDelete]
        [Route("DeleteEntertainmentType/{Entertainment_TypeId}")]
        public async Task<IActionResult> DeleteEntertainmentType(int Entertainment_TypeId)
        {
            try
            {
                var existingType = await _Repository.GetEntertainmentTypeAsync(Entertainment_TypeId);

                if (existingType == null) return NotFound($"The entertainment type does not exist");

                _Repository.Delete(existingType);

                if (await _Repository.SaveChangesAsync()) return Ok(existingType);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }


    }
}
