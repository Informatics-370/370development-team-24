using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;
using Africanacity_Team24_INF370_.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Text.RegularExpressions;
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


                dynamic employees = results.Select(e => new
                {
                    e.EmployeeId,

                    e.Surname,

                    e.FirstName,

                    EmployeeRoleName = e.Employee_Role.Name,

                    e.PhoneNumber,

                    e.Email_Address,

                    e.Physical_Address

                });

                return Ok(employees);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }

        }
   
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
            var employee = new Employee
            {
                Surname = evm.Surname,
                FirstName = evm.FirstName,
                Employee_RoleId = Convert.ToInt32(evm.EmployeeRole),
                Email_Address = evm.Email_Address,
                PhoneNumber = evm.PhoneNumber,
                Physical_Address = evm.Physical_Address
            };

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
        public async Task<ActionResult<EmployeeViewModel>> EditSupplier(int employeeId, EmployeeViewModel svm)
        {
            try
            {
                var currentEmployee = await _Repository.GetEmployeeAsync(employeeId);
                if (currentEmployee == null) return NotFound($"The supplier does not exist");

                currentEmployee.Surname = svm.Surname;
                currentEmployee.FirstName = svm.FirstName;
                currentEmployee.Email_Address = svm.Email_Address;
                currentEmployee.Employee_RoleId = Convert.ToInt32(svm.EmployeeRole);
                currentEmployee.PhoneNumber = svm.PhoneNumber;
                currentEmployee.Physical_Address = svm.Physical_Address;

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

        [HttpGet("search")]
        public ActionResult<IEnumerable<Employee>> Search(string searchTerm)
        {
            var Employee = _appDBContext.Employees
                .Where(f => f.FirstName.Contains(searchTerm))
                .ToList();

            return Ok(Employee);
        }

        //Email Verification

        [HttpPost]
        public IActionResult CheckEmail([FromBody] Emails emailModel)
        {
            string emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

            if (Regex.IsMatch(emailModel.Email, emailPattern))
            {
                return Ok(new { message = "Email matches the pattern." });
            }
            else
            {
                return BadRequest(new { message = "Invalid email format." });
            }
        }

    }

    public class Emails
    {
        public string Email { get; set; }
    }
}



