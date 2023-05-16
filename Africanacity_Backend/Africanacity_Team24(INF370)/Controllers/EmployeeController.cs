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

                if (result == null) return NotFound("Course does not exist. You need to create it first");

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
        public async Task<IActionResult> AddEmployee(EmployeeViewModel evm)
        {
            var employee = new Employee { EmployeeId = evm.EmployeeId, FirstName = evm.Name, Surname = evm.Surname, Email_Address = evm.Email_Address, PhoneNumber = evm.PhoneNumber, Physical_Address = evm.Physical_Address };

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
        //Update Employee

        [HttpPut]
        [Route("UpdateEmployee/{EmployeeId}")]
        public async Task<ActionResult<EmployeeViewModel>> EditCourse(int EmployeeId, EmployeeViewModel employeeModel)
        {
            try
            {
                var currentEmployee = await _Repository.GetEmployeeAsync(EmployeeId);
                if (currentEmployee == null) return NotFound($"The course does not exist");

                currentEmployee.EmployeeId = employeeModel.EmployeeId;
                currentEmployee.FirstName = employeeModel.Name;
                currentEmployee.Surname = employeeModel.Surname;
                currentEmployee.Email_Address = employeeModel.Email_Address;
                currentEmployee.PhoneNumber = employeeModel.PhoneNumber;
                currentEmployee.Physical_Address = employeeModel.Physical_Address;

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

                if (currentEmployee == null) return NotFound($"The course does not exist");

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

