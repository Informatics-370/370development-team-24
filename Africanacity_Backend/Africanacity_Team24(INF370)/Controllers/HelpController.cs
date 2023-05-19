using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Admin;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.View_Models;
using Africanacity_Team24_INF370_.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace Africanacity_Team24_INF370_.Controllers
{

    [Route("api/Help")]
    [ApiController]
    public class HelpController : ControllerBase
    {

        private readonly IRepository _Repository;

        public HelpController(IRepository Repository)
        {
            _Repository = Repository;
        }

        // Get all Help Q&A's, from the database

        [HttpGet]
        [Route("GetAllHelp")]
        public async Task<IActionResult> GetAllHelp()
        {
            try
            {
                var results = await _Repository.GetAllHelpAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }

        }

        // Get a help Q&A via their HelpId

        [HttpGet]
        [Route("GetHelp/{HelpId}")]
        public async Task<IActionResult> GetHelpAsync(int helpId)
        {
            try
            {
                var result = await _Repository.GetHelpAsync(helpId);

                if (result == null) return NotFound("Employee does not exist. You need to create an employee first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        // Add Help Q&A

        [HttpPost]
        [Route("AddHelp")]
        public async Task<IActionResult> AddHelp(HelpViewModel hvm)
        {
            var help = new Help {Name = hvm.Name, Description = hvm.Description };

            try
            {
                _Repository.Add(help);
                await _Repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // fix error message
                return BadRequest("Invalid Transaction");
            }

            return Ok(help);
        }

        //Update Help

        [HttpPut]
        [Route("EditHelp/{HelpId}")]
        public async Task<ActionResult<HelpViewModel>> EditHelp(int helpId, HelpViewModel hvm)
        {
            try
            {
                var currentHelp = await _Repository.GetHelpAsync(helpId);
                if (currentHelp == null) return NotFound($"The Help does not exist");

                currentHelp.Name = hvm.Name;
                currentHelp.Description = hvm.Description;  

                if (await _Repository.SaveChangesAsync())
                {
                    return Ok(currentHelp);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        // Delete Help
        [HttpDelete]
        [Route("DeleteHelp/{HelpId}")]
        public async Task<IActionResult> DeleteHelp(int helpId)
        {
            try
            {
                var currentHelp = await _Repository.GetHelpAsync(helpId);

                if (currentHelp == null) return NotFound($"The Help Q&A does not exist");

                _Repository.Delete(currentHelp);

                if (await _Repository.SaveChangesAsync()) return Ok(currentHelp);

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
    }
}
