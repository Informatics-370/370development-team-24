using Microsoft.AspNetCore.Mvc;
using Africanacity_Team24_INF370_.models;
using Microsoft.AspNetCore.Http;


namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController
    {
        private readonly IRepository _repository;

        public ScheduleController(IRepository repository) 
        {
            _repository = repository;
        }

        [HttpGet]
        [Route("ScheduleDisplay")]
        public async Task<ActionResult> ScheduleDisplay()
        {
            try
            {
                var results = await _repository.GetScheduleAsync();

                dynamic schedule = results.Select(s => new
                {
                    s.ScheduleId,
                    s.Date,
                    s.Start_Time,
                    s.End_Time,
                    EventName = s.Event.Name,

                });
                return Ok(schedule);
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost]
        [Route("AddSchedule")]
        public async Task<IActionResult> AddSchedule()
        {

        }
    }
}
