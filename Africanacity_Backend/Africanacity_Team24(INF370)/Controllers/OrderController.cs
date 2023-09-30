using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;
using Africanacity_Team24_INF370_.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IRepository _Repository;
        private readonly AppDbContext _appDbContext;

        public OrderController(IRepository repository, AppDbContext appDbContext)
        {
            _Repository = repository;
            _appDbContext = appDbContext;
        }

        // GET ALL ORDERS
        /*[HttpGet]
        [Route("GetAllOrders")]
        public async Task<IActionResult> GetAllOrders()
        {
            try
            {

                var results = await _Repository.GetAllOrdersAsync();

                dynamic orders = results.Select(o => new
                {
                    o.OrderId,
                    o.TableNumber,
                    o.OrderNumber,
                    o.Order_Date,
                    Employee = o.Employee.FirstName,
                    OrderItems = o.OrderItem.ToArray(),
                    o.Subtotal,
                    o.VAT,
                    o.Discount,
                    o.Total,
                });

                return Ok(orders);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }

        }*/
        // GET ORDER BY ID
        [HttpGet]
        [Route("GetOrderById/{OrderId}")]
        public async Task<IActionResult> GetOrderById(int OrderId)
        {
            try
            {
                var result = await _Repository.GetOrderByIdAsync(OrderId);

                if (result == null) return NotFound("Order does not exist. You need to create an order first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        // ADD ORDER
        [HttpPost]
        [Route("AddOrder")]
        public async Task<IActionResult> AddOrder(OrderViewModel ovm)
        {
            if (ovm == null || ovm.OrderItems == null || ovm.OrderItems.Count == 0)
            {
                return BadRequest("Invalid order item data");
            }

            try
            { 

                var order = new Order
                { 
                    TableNumber = ovm.TableNumber, 
                    OrderNumber = GenerateOrderNumber(), 
                    EmployeeId = Convert.ToInt32(ovm.Employee),
                    VAT = ovm.VAT,
                    Discount = ovm.Discount,
                    Order_Date = DateTime.Now,
                };

                decimal total = 0;

                foreach (var otvm in ovm.OrderItems)
                {
                    var orderItem = new OrderItem
                    {
                        Drinks = otvm.Drinks,
                        DrinkQuantity = otvm.DrinkQuantity,
                        MenuItems = otvm.MenuItems,
                        MenuItemQuantity = otvm.MenuItemQuantity,
                    };

                    decimal orderItemSubtotal = CalculateOrderItemSubtotal(otvm);

                    orderItem.SubTotal = orderItemSubtotal;
                    //orderItem.Drinks.AddRange(otvm.Drinks);
                    //orderItem.MenuItems.AddRange(otvm.MenuItems);

                    total += orderItemSubtotal;

                    order.OrderItems.Add(orderItem);
                }

                order.Subtotal = total;
                order.Total = total; // ADD VAT

                // Save the order and associated order items to the database
                _appDbContext.Orders.Add(order);
                await _appDbContext.SaveChangesAsync();

                return Ok(order);
            }
            catch (Exception)
            {
                return BadRequest("Invalid Transaction");
            }
        }

        // GENERATE ORDER NUMBER
        private string GenerateOrderNumber()
        {
            return $"ORD-{DateTime.Now:yyyyMMddHHmmss}-{Guid.NewGuid()}";
        }

        // CANCEL ORDER
        // UPDATE ORDER
        [HttpPut]
        [Route("UpdateOrder/{orderId}")]
        public async Task<IActionResult> UpdateOrder(int orderId, OrderViewModel ovm)
        {
            var order = _appDbContext.Orders.Find(orderId);

            if (order == null)
            {
                return NotFound("Order not found.");
            }

            try
            {
                order.TableNumber = ovm.TableNumber;
                order.OrderNumber = ovm.OrderNumber;
                order.EmployeeId = ovm.Employee;

                decimal total = 0;

                foreach (var orderItemViewModel in ovm.OrderItems)
                {
                    var orderItem = order.OrderItems.FirstOrDefault(oi => oi.OrderId == orderItemViewModel.OrderId);

                    if (orderItem == null)
                    {
                        continue; 
                    }

                    orderItem.Drinks = orderItemViewModel.Drinks;
                    orderItem.DrinkQuantity = orderItemViewModel.DrinkQuantity;
                    orderItem.MenuItems = orderItemViewModel.MenuItems;
                    orderItem.MenuItemQuantity = orderItemViewModel.MenuItemQuantity;

                    orderItem.SubTotal = CalculateOrderItemSubtotal(orderItemViewModel);

                    total += orderItem.SubTotal;
                }

                order.Total = total;

                await _appDbContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }

            return Ok(order);
        }

        // CALCULATE SUBTOTAL
        private decimal CalculateOrderItemSubtotal(OrderItemViewModel otvm)
        {
            decimal orderItemSubtotal = 0;
            
            decimal drinkSubtotal = otvm.DrinkQuantity * Convert.ToInt32(otvm.DrinkPrice);
            decimal menuItemSubtotal = otvm.MenuItemQuantity * Convert.ToInt32(otvm.MenuItemPrice);
            orderItemSubtotal = drinkSubtotal + menuItemSubtotal;

            return orderItemSubtotal;
        }

        // GET ALL TABLE NUMBERS
        [HttpGet]
        [Route("GetAllTableNumbers")]
        public async Task<IActionResult> GetAllTableNumbers()
        {
            try
            {
                var results = await _Repository.GetAllTableNumbersAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        // GET EMPLOYEE BY ID
        [HttpGet]
        [Route("GetEmployee/{employeeId}")]
        public async Task<IActionResult> GetEmployeeAsync(int employeeId)
        {
            try
            {
                var result = await _Repository.GetEmployeeAsync(employeeId);

                if (result == null) return NotFound("Employee does not exist. You need to create an employee first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
    }
}
