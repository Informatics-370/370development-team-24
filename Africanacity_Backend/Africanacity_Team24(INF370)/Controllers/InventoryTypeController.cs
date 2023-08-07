using Africanacity_Team24_INF370_.models.Inventory;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.View_Models;
using Microsoft.AspNetCore.Mvc;

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class InventoryTypeController : Controller
    {
        private readonly IRepository _Repository;
        private readonly AppDbContext _appDBContext;

        public InventoryTypeController(IRepository Repository, AppDbContext context)
        {
            _Repository = Repository;
            _appDBContext = context;
        }


        // Get all inventory types, from the database

        [HttpGet]
        [Route("GetAllInventoryTypes")]
        public async Task<IActionResult> GetAllInventoryTypes()
        {
            try
            {
                var results = await _Repository.GetAllInventoryTypesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }

        }

        [HttpGet]
        [Route("GetInventoryType/{inventory_TypeId}")]
        public async Task<IActionResult> GetInventoryTypeAsync(int inventory_TypeId)
        {
            try
            {
                var result = await _Repository.GetInventoryTypeAsync(inventory_TypeId);

                if (result == null) return NotFound("Inventory Type does not exist. You need to create an Inventory Type first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        // Add InventoryType

        [HttpPost]
        [Route("AddInventoryType")]
        public async Task<IActionResult> AddInventoryType(InventoryTypeViewModel itvm)
        {
            var inventoryytype = new Inventory_Type { Name = itvm.Name, Description = itvm.Description };

            try
            {
                _Repository.Add(inventoryytype);
                await _Repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // fix error message
                return BadRequest("Invalid Transaction");
            }

            return Ok(inventoryytype);

        }

        //Update InventoryType

        [HttpPut]
        [Route("EditInvetroyType/{inventory_TypeId}")]
        public async Task<ActionResult<InventoryTypeViewModel>> EditInventoryType(int inventory_TypeId, InventoryTypeViewModel itvm)
        {
            try
            {
                var currentInventoryType = await _Repository.GetInventoryTypeAsync(inventory_TypeId);
                if (currentInventoryType == null) return NotFound($"The inventory type does not exist");

                currentInventoryType.Name = itvm.Name;
                currentInventoryType.Description = itvm.Description;

                if (await _Repository.SaveChangesAsync())
                {
                    return Ok(currentInventoryType);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        // Delete InventoryType
        [HttpDelete]
        [Route("DeleteInventoryType/{inventory_TypeId}")]
        public async Task<IActionResult> DeleteSupplierType(int inventory_TypeId)
        {
            try
            {
                var currentInventoryType = await _Repository.GetInventoryTypeAsync(inventory_TypeId);

                if (currentInventoryType == null) return NotFound($"The inventory type does not exist");

                _Repository.Delete(currentInventoryType);

                if (await _Repository.SaveChangesAsync()) return Ok(currentInventoryType);

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }


    }

}

