using Africanacity_Team24_INF370_.models.Inventory;
using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.View_Models;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Africanacity_Team24_INF370_.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class SupplierTypeController : Controller
    {

        private readonly IRepository _Repository;
        private readonly AppDbContext _appDBContext;

        public SupplierTypeController(IRepository Repository, AppDbContext context)
        {
            _Repository = Repository;
            _appDBContext = context;
        }


        // Get all suppliers types, from the database

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
        [Route("GetSupplierType/{supplier_typeId}")]
        public async Task<IActionResult> GetSupplierTypeAsync(int supplier_typeId)
        {
            try
            {
                var result = await _Repository.GetSupplierAsync(supplier_typeId);

                if (result == null) return NotFound("Supplier does not exist. You need to create an Supplier first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        // Add SupplierType

        [HttpPost]
        [Route("AddSupplierType")]
        public async Task<IActionResult> AddSupplier(SupplierTypeViewModel stvm)
        {
            var suppliertype = new Supplier_Type { Name = stvm.Name, Description = stvm.Description};

            try
            {
                _Repository.Add(suppliertype);
                await _Repository.SaveChangesAsync();
            }
            catch (Exception)
            {
                // fix error message
                return BadRequest("Invalid Transaction");
            }

            return Ok(suppliertype);

        }

        //Update SupplierType

        [HttpPut]
        [Route("EditSupplierType/{supplier_typeId}")]
        public async Task<ActionResult<SupplierTypeViewModel>> EditSupplierType(int supplier_typeId, SupplierTypeViewModel stvm)
        {
            try
            {
                var currentSupplierType = await _Repository.GetSupplierTypeAsync(supplier_typeId);
                if (currentSupplierType == null) return NotFound($"The supplier does not exist");

                currentSupplierType.Name = stvm.Name;
                currentSupplierType.Description = stvm.Description;

                if (await _Repository.SaveChangesAsync())
                {
                    return Ok(currentSupplierType);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        // Delete SupplierType
        [HttpDelete]
        [Route("DeleteSupplierType/{supplier_typeId}")]
        public async Task<IActionResult> DeleteSupplierType(int suppiler_TypeId)
        {
            try
            {
                var currentSupplierType = await _Repository.GetSupplierTypeAsync(suppiler_TypeId);

                if (currentSupplierType == null) return NotFound($"The supplier does not exist");

                _Repository.Delete(currentSupplierType);

                if (await _Repository.SaveChangesAsync()) return Ok(currentSupplierType);

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<Supplier_Type>> Search(string searchTerm)
        {
            var Supplier_Type = _appDBContext.Supplier_Types
                .Where(n => n.Name.Contains(searchTerm))
                .ToList();

            return Ok(Supplier_Type);
        }

    }

}

