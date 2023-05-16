using Africanacity_Team24_INF370_.models;
using Microsoft.AspNetCore.Mvc;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.ViewModel;

namespace Africanacity_Team24_INF370_.Controllers
{
        [Route("api/[controller]")]
        [ApiController]
        public class EmployeeRoleController : ControllerBase
        {
            private readonly IRepository _Repository;

            public EmployeeRoleController(IRepository Repository)
            {
                _Repository = Repository;
            }

            [HttpGet]
            [Route("GetAllEmployeeRoles")]
            public async Task<IActionResult> GetAllEmployeeRoles()
            {
                try
                {
                    var results = await _Repository.GetAllEmployeeRolesAsync();
                    return Ok(results);
                }
                catch (Exception)
                {
                    return StatusCode(500, "Internal Server Error. Please contact support.");
                }
            }

            [HttpGet]
            [Route("GetEmployeeRole/{Employee_RoleId}")]
            public async Task<IActionResult> GetEmployeeRoleAsync(int Employee_RoleId)
            {
                try
                {
                    var result = await _Repository.GetEmployeeRoleAsync(Employee_RoleId);

                    if (result == null) return NotFound("Employee Role does not exist. You need to create it first");

                    return Ok(result);
                }
                catch (Exception)
                {
                    return StatusCode(500, "Internal Server Error. Please contact support");
                }
            }

           [HttpPost]
           [Route("AddEmployeeRole")]
           public async Task<IActionResult> AddEmployeeRole(EmployeeRoleViewModel cvm)
           {
             var Employee_Role = new Employee_Role { Employee_RoleId = cvm, Name = cvm.Name, Description = cvm.Description };

             try
             {
                _Repository.Add(Employee_Role);
                await _Repository.SaveChangesAsync();
             }
             catch (Exception)
             {
                return BadRequest("Invalid operation");
             }

              return Ok(Employee_Role);
           }
           
           






        }

}
