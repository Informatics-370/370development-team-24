using Microsoft.AspNetCore.Mvc;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.View_Models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Booking;

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
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
        public async Task<ActionResult> GetAllEvents()
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
        [Route("GetEvent/{EventId}")]
        public async Task<IActionResult> GetEventAsync(int EventId)
        {
            try
            {
                var result = await _Repository.GetEventAsync(EventId);

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
            var NewEvent = new Event { Event_Name = evm.Event_Name, Description = evm.Description };
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
        [Route("EditEvent/{EventId}")]
        public async Task<ActionResult<EventViewModel>> EditEvent(int EventId, EventViewModel eventViewModel)
        {
            try
            {
                var existingEvent = await _Repository.GetEventAsync(EventId);
                if (existingEvent == null) return NotFound($"The event does not exist");

                
                existingEvent.Event_Name = eventViewModel.Event_Name;
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
        [Route("DeleteEvent/{EventId}")]
        public async Task<IActionResult> DeleteEvent(int EventId)
        {
            try
            {
                var existingEvent = await _Repository.GetEventAsync(EventId);

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
