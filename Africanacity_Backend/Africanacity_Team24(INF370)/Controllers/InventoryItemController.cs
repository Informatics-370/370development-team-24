using Africanacity_Team24_INF370_.models.Inventory;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.View_Models;
using Microsoft.AspNetCore.Mvc;
using Africanacity_Team24_INF370_.EmailService;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;
using System.Data.Entity.Infrastructure;
using Africanacity_Team24_INF370_.models.Restraurant;
using System.Threading.Tasks.Dataflow;

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

                    i.Quantity,

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

                var inventoryItemPrice = new Inventory_Price
                {
                    Inventory_ItemId = inventoryitem.Inventory_ItemId,
                    Price = Convert.ToDecimal(ivm.Price),
                    Date = DateTime.Now

                };

                _Repository.Add(inventoryItemPrice);
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
                                                                  // Ordered_Date = DateTime.ParseExact(sivm.Ordered_Date, "yyyy-MM-dd", CultureInfo.InvariantCulture),
                                                                  // Received_Date = DateTime.ParseExact(sivm.Received_Date, "yyyy-MM-dd", CultureInfo.InvariantCulture),
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

                    // i.Ordered_Date,

                    // i.Received_Date,

                    i.Ordered_Quantity

                });

                return Ok(inventoryorders);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost]
        [Route("CreateStockTake")]
        public IActionResult CreateStockTake(StockTakeViewModel stockTakeData)
        {
            try
            {
                var stockTake = new StockTake
                {
                    StockTake_Date = stockTakeData.StockTakeDate,
                    StockTakeItems = new List<StockTakeItem>() // Initialize the list for all items
                };

                List<DiscrepencyItem> discrepancyItems = new List<DiscrepencyItem>(); // Initialize list for discrepancy items

                foreach (var item in stockTakeData.Items)
                {
                    var stockTakeItem = new StockTakeItem
                    {
                        Quantity = item.Quantity,
                        Inventory_ItemId = item.Inventory_ItemId
                    };

                    // Fetch the corresponding inventory item from the database
                    var inventoryItem = _appDbContext.Inventory_Items.FirstOrDefault(i => i.Inventory_ItemId == stockTakeItem.Inventory_ItemId);

                    if (inventoryItem != null && inventoryItem.Quantity != stockTakeItem.Quantity)
                    {
                        stockTakeItem.Description = inventoryItem.Description; // Include description for discrepancies
       
                        stockTake.StockTakeItems.Add(stockTakeItem); // Add the item to the stock take

                        // Calculate the quantity difference
                        int quantityDifference = stockTakeItem.Quantity - inventoryItem.Quantity;

                        // Create a new DiscrepancyItem and add it to the list
                        var discrepancyItem = new DiscrepencyItem
                        {
                            Description = inventoryItem.Description,
                            QuantityDifference = quantityDifference,
                            Inventory_ItemId = inventoryItem.Inventory_ItemId,
                            ItemName = inventoryItem.ItemName
                        };
                        discrepancyItems.Add(discrepancyItem);

                       // Create a new WriteOff record
                       //var writeOff = new WriteOffStock
                       //{
                       //    StockTakeItem = stockTakeItem,
                       //    Description = stockTakeItem.Description,// Link the WriteOff to the StockTakeItem
                       //    Reason = stockTakeItem.Reason
                       //};

                       // _appDbContext.WriteOffs.Add(writeOff); // Save the write-off record
                    }
                }

                _appDbContext.StockTakes.Add(stockTake);
                _appDbContext.SaveChanges();

                // Construct the response JSON
                var response = new
                {
                    discrepancyItems = discrepancyItems
                };

                return Ok(response); // Return the response
            }
            catch (DbUpdateException ex)
            {
                var innerExceptionMessage = ex.InnerException?.Message ?? "No inner exception message available.";
                return BadRequest($"Error: {ex.Message}. Inner Exception: {innerExceptionMessage}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error: {ex.Message}");
            }

        }
        //[HttpGet]
        //[Route("StockTake")]
        //public ActionResult<IEnumerable<StockTakeItem>> GetAllStockTakes()
        //{
        //    var stockTakes = _appDbContext.StockTakes.ToList();
        //    return Ok(stockTakes);
        //}



        [HttpGet]
        [Route("GetAllReconItems")]
        public async Task<ActionResult> GetAllReconItems()
        {
            try
            {

                var results = await _Repository.GetAllReconItemsAsync();


                dynamic reconitems = results.Select(s => new
                {
                    s.StockTakeItemId,

                    InventoryItemName = s.Inventory_Item.ItemName,

                    InventoryQuantity = s.Inventory_Item.Quantity,

                    s.Quantity,

                    QuantityDifference = s.Inventory_Item.Quantity - s.Quantity

                });

                return Ok(reconitems);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }

        //[HttpPost]
        //[Route("AddWriteOffRecord")]
        //public IActionResult AddWriteOffRecord(List<WriteOffViewModel> writeOffItems)
        //{
        //    try
        //    {
        //        foreach (var item in writeOffItems)
        //        {
        //            var writeOff = new WriteOffStock
        //            {
        //                StockTakeItemId = item.StockTakeItemId,
        //                Reason = item.Reason
        //            };

        //            _appDbContext.WriteOffs.Add(writeOff);
        //        }

        //        _appDbContext.SaveChanges();

        //        return Ok("Write-off records added successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log or display the inner exception details
        //        var innerException = ex.InnerException;
        //        while (innerException != null)
        //        {
        //            // Log or display innerException.Message and innerException.StackTrace
        //            innerException = innerException.InnerException;
        //        }

        //        return BadRequest($"Error adding write-off records: {ex.Message}");
        //    }
        //}
        [HttpPost]
        [Route("AddWriteOffRecord")]
        public IActionResult AddWriteOffRecord(List<WriteOffViewModel> writeOffItems)
        {
            try
            {
                foreach (var item in writeOffItems)
                {
                    var writeOff = new WriteOffStock
                    {
                        StockTakeItemId = item.StockTakeItemId,
                        Reason = item.Reason
                    };

                    _appDbContext.WriteOffs.Add(writeOff);
                }

                _appDbContext.SaveChanges();

                return Ok("Write-off records added successfully");
            }
            catch (Exception ex)
            {
                // Log the full exception details, including inner exceptions
                Console.WriteLine($"Error adding write-off records: {ex}");
                if (ex.InnerException != null)
                {
                    Console.WriteLine($"Inner Exception: {ex.InnerException}");
                }
                return BadRequest("An error occurred while adding write-off records. Please check the logs for more details.");
            }
        }

    }
}












