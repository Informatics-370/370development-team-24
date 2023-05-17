using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;
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

        // Get all employees, from the database

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

        // Get an employee via their EmployeeId

        [HttpGet]
        [Route("GetEmployee/{EmployeeId}")]
        public async Task<IActionResult> GetEmployeeAsync(int EmployeeId)
        {
            try
            {
                var result = await _Repository.GetEmployeeAsync(EmployeeId);

                if (result == null) return NotFound("Employee does not exist. You need to create an employee first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        // Add Employee

        [HttpPost]
        [Route("AddEmployee")]
        public async Task<IActionResult> AddDrinkType(EmployeeViewModel evm)
        {
            var employee = new Employee { FirstName = evm.Name };

            try
            {
                _Repository.Add(employee);
                await _Repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // fix error message
                return BadRequest("Invalid Transaction");
            }

            return Ok(employee);
        }

        //Update Employee

        [HttpPut]
        [Route("EditEmployee/{EmployeeId}")]
        public async Task<ActionResult<EmployeeViewModel>> EditEmployee(int EmployeeId, EmployeeViewModel evm)
        {
            try
            {
                var currentEmployee = await _Repository.GetEmployeeAsync(EmployeeId);
                if (currentEmployee == null) return NotFound($"The emloyee does not exist");

                currentEmployee.EmployeeId = evm.EmployeeId;
                currentEmployee.FirstName = evm.Name;
                currentEmployee.Surname = evm.Surname;
                currentEmployee.Email_Address = evm.Email_Address;
                currentEmployee.PhoneNumber = evm.PhoneNumber;
                currentEmployee.Physical_Address = evm.Physical_Address;

                if (await _Repository.SaveChangesAsync())
                {
                    return Ok(currentEmployee);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        // Delete Employee
        [HttpDelete]
        [Route("DeleteEmployee/{EmployeeId}")]
        public async Task<IActionResult> DeleteCourse(int EmployeeId)
        {
            try
            {
                var currentEmployee = await _Repository.GetEmployeeAsync(EmployeeId);

                if (currentEmployee == null) return NotFound($"The employee does not exist");

                _Repository.Delete(currentEmployee);

                if (await _Repository.SaveChangesAsync()) return Ok(currentEmployee);

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

            // Search Filter
        //    [HttpGet]
        //    public async Task<ActionResult<IEnumerable<Employee>>> Get()
        //    {
        //        return await _context.Employee.ToListAsync();
        //    }

        //    // GET: api/YourController/search
        //    [HttpGet("search")]
        //    public async Task<ActionResult<IEnumerable<YourModel>>> Search(string searchTerm)
        //    {
        //        var filteredData = await _context.YourModels
        //            .Where(m => m.Name.Contains(searchTerm))
        //            .ToListAsync();

        //        return filteredData;
        //    }
        //}

    }

}

