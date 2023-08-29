using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Components.Routing;
using Africanacity_Team24_INF370_.models;
using System.Reflection.Metadata.Ecma335;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;




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

        [HttpPost]
        [Route("AddKitchenOrder")]
        public async Task<IActionResult> AddKitchenOrder(KitchenOrderDto orderDto)
        {
            try
            {
                // Calculate subtotal
                decimal subtotal = CalculateSubtotal(orderDto.OrderedMenuItems, orderDto.OrderedDrinks);

                // Calculate VAT (assuming 15% VAT)
                decimal vat = CalculateVAT(subtotal);

                // Calculate discount (if applicable)
                decimal discount = CalculateDiscount(subtotal);

                // Calculate total
                decimal total = CalculateTotal(subtotal, discount, vat);


                // Create a new KitchenOrder object
                var kitchenOrder = new KitchenOrder
                {
                    TableNumber = orderDto.TableNumber,
                    KitchenOrderNumber = orderDto.KitchenOrderNumber,
                    OrderedMenuItems = string.Join(", ", orderDto.OrderedMenuItems.Select(item => item.Name)),
                    OrderedDrinks = string.Join(", ", orderDto.OrderedDrinks.Select(drink => drink.Name)),
                    Subtotal = subtotal,
                    Discount = discount,
                    VAT = vat,
                    Total = total
                };

                // Save the kitchen order to the database
                _appDbContext.KitchenOrders.Add(kitchenOrder);
                await _appDbContext.SaveChangesAsync();

                return Ok("Kitchen order added successfully.");
            }
            catch (Exception ex)
            {
                // Handle exceptions
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
                discount = subtotal * 0.1M;
            }

            return discount;
        }

        public decimal CalculateVAT(decimal subtotal)
        {
            // Define your VAT rate as a decimal (e.g., 15% VAT)
            decimal vatRate = 0.15M;

            // Calculate VAT amount
            decimal vat = subtotal * vatRate;

            return vat;
        }

        public decimal CalculateTotal(decimal subtotal, decimal vat, decimal discount)
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
        public decimal GetMenuItemPriceById(int menuItemId)
        {
            var menuItemPrice = _appDbContext.MenuItem_Prices
                .FirstOrDefault(p => p.MenuItemId == menuItemId);

            if (menuItemPrice != null)
            {
                return menuItemPrice.Amount;
            }

            return 0; // Handle the case where the price is not found.
        }

        public decimal GetDrinkPriceById(int drinkId)
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
        [HttpGet]
        [Route("GetAllKitchenOrders")]
        public async Task<ActionResult<List<KitchenOrderDto>>> GetAllKitchenOrders()
        {
            try
            {
                var kitchenOrders = await _repository.GetAllKitchenOrdersAsync();
                return Ok(kitchenOrders);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        //get Vat by Id
        [HttpGet]
        [Route("GetVatItem/{VatId}")]
        public async Task<IActionResult> GetVatItemAsync(int VatId)
        {
            try
            {
                var vatItem = await _repository.GetVatItemAsync(VatId);

                if (vatItem == null)
                {
                    return NotFound();
                }

                return Ok(vatItem);
            }

            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }


        }

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
