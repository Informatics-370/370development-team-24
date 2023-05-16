using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.ViewModel;
using Microsoft.AspNetCore.Mvc;



namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IRepository _Repository;

        public EmployeeController(IRepository Repository)
        {
            _Repository = Repository;
        }

        [HttpGet]
        [Route("GetAllEmployees")]
        public async Task<IActionResult> GetAllEmployees()
        {
            try
            {
                var results = await _Repository.GetAllEmployeesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }

        }
        [HttpGet]
        [Route("GetEmployee/{EmployeeId}")]
        public async Task<IActionResult> GetEmployeeAsync(int EmployeeId)
        {
            try
            {
                var result = await _Repository.GetEmployeeAsync(EmployeeId);

                if (result == null) return NotFound("Course does not exist. You need to create it first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost]
        [Route("AddEmployee")]
        public async Task<IActionResult> AddEmployee(EmployeeViewModel evm)
        {
            var employee = new Employee { EmployeeId = evm.EmployeeId};

            try
            {
                _Repository.Add(employee);
                await _Repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }

            return Ok(employee);
        }


    }
}
