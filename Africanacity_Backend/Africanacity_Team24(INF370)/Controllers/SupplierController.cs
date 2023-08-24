using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Inventory;
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
    public class SupplierController : Controller
    {

            private readonly IRepository _Repository;
            private readonly AppDbContext _appDBContext;

            public SupplierController(IRepository Repository, AppDbContext context)
            {
                _Repository = Repository;
                _appDBContext = context;
            }

        [HttpGet]
        [Route("GetAllSuppliers")]
        public async Task<ActionResult> GetAllSuppliers()
        {
            try
            {

                var results = await _Repository.GetAllSuppliersAsync();


                dynamic suppliers = results.Select(s => new
                {
                    s.SupplierId,

                    s.SupplierName,

                    SupplierTypeName = s.Supplier_Type.Name,
                      
                    //SupplierTypeId = s.Supplier_TypeId,

                    s.PhoneNumber,

                    s.Email_Address,

                    s.Physical_Address

                });
                         
                return Ok(suppliers);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
         }

        [HttpGet]
        [Route("GetAllSupplierTypes")]
        public async Task<IActionResult> GetAllSupplierTypes()
        {
            try
            {
                var results = await _Repository.GetAllSupplierTypesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }

        }

            [HttpGet]
            [Route("GetSupplier/{supplierId}")]
            public async Task<IActionResult> GetSupplierAsync(int supplierId)
            {
                try
                {
                    var result = await _Repository.GetSupplierAsync(supplierId);


                    if (result == null) return NotFound("Supplier does not exist. You need to create an Supplier first");

                    return Ok(result);
                }
                catch (Exception)
                {
                    return StatusCode(500, "Internal Server Error. Please contact support");
                }
            }

        // Add Supplier

        [HttpPost]
        [Route("AddSupplier")]
        public async Task<IActionResult> AddSupplier(SupplierViewModel svm)
        {
            var supplier = new Supplier { 
                SupplierName = svm.SupplierName, 
                Supplier_TypeId = Convert.ToInt32(svm.SupplierType),
                Email_Address = svm.Email_Address,
                PhoneNumber = svm.PhoneNumber,
                Physical_Address = svm.Physical_Address
                };

            try
            {
                _Repository.Add(supplier);
                await _Repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // fix error message
                return BadRequest("Invalid Transaction");
            }

            return Ok(supplier);

        }



        //Update Supplier

        [HttpPut]
            [Route("EditSupplier/{supplierId}")]
            public async Task<ActionResult<SupplierViewModel>> EditSupplier(int supplierId, SupplierViewModel svm)
            {
                try
                {
                    var currentSupplier = await _Repository.GetSupplierAsync(supplierId);
                    if (currentSupplier == null) return NotFound($"The supplier does not exist");

                    currentSupplier.SupplierName = svm.SupplierName;
                    currentSupplier.Email_Address = svm.Email_Address;
                    currentSupplier.Supplier_TypeId = Convert.ToInt32(svm.SupplierType);
                    currentSupplier.PhoneNumber = svm.PhoneNumber;
                    currentSupplier.Physical_Address = svm.Physical_Address;

                    if (await _Repository.SaveChangesAsync())
                    {
                        return Ok(currentSupplier);
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
            [Route("DeleteSupplier/{supplierId}")]
            public async Task<IActionResult> DeleteSupplier(int supplierId)
            {
                try
                {
                    var currentSupplier = await _Repository.GetSupplierAsync(supplierId);

                    if (currentSupplier == null) return NotFound($"The supplier does not exist");

                    _Repository.Delete(currentSupplier);

                    if (await _Repository.SaveChangesAsync()) return Ok(currentSupplier);

                }
                catch (Exception)
                {
                    return StatusCode(500, "Internal Server Error. Please contact support.");
                }
                return BadRequest("Your request is invalid.");
            }

   
        }

      
    }

