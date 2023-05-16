using Africanacity_Team24_INF370_.models;
using Microsoft.AspNetCore.Mvc;

namespace Africanacity_Team24_INF370_.Controllers
{
    public class EmployeeRole : Controller
    {
        [Route("api/[controller]")]
        [ApiController]
        public class EmployeeRoleController : Controller
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
                    var results = await _Repository.GetAllEmployeesAsync();
                    return Ok(results);
                }
                catch (Exception)
                {
                    return StatusCode(500, "Internal Server Error. Please contact support.");
                }
            }

        }
    }
}
