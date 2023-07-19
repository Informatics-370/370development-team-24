using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Inventory;
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
        public async Task<ActionResult> GetAllEmployees()
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
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
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
        public async Task<ActionResult<EmployeeViewModel>> EditEmployee(int employeeId, EmployeeViewModel evm)
        {
            try
            {
                var currentEmpoyee = await _Repository.GetEmployeeAsync(employeeId);
                if (currentEmpoyee == null) return NotFound($"The employee does not exist");

                currentEmpoyee.Surname = evm.Surname;
                currentEmpoyee.FirstName = evm.FirstName;
                currentEmpoyee.Email_Address = evm.Email_Address;
                currentEmpoyee.Employee_RoleId = Convert.ToInt32(evm.EmployeeRole);
                currentEmpoyee.PhoneNumber = evm.PhoneNumber;
                currentEmpoyee.Physical_Address = evm.Physical_Address;

                if (await _Repository.SaveChangesAsync())
                {
                    return Ok(currentEmpoyee);
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

    }
}



