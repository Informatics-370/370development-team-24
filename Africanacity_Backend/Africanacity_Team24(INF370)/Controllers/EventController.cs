using Microsoft.AspNetCore.Mvc;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.View_Models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Booking;

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class EventController: ControllerBase
    {
        private readonly IRepository _Repository;

        public EventController(IRepository Repository)
        {
            _Repository = Repository;
        }

        [HttpGet]
        [Route("GetAllEvents")]
        public async Task<IActionResult> GetAllEvents()
        {
            try
            {
                var results = await _Repository.GetAllEventsAsync();
                return Ok(results);
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error.Contact Support");
            }
        }

        [HttpGet]
        [Route("GetEvent/{eventId}")]
        public async Task<IActionResult> GetEventAsync(int eventId)
        {
            try
            {
                var result = await _Repository.GetEventAsync(eventId);

                if (result == null) return NotFound("This Event does not exist. You need to create a new event.");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost]
        [Route("AddNewEvent")]
        public async Task<IActionResult> AddNewEvent(EventViewModel evm)
        {
            var NewEvent = new Event { Name = evm.Name, Description = evm.Description };
            try
            {
                _Repository.Add(NewEvent);
                await _Repository.SaveChangesAsync();
            }
            catch(Exception)
            {
                return BadRequest("Invalid Operation");
            }
            return Ok(NewEvent);
        }


        [HttpPut]
        [Route("EditEvent/{eventId}")]
        public async Task<ActionResult<EventViewModel>> EditEvent(int eventId, EventViewModel eventViewModel)
        {
            try
            {
                var existingEvent = await _Repository.GetEventAsync(eventId);
                if (existingEvent == null) return NotFound($"The event does not exist");

                
                existingEvent.Name = eventViewModel.Name;
                existingEvent.Description = eventViewModel.Description;

                if (await _Repository.SaveChangesAsync())
                {
                    return Ok(existingEvent);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        [HttpDelete]
        [Route("DeleteEvent/{eventId}")]
        public async Task<IActionResult> DeleteEvent(int eventId)
        {
            try
            {
                var existingEvent = await _Repository.GetEventAsync(eventId);

                if (existingEvent == null) return NotFound($"The event does not exist");

                _Repository.Delete(existingEvent);

                if (await _Repository.SaveChangesAsync()) return Ok(existingEvent);

            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
    }
}
