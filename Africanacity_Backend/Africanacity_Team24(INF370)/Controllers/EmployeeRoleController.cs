using Africanacity_Team24_INF370_.models;
using Microsoft.AspNetCore.Mvc;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.ViewModel;
using Africanacity_Team24_INF370_.View_Models;

namespace Africanacity_Team24_INF370_.Controllers
{
        [Route("api/[Controller]")]
        [ApiController]
      public class EmployeeRoleController : ControllerBase
      {
            private readonly IRepository _Repository;

            public EmployeeRoleController(IRepository Repository)
            {
                _Repository = Repository;
            }
             // read all employee roles in database
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
            // read employee role via employee_roleId
            [HttpGet]
            [Route("GetEmployeeRole/{employee_RoleId}")]
            public async Task<IActionResult> GetEmployeeRoleAsync(int employee_RoleId)
            {
                try
                {
                    var result = await _Repository.GetEmployeeRoleAsync(employee_RoleId);

                    if (result == null) return NotFound("Employee Role does not exist. You need to create a new employee role first");

                    return Ok(result);
                }
                catch (Exception)
                {
                    return StatusCode(500, "Internal Server Error. Please contact support");
                }
            }

           // create employee role
           [HttpPost]
           [Route("AddEmployeeRole")]
           public async Task<IActionResult> AddEmployeeRole(EmployeeRoleViewModel cvm)
           {
             var EmployeeRole = new Employee_Role { Name = cvm.Name, Description = cvm.Description };

             try
             {
                _Repository.Add(EmployeeRole);
                await _Repository.SaveChangesAsync();
             }
             catch (Exception)
             {
                return BadRequest("Invalid operation");
             }

              return Ok(EmployeeRole);
           }
            // update employee role
           [HttpPut]
           [Route("EditEmployeeRole/{employee_RoleId}")]
           public async Task<ActionResult<EmployeeRoleViewModel>> EditEmployeeRole(int employee_RoleId, EmployeeRoleViewModel employeeRoleModel)
           {
              try
              {
                var existingEmployeeRole = await _Repository.GetEmployeeRoleAsync(employee_RoleId);
                if (existingEmployeeRole == null) return NotFound($"The employee role does not exist");

                //existingEmployeeRole.Employee_RoleId = employeeRoleModel.Employee_RoleId;
                existingEmployeeRole.Name = employeeRoleModel.Name;
                existingEmployeeRole.Description = employeeRoleModel.Description;

                if (await _Repository.SaveChangesAsync())
                {
                    return Ok(existingEmployeeRole);
                }
              }
             catch (Exception)
              {
                return StatusCode(500, "Internal Server Error. Please contact support.");
              }
             return BadRequest("Your request is invalid.");
           }

            //Delete Employee role
            [HttpDelete]
            [Route("DeleteEmployeeRole/{employee_RoleId}")]
            public async Task<IActionResult> DeleteEmployeeRole(int employee_RoleId)
            {
                try
                {
                  var existingEmployeeRole = await _Repository.GetEmployeeRoleAsync(employee_RoleId);

                  if (existingEmployeeRole == null) return NotFound($"The employee role does not exist");

                   _Repository.Delete(existingEmployeeRole);

                   if (await _Repository.SaveChangesAsync()) return Ok(existingEmployeeRole);

                }
                catch (Exception)
                {
                   return StatusCode(500, "Internal Server Error. Please contact support.");
                }
                return BadRequest("Your request is invalid.");
            }





      }

}
