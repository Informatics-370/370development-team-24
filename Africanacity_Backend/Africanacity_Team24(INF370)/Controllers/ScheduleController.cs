using Microsoft.AspNetCore.Mvc;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Booking;
using Africanacity_Team24_INF370_.View_Models;


namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[Controller]")]
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
        public async Task<IActionResult> ScheduleDisplay()
        {
            try
            {
                var results = await _Repository.ScheduleDisplayAsync();

                dynamic schedule = results.Select(s => new
                {
                    s.ScheduleId,

                    s.Date,

                    s.Title,

                    s.Description,

                    s.Start_Time,

                    s.End_Time,

                    EventName = s.Event.Name

                });
                return Ok(schedule);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support");
            }
        }

        //[HttpGet]
        //[Route("ScheduleDisplay")]
        //public async Task<IActionResult> ScheduleDisplay()
        //{
        //    try
        //    {
        //        var results = await _Repository.ScheduleDisplayAsync();
        //        return Ok(results);
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(500, "Internal Server Error. Please contact support.");
        //    }
        //}

        [HttpGet]
        [Route("GetSchedule/{scheduleId}")]
        public async Task<IActionResult> GetScheduleAsync(int scheduleId)
        {
            try
            {
                var result = await _Repository.GetScheduleAsync(scheduleId);

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
        

            var schedule = new Schedule { 
                Title = svm.Title, 
                Description = svm.Description, 
                Date = svm.Date,
                Start_Time = svm.Start_Time, 
                End_Time = svm.End_Time, 
                EventId = Convert.ToInt32(svm.Event)
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
        [Route("EditSchedule/{scheduleId}")]
        public async Task<ActionResult<ScheduleViewModel>> EditSchedule(int scheduleId, ScheduleViewModel viewModel)
        {
            try
            {
                var existingSchedule = await _Repository.GetScheduleAsync(scheduleId);
                if(existingSchedule != null)
                {
                    existingSchedule.Title = viewModel.Title;
                    existingSchedule.Date = viewModel.Date;
                    existingSchedule.Start_Time = viewModel.Start_Time;
                    existingSchedule.End_Time = viewModel.End_Time;
                    existingSchedule.Description = viewModel.Description;
                    //existingSchedule.EventId = viewModel.Event;

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
        [Route("RemoveSchedule/{scheduleId}")]
        public async Task<IActionResult> RemoveSchedule(int scheduleId)
        {
            try
            {
                var existingSchedule = await _Repository.GetScheduleAsync(scheduleId);
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
