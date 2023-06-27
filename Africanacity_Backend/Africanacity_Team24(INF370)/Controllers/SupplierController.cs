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
    public class SupplierController : Controller
    {

            private readonly IRepository _Repository;
            private readonly AppDbContext _appDBContext;

            public SupplierController(IRepository Repository, AppDbContext context)
            {
                _Repository = Repository;
                _appDBContext = context;
            }


            // Get all suppliers, from the database

            [HttpGet]
            [Route("GetAllSuppliers")]
            public async Task<IActionResult> GetAllSuppliers()
            {
                try
                {
                    var results = await _Repository.GetAllSuppliersAsync();
                    return Ok(results);
                }
                catch (Exception)
                {
                    return StatusCode(500, "Internal Server Error. Please contact support.");
                }

            }

            [HttpGet]
            [Route("GetSupplier/{supplierId}")]
            public async Task<IActionResult> GetSupplierAsync(int supplierId)
            {
                try
                {
                    var result = await _Repository.GetSupplierAsync(supplierId);

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
            [Route("AddSupplier")]
            public async Task<IActionResult> AddSupplier(SupplierViewModel svm)
            {
                var supplier = new Employee { FirstName = svm.FirstName, Surname = evm.Surname, Email_Address = evm.Email_Address, Physical_Address = evm.Physical_Address, PhoneNumber = evm.PhoneNumber };

                try
                {
                    _Repository.Add(supplier);
                    await _Repository.SaveChangesAsync();
                }
                catch (Exception)
                {
                    // fix error message
                    return BadRequest("Invalid Transaction");
                }

                return Ok(supplier);

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

      
    }

