using Africanacity_Team24_INF370_.models.Inventory;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.View_Models;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using System.Data.Entity;
using System.Net;
using System.Net.Mail;
using Africanacity_Team24_INF370_.EmailService;
//using SendGrid.Helpers.Mail;
using Microsoft.VisualBasic;
//using Newtonsoft.Json.Linq;
using static Org.BouncyCastle.Crypto.Engines.SM2Engine;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;

namespace Africanacity_Team24_INF370_.Controllers
{

    [Route("api/[Controller]")]
    [ApiController]
    public class InventoryItemController : ControllerBase
    {

        private readonly IRepository _Repository;
        private readonly AppDbContext _appDbContext;
        private readonly IEmailService _emailService;

        public InventoryItemController(IRepository Repository, AppDbContext context)
        {
            _Repository = Repository;
            _appDbContext = context;
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

                    i.Description,

                    i.Quantity

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
                Description = ivm.Description,
                Quantity = ivm.Quantity
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
                currentItem.Quantity = ivm.Quantity;
             
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

     
        [HttpPut]
        [Route("UpdateItems/{inventory_ItemId}")]
        public async Task<IActionResult> UpdateItems(int inventory_ItemId, [FromBody] InventoryViewModel inventoryitem)
        {
            try
            {
                var currentItem = await _Repository.GetInventoryItemAsync(inventory_ItemId);
                if (currentItem == null)
                {
                    return NotFound($"The inventory item does not exist.");
                }

                currentItem.Quantity = inventoryitem.Quantity; // Update the quantity property

                if (await _Repository.SaveChangesAsync())
                {
                    return Ok(currentItem); // Return the updated inventory item
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }

            return BadRequest("Your request is invalid.");
        }



        [HttpPost]
        [Route("AddReceivedOrder")]
        public async Task<IActionResult> AddReceivedOrder([FromBody] SupplierInventoryVM sivm)
        {
            var supplieritem = new Supplier_Inventory
            {
                Inventory_ItemId = Convert.ToInt32(sivm.ItemName), // Assuming InventoryItem is an int property
                SupplierId = Convert.ToInt32(sivm.SupplierNames), // Assuming Supplier is an int property
                Ordered_Date = DateTime.ParseExact(sivm.Ordered_Date, "yyyy-MM-dd", CultureInfo.InvariantCulture),
                Received_Date = DateTime.ParseExact(sivm.Received_Date, "yyyy-MM-dd", CultureInfo.InvariantCulture),
                Ordered_Quantity = sivm.Ordered_Quantity
            };

            try
            {
                _Repository.Add(supplieritem);
                await _Repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid Transaction");
            }

            return Ok(supplieritem);
        }
        //[HttpPost]
        //[Route("AddReceivedOrder")]
        //public async Task<IActionResult> AddReceivedOrder([FromBody] SupplierInventoryVM sivm)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (!int.TryParse(sivm.ItemName, out int inventory_ItemId) ||
        //        !int.TryParse(sivm.SupplierNames, out int supplierId))
        //    {
        //        return BadRequest("Invalid input for InventoryItemId or SupplierId.");
        //    }

        //    var supplieritem = new Supplier_Inventory
        //    {
        //        Inventory_ItemId = inventory_ItemId,
        //        SupplierId = supplierId,
        //        Ordered_Date = DateTime.ParseExact(sivm.Ordered_Date, "yyyy-MM-dd", CultureInfo.InvariantCulture),
        //        Received_Date = DateTime.ParseExact(sivm.Received_Date, "yyyy-MM-dd", CultureInfo.InvariantCulture),
        //        Ordered_Quantity = sivm.Ordered_Quantity
        //    };

        //    try
        //    {
        //        _Repository.Add(supplieritem);
        //        await _Repository.SaveChangesAsync();
        //        return Ok(supplieritem);
        //    }
        //    catch (Exception)
        //    {
        //        return BadRequest("Invalid Transaction");
        //    }
        //}


        [HttpGet("GetInventoryItemByName/{itemName}")]
        public IActionResult GetInventoryItemByName(string itemName)
        {
            var inventoryItem = _appDbContext.Inventory_Items.FirstOrDefault(item => item.ItemName == itemName);

            if (inventoryItem == null)
            {
                return NotFound();
            }

            return Ok(inventoryItem);
        }


        [HttpGet]
        [Route("GetAllInventoryOrders")]
        public async Task<ActionResult> GetAllInventoryOrders()
        {
            try
            {

                var results = await _Repository.GetAllInventoryOrdersAsync();


                dynamic inventoryorders = results.Select(i => new
                {
                    
                    InventoryItemName = i.Inventory_Item.ItemName,

                    i.Supplier.SupplierName,

                    i.Ordered_Date,

                    i.Received_Date,

                    i.Ordered_Quantity

                });

                return Ok(inventoryorders);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }
    }
}

