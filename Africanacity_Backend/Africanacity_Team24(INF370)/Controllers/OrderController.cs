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


        //save kicthen orders
        //[HttpPost]
        //[Route("SaveKitchenOrder")]
        //public async Task<IActionResult> SaveKitchenOrder([FromBody] KitchenOrderViewModel kitchenOrder)
        //{
        //    try
        //    {


        //        var kitchenItem = new KitchenOrder
        //        {
        //            KitchenOrderId = kitchenOrder.KitchenOrderId,
        //            TableNumber = kitchenOrder.TableNumber,
        //            KitchenOrderNumber = kitchenOrder.KitchenOrderNumber,
        //            OrderedItems = string.Join(",", kitchenOrder.OrderedItems),
        //            OrderedDrinks = string.Join(",", kitchenOrder.OrderedDrinks),
        //            Subtotal = kitchenOrder.Subtotal,

        //        };



        //        _repository.Add(kitchenItem);
        //        await _repository.SaveChangesAsync();

        //        return Ok(kitchenItem);
        //    }

        //    catch (Exception ex)
        //    {
        //        var innerExceptionMessage = ex.InnerException?.Message;
        //        return BadRequest($"Invalid transaction. Error: {ex.Message}. Inner Exception: {innerExceptionMessage}");
        //    }



        //}

        //[HttpPost]
        //[Route("AddKitchenOrder")]
        //public async Task<IActionResult> AddKitchenOrder(KitchenOrderDto orderDto)
        //{
        //    try
        //    {
        //        // Calculate subtotal
        //        decimal subtotal = CalculateSubtotal(orderDto.OrderedMenuItems, orderDto.OrderedDrinks);

        //        // Calculate VAT (assuming 15% VAT)
        //        decimal vat = CalculateVAT(subtotal);

        //        // Calculate discount (if applicable)
        //        decimal discount = CalculateDiscount(subtotal);

        //        // Calculate total
        //        decimal total = CalculateTotal(subtotal, discount, vat);


        //        // Create a new KitchenOrder object
        //        var kitchenOrder = new KitchenOrder
        //        {
        //            TableNumber = orderDto.TableNumber,
        //            KitchenOrderNumber = orderDto.KitchenOrderNumber,
        //            OrderedMenuItems = string.Join(", ", orderDto.OrderedMenuItems.Select(item => item.Name)),
        //            OrderedDrinks = string.Join(", ", orderDto.OrderedDrinks.Select(drink => drink.Name)),
        //            Subtotal = subtotal,
        //            Discount = discount,
        //            VAT = vat,
        //            Total = total
        //        };

        //        // Save the kitchen order to the database
        //        _appDbContext.KitchenOrders.Add(kitchenOrder);
        //        await _appDbContext.SaveChangesAsync();

        //        return Ok("Kitchen order added successfully.");
        //    }
        //    catch (Exception ex)
        //    {
        //        // Handle exceptions
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //}


        //Add kitchen order
        [HttpPost]
        [Route("AddKitchenOrder")]

        public IActionResult AddKitchenOrder (KitchenOrderDto kitchenOrderDto)
        {
            try
            {
                var kitchenOrder = new KitchenOrder
                {
                    TableNumber = kitchenOrderDto.TableNumber,
                    KitchenOrderNumber = kitchenOrderDto.KitchenOrderNumber,
                    Subtotal = kitchenOrderDto.Subtotal,
                    VAT = kitchenOrderDto.VAT,
                    Discount = kitchenOrderDto.Discount,
                    Total = kitchenOrderDto.Total,
                    OrderedMenuItems = new List<Order_MenuItem>(),
                    OrderedDrinks = new List<Order_Drink>()

                };

                foreach (var Item in kitchenOrderDto.orderMenuItemDtos )
                {
                    var menuItem = _appDbContext.MenuItems.FirstOrDefault(x => x.MenuItemId == Item.MenuItemId);

                    if(menuItem != null)
                    {
                        var kitchenOrderMenuItem = new Order_MenuItem
                        {
                            MenuItemId = menuItem.MenuItemId,
                            Quantity = Item.Quantity,
                        };
                        kitchenOrder.OrderedMenuItems.Add(kitchenOrderMenuItem);

                    }
                   

                    ////fetch corresponding menu item from database
                    //var menuItem = _appDbContext.MenuItems.FirstOrDefault(x => x.MenuItemId == kitchenOrderMenuItem.MenuItemId);
                    //_appDbContext.Order_MenuItems.Add(kitchenOrderMenuItem);
                }


                // for my drinks order items 
                foreach (var Item in kitchenOrderDto.orderDrinkDtos)
                {
                    var drinkItem = _appDbContext.OtherDrinks.FirstOrDefault(x => x.OtherDrinkId == Item.OtherDrinkId);
                    if(drinkItem != null)
                    {
                        var kitchenOrderDrinkItem = new Order_Drink
                        {
                            OtherDrinkId = drinkItem.OtherDrinkId,
                            Quantity = Item.Quantity,
                        };
                        kitchenOrder.OrderedDrinks.Add(kitchenOrderDrinkItem);

                    }
                    
                    

                    ////fetch corresponding menu item from database
                    //var drinkItem = _appDbContext.OtherDrinks.FirstOrDefault(x => x.OtherDrinkId == kitchenOrderDrinkItem.OrderDrinkId);
                    //_appDbContext.Order_Drinks.Add(kitchenOrderDrinkItem);

                }

                _appDbContext.KitchenOrders.Add(kitchenOrder);
                _appDbContext.SaveChanges();
                return Ok();
            }
             

            catch (Exception ex)
            {
                return BadRequest($"Cannot save : {ex.Message}");
            }
        }


        //GET KITCHEN ORDER BY ID
        [HttpGet]
        [Route("GetKitchenOrderById/{KitchenOrderId}")]
        public IActionResult GetKitchenOrderById(int KitchenOrderId)
        {
            try
            {
                // Create JsonSerializerOptions with ReferenceHandler.Preserve
                var jsonSerializerOptions = new JsonSerializerOptions
                {
                    ReferenceHandler = ReferenceHandler.Preserve,
                    // Other options as needed
                };
                var kitchenOrder = _appDbContext.KitchenOrders
                    .Include(o => o.OrderedMenuItems) // Include related ordered menu items
                    .Include(o => o.OrderedDrinks) // Include related ordered drinks
                    .FirstOrDefault(o => o.KitchenOrderId == KitchenOrderId);

                if (kitchenOrder == null)
                {
                    return NotFound(); // Return a 404 Not Found response
                }

                var jsonKitchenOrder = JsonSerializer.Serialize(kitchenOrder, jsonSerializerOptions);

                // Return a 200 OK response with the serialized kitchen order
                return Ok(jsonKitchenOrder); // Return a 200 OK response with the kitchen order
            }
            catch (Exception ex)
            {
                // Handle exceptions, log errors, and return an error response
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        //GET ALL KITCHEN ORDERS
        [HttpGet]
        [Route("GetAllKitchenOrders")]
        public IActionResult GetAllKitchenOrders()
        {
            try
            {


                // Retrieve all kitchen orders including related ordered menu items and drinks
                var kitchenOrders = _appDbContext.KitchenOrders
                    .Include(o => o.OrderedMenuItems)
                    .Include(o => o.OrderedDrinks)
                    .ToList();


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


        //EDIT KITCHEN ORDER
        [HttpPut]
        [Route("UpdateKitchenOrder/{KitchenOrderId}")]
        public IActionResult UpdateKitchenOrder(int kitchenOrderId, KitchenOrderDto updatedKitchenOrder)
        {
            try
            {
                var existingKitchenOrder = _appDbContext.KitchenOrders
                    .Include(o => o.OrderedMenuItems) // Include related ordered menu items
                    .Include(o => o.OrderedDrinks) // Include related ordered drinks
                    .FirstOrDefault(o => o.KitchenOrderId == kitchenOrderId);

                if (existingKitchenOrder == null)
                {
                    return NotFound(); // Return a 404 Not Found response
                }

                // Update the existing kitchen order properties
                existingKitchenOrder.TableNumber = updatedKitchenOrder.TableNumber;
                existingKitchenOrder.KitchenOrderNumber = updatedKitchenOrder.KitchenOrderNumber;
                existingKitchenOrder.Subtotal = updatedKitchenOrder.Subtotal;
                existingKitchenOrder.VAT = updatedKitchenOrder.VAT;
                existingKitchenOrder.Discount = updatedKitchenOrder.Discount;
                existingKitchenOrder.Total = updatedKitchenOrder.Total;

                // Update ordered menu items
                existingKitchenOrder.OrderedMenuItems.Clear();
                foreach (var menuItemDto in updatedKitchenOrder.orderMenuItemDtos)
                {
                    var menuItem = new Order_MenuItem
                    {
                        MenuItemId = menuItemDto.MenuItemId,
                        Quantity = menuItemDto.Quantity
                    };
                    existingKitchenOrder.OrderedMenuItems.Add(menuItem);
                }

                // Update ordered drinks
                existingKitchenOrder.OrderedDrinks.Clear();
                foreach (var drinkDto in updatedKitchenOrder.orderDrinkDtos)
                {
                    var drink = new Order_Drink
                    {
                        OtherDrinkId = drinkDto.OtherDrinkId,
                        Quantity = drinkDto.Quantity
                    };
                    existingKitchenOrder.OrderedDrinks.Add(drink);
                }

                _appDbContext.SaveChanges();

                return Ok(existingKitchenOrder); // Return a 200 OK response with the updated kitchen order
            }
            catch (Exception ex)
            {
                // Handle exceptions, log errors, and return an error response
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        private decimal CalculateSubtotal(List<MenuItem> orderedMenuItems, List<OtherDrink> orderedDrinks)
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
            foreach (var drink in orderedDrinks)
            {
                // Fetch the price of the drink (you may need to query your database for this)
                decimal drinkPrice = GetDrinkPriceById(drink.OtherDrinkId); // Implement this method

                subtotal += drinkPrice;

            }

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

        private decimal GetDrinkPriceById(int drinkId)
        {
            var drinkPrice = _appDbContext.OtherDrinkPrices
                .FirstOrDefault(p => p.OtherDrinkId == drinkId);

            if (drinkPrice != null)
            {
                return drinkPrice.Amount;
            }

            return 0; // Handle the case where the price is not found.
        }





        //get kitchen order
        //[HttpGet]
        //[Route("GetAllKitchenOrders")]
        //public async Task<ActionResult<List<KitchenOrderDto>>> GetAllKitchenOrders()
        //{
        //    try
        //    {
        //        var kitchenOrders = await _repository.GetAllKitchenOrdersAsync();
        //        return Ok(kitchenOrders);
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(500, "Internal Server Error. Please contact support.");
        //    }
        //}

        //get Vat by Id
       

        //get Discount by Id
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


















    }










}
