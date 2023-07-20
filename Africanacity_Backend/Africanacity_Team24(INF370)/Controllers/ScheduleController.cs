using Microsoft.AspNetCore.Mvc;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.View_Models;


namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IRepository _Repository;

        public ScheduleController(IRepository Repository) 
        {
            _Repository = Repository;
        }

        [HttpGet]
        [Route("ScheduleDisplay")]
        public async Task<ActionResult> ScheduleDisplay()
        {
            try
            {
                var results = await _Repository.ScheduleDisplayAsync();

                dynamic schedule = results.Select(s => new
                {
                    s.ScheduleId,
                    s.Date,
                    s.Start_Time,
                    s.End_Time,
                    EventName = s.Event.Event_Name,

                });
                return  Ok(schedule);
            }
            catch(Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support");
            }
        }

        [HttpGet]
        [Route("GetSchedule/{ScheduleId}")]
        public async Task<IActionResult> GetScheduleAsync(int ScheduleId)
        {
            try
            {
                var result = await _Repository.GetScheduleAsync(ScheduleId);

                if (result == null) return NotFound("Schedule does not exist.");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost]
        [Route("AddSchedule")]
        public async Task<IActionResult> AddSchedule(ScheduleViewModel svm)
        {
            var schedule = new ScheduleViewModel { 
                Date = svm.Date , Start_Time = svm.Start_Time, End_Time = svm.End_Time
            }; 
            try
            {
                _Repository.Add(schedule);
                await _Repository.SaveChangesAsync();
            }
            catch(Exception)
            {
                return BadRequest("Invalid Operation");
            }

            return Ok(schedule);
        }

        [HttpPut]
        [Route("EditSchedule/{ScheduleId}")]
        public async Task<ActionResult<ScheduleViewModel>> EditSchedule(int ScheduleId, ScheduleViewModel viewModel)
        {
            try
            {
                var existingSchedule = await _Repository.GetScheduleAsync(ScheduleId);
                if(existingSchedule != null)
                {
                    existingSchedule.Date = viewModel.Date;
                    existingSchedule.Start_Time = viewModel.Start_Time;
                    existingSchedule.End_Time = viewModel.End_Time;

                   if (await _Repository.SaveChangesAsync())
                   {
                        return Ok(existingSchedule);
                   }
                }

            }
            catch(Exception)
            {
                return StatusCode(500, "Internal Server Error. Please Contact Support");
            }

            return BadRequest("Invalid operation");
        }

        [HttpDelete]
        [Route("RemoveSchedule/{ScheduleId}")]
        public async Task<IActionResult> RemoveSchedule(int ScheduleId)
        {
            try
            {
                var existingSchedule = await _Repository.GetScheduleAsync(ScheduleId);
                if (existingSchedule == null) return NotFound($"Schedule Does not exist");
                _Repository.Delete(existingSchedule);

                if (await _Repository.SaveChangesAsync()) return Ok(existingSchedule);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please Contact support.");
            }
            return  BadRequest("Invalid Request");
        }
    }

}
