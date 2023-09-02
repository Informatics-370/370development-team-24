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

    
        [HttpPost, DisableRequestSizeLimit]
        [Route("AddNewEvent")]
        public async Task<IActionResult> AddNewEvent([FromForm] IFormCollection formData)
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();

                var file = formCollection.Files.First();

                if (file.Length > 0)
                {

                    using (var ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        string base64 = Convert.ToBase64String(fileBytes);


                        var bookingevent = new Event
                        {
                            Name = formData["name"]
                            ,
                            Description = formData["description"]
                            ,
                            Date = formData["date"]
                            ,
                            Image = base64
                        };


                        _Repository.Add(bookingevent);
                        await _Repository.SaveChangesAsync();
                    }

                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        [HttpPut]
        [Route("EditEvent/{eventId}")]
        public async Task<IActionResult> EditEvent(int eventId, [FromForm] IFormCollection formData)
        {
            try
            {
                var existingBookingEvent = await _Repository.GetEventAsync(eventId);

                if (existingBookingEvent == null)
                {
                    return NotFound($"The booking with ID {eventId} does not exist");
                }

                // Update event properties from the form data
                existingBookingEvent.Name = formData["name"];
                existingBookingEvent.Date = formData["date"];
                existingBookingEvent.Description = formData["description"];

                // Check if a new cover image was uploaded
                var file = formData.Files.FirstOrDefault();
                if (file != null && file.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        string base64 = Convert.ToBase64String(fileBytes);
                        existingBookingEvent.Image = base64;
                    }
                }

                // Save changes to the repository
                if (await _Repository.SaveChangesAsync())
                {
                    return Ok(existingBookingEvent);
                }
                else
                {
                    // Return an appropriate response when changes are not saved
                    return StatusCode(500, "Failed to save changes to the repository.");
                }
            }
            catch (Exception ex)
            {
                // Return an appropriate response for the exception case
                return StatusCode(500, $"Internal server error: {ex}");
            }
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
