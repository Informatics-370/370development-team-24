using Africanacity_Team24_INF370_.models.Inventory;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.View_Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Africanacity_Team24_INF370_.Controllers
{

    [Route("api/[Controller]")]
    [ApiController]
    public class InventoryItemController : Controller
    {

        private readonly IRepository _Repository;
        private readonly AppDbContext _appDBContext;

        public InventoryItemController(IRepository Repository, AppDbContext context)
        {
            _Repository = Repository;
            _appDBContext = context;
        }


        // Get all inventory items, from the database

        [HttpGet]
        [Route("GetAllInventoryItems")]
        public async Task<IActionResult> GetAllInventoryItems()
        {
            try
            {
                var results = await _Repository.GetAllInventoryItemsAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }

        }

        [HttpGet]
        [Route("GetInventoryItem/{inventory_itemId}")]
        public async Task<IActionResult> GetInventoryItemAsync(int inventory_itemId)
        {
            try
            {
                var result = await _Repository.GetInventoryItemAsync(inventory_itemId);

                if (result == null) return NotFound("Inventory Item does not exist. You need to create an Inventory Item first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        // Add Inventory Item

        [HttpPost]
        [Route("AddInventoryItem")]
        public async Task<IActionResult> AddInventoryItem(InventoryViewModel ivm)
        {
            var inventory_item = new Inventory_Item { Name = ivm.Name, Description = ivm.Description };

            try
            {
                _Repository.Add(inventory_item);
                await _Repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // fix error message
                return BadRequest("Invalid Transaction");
            }

            return Ok(inventory_item);

        }

        //Update Inventory Item

        [HttpPut]
        [Route("EditInventoryItem/{inventory_ItemId}")]
        public async Task<ActionResult<InventoryViewModel>> EditSupplier(int inventory_itemId, InventoryViewModel ivm)
        {
            try
            {
                var currentInventoryItem = await _Repository.GetInventoryItemAsync(inventory_itemId);
                if (currentInventoryItem == null) return NotFound($"The inventory item does not exist");

                currentInventoryItem.Name = ivm.Name;
                currentInventoryItem.Description = ivm.Description;

                if (await _Repository.SaveChangesAsync())
                {
                    return Ok(currentInventoryItem);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        // Delete Supplier
        [HttpDelete]
        [Route("DeleteInventoryItem/{inventory_itemId}")]
        public async Task<IActionResult> DeleteInventoryItem(int inventory_itemId)
        {
            try
            {
                var currentInventoryItem = await _Repository.GetInventoryItemAsync(inventory_itemId);

                if (currentInventoryItem == null) return NotFound($"The inventory item does not exist");

                _Repository.Delete(currentInventoryItem);

                if (await _Repository.SaveChangesAsync()) return Ok(currentInventoryItem);

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<Inventory_Item>> Search(string searchTerm)
        {
            var Inventory_Item = _appDBContext.Inventory_Items
                .Where(n => n.Name.Contains(searchTerm))
                .ToList();

            return Ok(Inventory_Item);
        }



    }
}

