using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Components.Routing;
using Africanacity_Team24_INF370_.models;
using System.Reflection.Metadata.Ecma335;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;
using System.Security.Cryptography.Xml;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using System.Text.Json;
using Newtonsoft.Json;
using JsonSerializer = System.Text.Json.JsonSerializer;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;
using System.Data.Entity.Infrastructure;

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IRepository _repository;
        private readonly AppDbContext _appDbContext;
        
        public OrderController(IRepository repository, AppDbContext appDbContext)
        {
            _repository = repository;
            _appDbContext = appDbContext;
            
        }

        //Add kitchen order
        //[HttpPost]
        //[Route("AddKitchenOrder")]
        //public IActionResult AddKitchenOrder (KitchenOrderDto kitchenOrderDto)
        //{
        //    try
        //    {
        //        var kitchenOrder = new KitchenOrder
        //        {
        //            TableNumber = kitchenOrderDto.TableNumber,
        //            KitchenOrderNumber = kitchenOrderDto.KitchenOrderNumber,
        //            Subtotal = kitchenOrderDto.Subtotal,
        //            VAT = kitchenOrderDto.VAT,
        //            Discount = kitchenOrderDto.Discount,
        //            Total = kitchenOrderDto.Total,
        //            Order_Date = DateTime.Now,
        //            OrderedMenuItems = new List<Order_MenuItem>(),
        //            //OrderedDrinks = new List<Order_Drink>()

        //        };

        //        foreach (var Item in kitchenOrderDto.orderMenuItemDtos )
        //        {
        //            var menuItem = _appDbContext.MenuItems.FirstOrDefault(x => x.MenuItemId == Item.MenuItemId);

        //            if(menuItem != null)
        //            {
        //                var kitchenOrderMenuItem = new Order_MenuItem
        //                {
        //                    MenuItemId = menuItem.MenuItemId,
        //                    Quantity = Item.Quantity,
        //                };
        //                kitchenOrder.OrderedMenuItems.Add(kitchenOrderMenuItem);

        //            }
                   

        //            ////fetch corresponding menu item from database
        //            //var menuItem = _appDbContext.MenuItems.FirstOrDefault(x => x.MenuItemId == kitchenOrderMenuItem.MenuItemId);
        //            //_appDbContext.Order_MenuItems.Add(kitchenOrderMenuItem);
        //        }


        //        // for my drinks order items 
        //        foreach (var Item in kitchenOrderDto.orderDrinkDtos)
        //        {
        //            var drinkItem = _appDbContext.OtherDrinks.FirstOrDefault(x => x.OtherDrinkId == Item.OtherDrinkId);
        //            if(drinkItem != null)
        //            {
        //                //var kitchenOrderDrinkItem = new Order_Drink
        //                //{
        //                //    OtherDrinkId = drinkItem.OtherDrinkId,
        //                //    Quantity = Item.Quantity,
        //                //};
        //                //kitchenOrder.OrderedDrinks.Add(kitchenOrderDrinkItem);

        //            }
                    
                    

        //            ////fetch corresponding menu item from database
        //            //var drinkItem = _appDbContext.OtherDrinks.FirstOrDefault(x => x.OtherDrinkId == kitchenOrderDrinkItem.OrderDrinkId);
        //            //_appDbContext.Order_Drinks.Add(kitchenOrderDrinkItem);

        //        }

        //        _appDbContext.KitchenOrders.Add(kitchenOrder);
        //        _appDbContext.SaveChanges();
        //        return Ok();
        //    }
             

        //    catch (Exception ex)
        //    {
        //        return BadRequest($"Cannot save : {ex.Message}");
        //    }
        //}


        //GET KITCHEN ORDER BY ID
        //[HttpGet]
        //[Route("GetKitchenOrderById/{KitchenOrderId}")]
        //public IActionResult GetKitchenOrderById(int KitchenOrderId)
        //{
        //    try
        //    {
        //        // Create JsonSerializerOptions with ReferenceHandler.Preserve
                
        //        var kitchenOrder = _appDbContext.KitchenOrders
        //            .Include(o => o.OrderedMenuItems).ThenInclude(omi => omi.MenuItem) // Include related ordered menu items
        //            .Include(o => o.OrderedDrinks).ThenInclude(od => od.OtherDrink)// Include related ordered drinks
        //            .FirstOrDefault(o => o.KitchenOrderId == KitchenOrderId);

        //        if (kitchenOrder == null)
        //        {
        //            return NotFound(); // Return a 404 Not Found response
        //        }

        //        var jsonSettings = new JsonSerializerSettings
        //        {
        //            ReferenceLoopHandling = ReferenceLoopHandling.Ignore
        //        };

        //        var json = JsonConvert.SerializeObject(kitchenOrder, Formatting.Indented, jsonSettings);

        //        return Ok(json); // Return a 200 OK response with the kitchen order
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle exceptions, log errors, and return an error response
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //}

        // GET ALL KITCHEN ORDERS
        [HttpGet]
        [Route("GetAllKitchenOrders")]
        public async Task<IActionResult> GetAllKitchenOrders()
        {
            try
            {
                var results = await _repository.GetAllKitchenOrdersAsync();

                dynamic kitchenOrders = results.Select(k => new
                {
                    k.KitchenOrderId,
                    k.Order_Date,
                    k.TableNumber,
                    k.KitchenOrderNumber,

                    k.Subtotal,
                    k.VAT,
                    k.Discount,
                    k.Total,
                   
                });


                var jsonSettings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                };

                var json = JsonConvert.SerializeObject(kitchenOrders, Formatting.Indented, jsonSettings);

                return Ok(json); // Return a 200 OK response with the list of kitchen orders
            }
            catch (Exception ex)
            {
                // Handle exceptions, log errors, and return an error response
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET ALL OPTION 2 - ORDER_MENUITEM
        [HttpGet]
        [Route("GetAllOrderedMenuItems")]
        public async Task<ActionResult> GetAllOrderedMenuItems()
        {
            try
            {

                var results = await _repository.GetAllOrderedMenuItemsAsync();


                dynamic reconitems = results.Select(s => new
                {
                    s.OrderMenuItemId,
                    KitchenOrderNumber = s.KitchenOrder.KitchenOrderNumber,
                    TableNumber = s.KitchenOrder.TableNumber,
                    MenuItemName = s.MenuItem.Name,
                    s.Quantity,

                });

                return Ok(reconitems);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }


        //GET ALL OPTION 2 - ORDER_DRIN
        //[HttpGet]
        //[Route("GetAllOrderedDrinksItems")]
        //public async Task<ActionResult> GetAllOrderedDrinksItems()
        //{
        //    try
        //    {

        //        var results = await _repository.GetAllOrderedDrinksItemsAsync();


        //        dynamic reconitems = results.Select(s => new
        //        {
        //            s.OrderDrinkId,
        //            KitchenOrderNumber = s.KitchenOrder.KitchenOrderNumber,
        //            TableNumber = s.KitchenOrder.TableNumber,
        //            DrinkItemName = s.OtherDrink.Name,
        //            s.Quantity,

        //        });

        //        return Ok(reconitems);
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
        //    }
        //}




        private decimal CalculateSubtotal(List<MenuItem> orderedMenuItems/* List<OtherDrink> orderedDrinks*/)
        {
            // Implement your subtotal calculation logic here based on the ordered items and drinks in orderDto
            decimal subtotal = 0;

            foreach (var menuItem in orderedMenuItems)
            {
                // Fetch the price of the menu item from MenuItemPrices table based on the name

                decimal menuItemPrice = GetMenuItemPriceById(menuItem.MenuItemId);
                subtotal += menuItemPrice;
            }

            // Add up the prices of ordered drinks
            //foreach (var drink in orderedDrinks)
            //{
            //    // Fetch the price of the drink (you may need to query your database for this)
            //    decimal drinkPrice = GetDrinkPriceById(drink.OtherDrinkId); // Implement this method

            //    subtotal += drinkPrice;

            //}

            return subtotal;
        }

        private decimal CalculateDiscount(decimal subtotal)
        {
            // Implement your discount calculation logic here based on the ordered items and subtotal
            decimal discount = 0;

            // Example: Apply a discount if the subtotal is above a certain threshold
            if (subtotal > 100)
            {
                discount = subtotal * 0.1m;
            }

            return discount;
        }

        private decimal CalculateVAT(decimal subtotal)
        {
            // Define your VAT rate as a decimal (e.g., 15% VAT)
            decimal vatRate = 0.15M;

            // Calculate VAT amount
            decimal vat = subtotal * vatRate;

            return vat;
        }

        private decimal CalculateTotal(decimal subtotal, decimal vat, decimal discount)
        {
            // Calculate total by subtracting discount from subtotal and adding VAT
            decimal total = (subtotal - discount) + vat;

            return total;
        }



        private string GenerateKitchenOrderNumber()
        {
            // Implement your kitchen order number generation logic here
            // This can be a unique identifier based on your business requirements
            // For example, a combination of date and a unique counter
            return $"ORDER-{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid()}";
        }

        //Get all table numbers
        [HttpGet]
        [Route("GetAllTableNumbers")]
        public async Task<IActionResult> GetAllTableNumbers()
        {
            try
            {
                var results = await _repository.GetAllTableNumbersAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        //get MenuItem Price
        private decimal GetMenuItemPriceById(int menuItemId)
        {
            var menuItemPrice = _appDbContext.MenuItem_Prices
                .FirstOrDefault(p => p.MenuItemId == menuItemId);

            if (menuItemPrice != null)
            {
                return menuItemPrice.Amount;
            }

            return 0; // Handle the case where the price is not found.
        }

        //private decimal GetDrinkPriceById(int drinkId)
        //{
        //    var drinkPrice = _appDbContext.OtherDrinkPrices
        //        .FirstOrDefault(p => p.OtherDrinkId == drinkId);

        //    if (drinkPrice != null)
        //    {
        //        return drinkPrice.Amount;
        //    }

        //    return 0; // Handle the case where the price is not found.
        //}

        [HttpGet]
        [Route("GetDiscountItem/{DiscountId}")]
        public async Task<IActionResult> GetDiscountItemAsync(int DiscountId)
        {
            try
            {
                var discountItem = await _repository.GetDiscountItemAsync(DiscountId);

                if (discountItem == null)
                {
                    return NotFound();
                }

                return Ok(discountItem);
            }

            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }


        }

        // GET EMPLOYEES BY ID
        [HttpGet]
        [Route("GetEmployee/{employeeId}")]
        public async Task<IActionResult> GetEmployeeAsync(int employeeId)
        {
            try
            {
                var result = await _repository.GetEmployeeAsync(employeeId);

                if (result == null) return NotFound("Employee does not exist. You need to create an employee first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        //Edit 
        //[HttpPut]
        //[Route("EditKitchenOrder/{kitchenOrderId}")]
        //public IActionResult EditKitchenOrder(int kitchenOrderId, KitchenOrderEditDto kitchenOrderEditDto)
        //{
        //    try
        //    {
        //        var existingOrder = _appDbContext.KitchenOrders
        //            .Include(o => o.OrderedMenuItems)
        //            .Include(o => o.OrderedDrinks)
        //            .FirstOrDefault(o => o.KitchenOrderId == kitchenOrderId);

        //        if (existingOrder == null)
        //        {
        //            return NotFound(); // Return a 404 Not Found response if the order doesn't exist
        //        }

        //        // Update properties of the existing order with values from kitchenOrderEditDto
        //        existingOrder.Subtotal = kitchenOrderEditDto.Subtotal;
        //        existingOrder.VAT = kitchenOrderEditDto.VAT;
        //        existingOrder.Discount = kitchenOrderEditDto.Discount;
        //        existingOrder.Total = kitchenOrderEditDto.Total;

        //        // Handle adding/removing menu items and drinks
        //        UpdateMenuOrderedItems(existingOrder.OrderedMenuItems, kitchenOrderEditDto.OrderedItems);
        //        //UpdateDrinkOrderedItems(existingOrder.OrderedDrinks, kitchenOrderEditDto.OrderedDrinks);

        //        // Save changes to the database
        //        _appDbContext.SaveChanges();

        //        return Ok(); // Return a 200 OK response indicating success
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle exceptions, log errors, and return an error response
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //}

        // Helper method to update ordered items
        private void UpdateMenuOrderedItems(ICollection<Order_MenuItem> existingItems, List<BothOrderItemEditDto> updatedItems)
        {
            // Iterate through the updated items
            foreach (var updatedItem in updatedItems)
            {
                if (updatedItem.IsRemoved)
                {
                    // Remove the item if IsRemoved is true
                    var existingItem = existingItems.FirstOrDefault(item => item.OrderMenuItemId == updatedItem.BothOrderItemId);
                    if (existingItem != null)
                    {
                        existingItems.Remove(existingItem);
                    }
                }
                else
                {
                    // Update quantity and description for existing items
                    var existingItem = existingItems.FirstOrDefault(item => item.OrderMenuItemId == updatedItem.BothOrderItemId);
                    if (existingItem != null)
                    {
                        existingItem.Quantity = updatedItem.Quantity;
                        // You can update the description here if needed
                    }
                }
            }

            // Handle adding new items here if IsAdded is true in updatedItems
        }

        //private void UpdateDrinkOrderedItems(ICollection<Order_Drink> existingItems, List<BothOrderItemEditDto> updatedItems)
        //{
        //    // Iterate through the updated items
        //    foreach (var updatedItem in updatedItems)
        //    {
        //        if (updatedItem.IsRemoved)
        //        {
        //            // Remove the item if IsRemoved is true
        //            var existingItem = existingItems.FirstOrDefault(item => item.OrderDrinkId == updatedItem.BothOrderItemId);
        //            if (existingItem != null)
        //            {
        //                existingItems.Remove(existingItem);
        //            }
        //        }
        //        else
        //        {
        //            // Update quantity and description for existing items
        //            var existingItem = existingItems.FirstOrDefault(item => item.OrderDrinkId == updatedItem.BothOrderItemId);
        //            if (existingItem != null)
        //            {
        //                existingItem.Quantity = updatedItem.Quantity;
        //                // You can update the description here if needed
        //            }
        //        }
        //    }

        //    // Handle adding new items here if IsAdded is true in updatedItems
        //}



















    }










}
