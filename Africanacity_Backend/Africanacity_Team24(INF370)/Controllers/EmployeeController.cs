using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;
using Africanacity_Team24_INF370_.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;



namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IRepository _Repository;
        private readonly AppDbContext _appDBContext;

        public EmployeeController(IRepository Repository, AppDbContext context)
        {
            _Repository = Repository;
            _appDBContext = context;
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
        [HttpGet]
        public ActionResult<IEnumerable<Employee>> GetAllEmployees(string searchQuery)
        {
            var employeesQuery = _appDBContext.Employees.AsQueryable();

            if (!string.IsNullOrEmpty(searchQuery))
            {
                employeesQuery = employeesQuery.Where(e => e.FirstName.Contains(searchQuery));
            }

            var employees = employeesQuery.ToList();
            return Ok(employees);
        }

        // Get an employee via their EmployeeId

        [HttpGet]
        [Route("GetEmployee/{employeeId}")]
        public async Task<IActionResult> GetEmployeeAsync(int employeeId)
        {
            try
            {
                var result = await _Repository.GetEmployeeAsync(employeeId);

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
        public async Task<IActionResult> AddEmployee(EmployeeViewModel evm)
        {
            var employee = new Employee { FirstName = evm.FirstName, Surname = evm.Surname, Email_Address = evm.Email_Address, Physical_Address = evm.Physical_Address, PhoneNumber = evm.PhoneNumber };

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
        [Route("EditEmployee/{employeeId}")]
        public async Task<ActionResult<EmployeeViewModel>> EditEmployee(int employeeId, EmployeeViewModel evm)
        {
            try
            {
                var currentEmployee = await _Repository.GetEmployeeAsync(employeeId);
                if (currentEmployee == null) return NotFound($"The employee does not exist");

                currentEmployee.FirstName = evm.FirstName;
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
        [Route("DeleteEmployee/{employeeId}")]
        public async Task<IActionResult> DeleteEmployee(int employeeId)
        {
            try
            {
                var currentEmployee = await _Repository.GetEmployeeAsync(employeeId);

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
        //[HttpGet]
        //public IActionResult Get(string h, string filter)
        //{
        //    var query = _Repository.EmployeeViewModel.AsQueryable();

        //    // Apply search keyword filter
        //    if (!string.IsNullOrEmpty(h))
        //    {
        //        query = query.Where(x => x.Name.Contains(h));
        //    }

        //    // Apply additional filters based on your requirements
        //    if (!string.IsNullOrEmpty(filter))
        //    {
        //        query = query.Where(x => x.Category == filter);
        //    }

        //    // Perform sorting
        //    query = query.OrderBy(x => x.Name);

        //    var results = query.ToList();
        //    return Ok(results);
        //}
    }

    }



