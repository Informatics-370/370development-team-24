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
        public async Task<ActionResult> GetAllInventoryItems()
        {
            try
            {

                var results = await _Repository.GetAllInventoryItemsAsync();


                dynamic inventoryitems = results.Select(i => new
                {
                    i.Inventory_ItemId,

                    i.ItemName,

                    InventoryTypeName = i.Inventory_Type.Name,

                    i.Description

                });

                return Ok(inventoryitems);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet]
        [Route("GetInventoryItem/{inventory_ItemId}")]
        public async Task<IActionResult> GetInventoryItemAsync(int inventory_ItemId)
        {
            try
            {
                var result = await _Repository.GetInventoryItemAsync(inventory_ItemId);

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
            var inventoryitem = new Inventory_Item
            {
                ItemName = ivm.ItemName,
                Inventory_TypeId = Convert.ToInt32(ivm.InventoryType),
                Description = ivm.Description
            };

            try
            {
                _Repository.Add(inventoryitem);
                await _Repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // fix error message
                return BadRequest("Invalid Transaction");
            }

            return Ok(inventoryitem);

        }

        //Update Inventory Item
        [HttpPut]
        [Route("EditInventoryItem/{inventory_ItemId}")]
        public async Task<ActionResult<InventoryViewModel>> EditInventoryItem(int inventory_ItemId, InventoryViewModel ivm)
        {
            try
            {
                var currentItem = await _Repository.GetInventoryItemAsync(inventory_ItemId);
                if (currentItem == null) return NotFound($"The inventory item does not exist");

                currentItem.ItemName = ivm.ItemName;
                currentItem.Description = ivm.Description;
                currentItem.Inventory_TypeId = Convert.ToInt32(ivm.InventoryType);
             
                if (await _Repository.SaveChangesAsync())
                {
                    return Ok(currentItem);
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
        [Route("DeleteInventoryItem/{inventory_ItemId}")]
        public async Task<IActionResult> DeleteInventoryItem(int inventory_ItemId)
        {
            try
            {
                var currentItem = await _Repository.GetInventoryItemAsync(inventory_ItemId);

                if (currentItem == null) return NotFound($"The inventory item does not exist");

                _Repository.Delete(currentItem);

                if (await _Repository.SaveChangesAsync()) return Ok(currentItem);

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }


        [HttpGet("items/{inventory_TypeId}")]
        public async Task<IActionResult> GetInventoryItemsByType(int inventory_TypeId)
        {
            try
            {
                var itemsOfType = await _Repository.GetInventoryItemsByTypeAsync(inventory_TypeId);
                return Ok(itemsOfType);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

    }
}

