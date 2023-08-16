using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Booking;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging; // Import the logging namespace

namespace Africanacity_Team24_INF370_.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BookingController : Controller
	{
		private readonly IRepository _repository;
		private readonly ILogger<BookingController> _logger;
		public BookingController(IRepository repository, ILogger<BookingController> logger)
		{
			_repository = repository;
			_logger = logger;
		}


		[HttpGet]
		[Route("GetAllEvents")]
		public async Task<IActionResult> GetAllEvents()
		{
			try
			{
				var results = await _repository.GetAllEventsAsync();
				return Ok(results);
			}
			catch (Exception)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error.Contact Support");
			}
		}


		[HttpGet]
		[Route("EntertainmentTypes")]
		public async Task<ActionResult> EntertainmentTypes()
		{
			try
			{
				var results = await _repository.GetEntertainmentTypesAsync();

				return Ok(results);
			}
			catch (Exception)
			{

				return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
			}
		}

		// Edit Booking
		[HttpPut]
		[Route("EditBooking/{BookingId}")]
		public async Task<ActionResult<BookingView>> EditBooking(int BookingId, BookingView cvm)
		{
			try
			{
				var existinBooking = await _repository.GetBookingAsync(BookingId);

				// fix error message
				if (existinBooking == null) return NotFound($"The booking does not exist");

				existinBooking.LastName = cvm.LastName;
				existinBooking.FirstName = cvm.FirstName;
				existinBooking.Instagram = cvm.Instagram;
				existinBooking.ContactNumber = cvm.ContactNumber;
				existinBooking.Email = cvm.Email;
				existinBooking.Eventname = cvm.Eventname;
				existinBooking.Additional = cvm.Additional;
				existinBooking.Demo = cvm.Demo;
				existinBooking.Entertainment_TypeId = Convert.ToInt32(cvm.entertainmenttype);

				if (await _repository.SaveChangesAsync())
				{
					return Ok(existinBooking);
				}
			}
			catch (Exception)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
			}
			return BadRequest("Your request is invalid");
		}

		// Delete booking
		[HttpDelete]
		[Route("DeleteBooking/{BookingId}")]
		public async Task<IActionResult> DeleteBooking(int BookingId)
		{
			try
			{
				var existingBooking = await _repository.GetBookingAsync(BookingId);

				// fix error message
				if (existingBooking == null) return NotFound($"The booking does not exist");

				_repository.Delete(existingBooking);

				if (await _repository.SaveChangesAsync())
				{
					return Ok(existingBooking);
				}
			}
			catch (Exception)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
			}
			return BadRequest("Your request is invalid");
		}


		//Manage Delete booking
		[HttpDelete]
		[Route("ManageDeleteBooking/{BookingId}")]
		public async Task<IActionResult> ManageDeleteBooking(int BookingId)
		{
			try
			{
				var existingBooking = await _repository.GetPendingAsync(BookingId);

				// fix error message
				if (existingBooking == null) return NotFound($"The booking does not exist");

				_repository.Delete(existingBooking);

				if (await _repository.SaveChangesAsync())
				{
					return Ok(existingBooking);
				}
			}
			catch (Exception)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
			}
			return BadRequest("Your request is invalid");
		}
		// Booking that where approved
		[HttpGet]
		[Route("BookedListing")]
		public async Task<ActionResult> ManageBooked()
		{
			try
			{
				var results = await _repository.GetBookingsAsync();

				dynamic bookings = results.Select(p => new
				{
					p.BookingId,
					p.FirstName,
					p.Instagram,
					p.LastName,
					EntertainmentTypeName = p.EntertainmentType.Name,
					p.ContactNumber,
					p.Additional,
					p.Eventname,
					p.Email,
					p.Demo,

				});

				return Ok(bookings);
			}
			catch (Exception)
			{

				return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
			}
		}


		////Booking listing waiting approval
		//[HttpGet]
		//[Route("ManageBookedListing")]
		//public async Task<ActionResult> BookedListing()
		//{
		//	try
		//	{
		//		var results = await _repository.GetPendingsAsync();

		//		dynamic bookings = results.Select(p => new
		//		{
		//			p.Pending_BookingId,
		//			p.FirstName,
		//			p.Instagram,
		//			p.LastName,
		//			EntertainmentTypeName = p.EntertainmentType.Name,
		//			p.ContactNumber,
		//			p.Additional,
		//			p.Eventname,
		//			p.Email,
		//			p.Demo,

		//		});

		//		return Ok(bookings);
		//	}
		//	catch (Exception)
		//	{

		//		return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
		//	}
		//}

		// Booking listing waiting approval
		[HttpGet]
		[Route("ManageBookedListing")]
		public async Task<ActionResult> BookedListing()
		{
			try
			{
				var results = await _repository.GetPendingsAsync();

				var bookings = results.Select(p => new
				{
					p.Pending_BookingId,
					p.FirstName,
					p.Instagram,
					p.LastName,
					EntertainmentTypeName = p.EntertainmentType.Name,
					p.ContactNumber,
					p.Additional,
					p.Eventname,
					p.Email,
					p.Demo
				});

				return Ok(bookings);
			}
			catch (Exception)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
			}
		}

		//[HttpPost, DisableRequestSizeLimit]
		//[Route("RequestBk")]
		//public async Task<IActionResult> RequestBook([FromForm] IFormCollection formData)
		//{
		//	try
		//	{
		//		var formCollection = await Request.ReadFormAsync();

		//		var file = formCollection.Files.First();
		//		if (file.Length > 0)
		//		{
		//			// Generate a unique filename
		//			var uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

		//			// Store the file on disk
		//			var filePath = Path.Combine("path_to_your_upload_folder", uniqueFileName);
		//			using (var stream = new FileStream(filePath, FileMode.Create))
		//			{
		//				await file.CopyToAsync(stream);
		//			}

		//			var booking = new Pending_Booking
		//			{
		//				// Populate other fields from formData
		//				FirstName = formData["firstName"],
		//				Instagram = formData["Instagram"],

		//				LastName = formData["lastName"]
		//									,
		//				Email = formData["email"]
		//									,
		//				Eventname = formData["Eventname"]
		//									,
		//				Additional = formData["Additional"]
		//									,

		//				Entertainment_TypeId = Convert.ToInt32(formData["entertainmenttype"]),
		//				// ...

		//				// Store the file path
		//				Demo = filePath,
		//				ContactNumber = formData["contactNumber"]
		//			};

		//			_repository.Add(booking);
		//			await _repository.SaveChangesAsync();

		//			return Ok();
		//		}
		//		else
		//		{
		//			return BadRequest();
		//		}
		//	}
		//	catch (Exception ex)
		//	{
		//		return StatusCode(500, $"Internal server error: {ex}");
		//	}
		//}

		//Request to make booking
		[HttpPost, DisableRequestSizeLimit]
		[Route("RequestBk")]
		public async Task<IActionResult> RequestBook([FromForm] IFormCollection formData)
		{
			try
			{

				var formCollection = await Request.ReadFormAsync();

				var file = formCollection.Files.First();

				if (file.Length > 0)
				{

					using (var ms = new MemoryStream())
					{
						file.CopyTo(ms);
						var fileBytes = ms.ToArray();
						string base64 = Convert.ToBase64String(fileBytes);


						var booking = new Pending_Booking
						{
							FirstName = formData["firstName"]
							,
							Instagram = formData["Instagram"]
							,
							LastName = formData["lastName"]
							,
							Email = formData["email"]
							,
							Eventname = formData["Eventname"]
							,
							Additional = formData["Additional"]
							,

							Entertainment_TypeId = Convert.ToInt32(formData["entertainmenttype"])
							,
							Demo = base64
							,
							ContactNumber = formData["contactNumber"]
						};


						_repository.Add(booking);
						await _repository.SaveChangesAsync();
					}

					return Ok();
				}
				else
				{
					return BadRequest();
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex}");
			}
		}

		// Add Booking
		[HttpPost, DisableRequestSizeLimit]
		[Route("AddBk")]
		public async Task<IActionResult> AddBooking([FromForm] IFormCollection formData)
		{
			try
			{
				var formCollection = await Request.ReadFormAsync();

				var file = formCollection.Files.First();

				if (file.Length > 0)
				{

					using (var ms = new MemoryStream())
					{
						file.CopyTo(ms);
						var fileBytes = ms.ToArray();
						string base64 = Convert.ToBase64String(fileBytes);


						var book = new Bookings
						{
							FirstName = formData["firstName"]
							,
							Instagram = formData["Instagram"]
							,
							LastName = formData["lastName"]
							,
							Email = formData["email"]
							,
							Entertainment_TypeId = Convert.ToInt32(formData["entertainmenttype"])
									,
							Eventname = formData["Eventname"]
							,
							Additional = formData["Additional"]
							,
							Demo = base64
							,
							ContactNumber = formData["contactNumber"]
						};


						_repository.Add(book);
						await _repository.SaveChangesAsync();
					}

					return Ok();
				}
				else
				{
					return BadRequest();
				}
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex}");
			}
		}

		[HttpPost]
		[Route("MoveBookingToConfirmed/{BookingId}")]
		public async Task<IActionResult> MoveBookingToConfirmed(int BookingId)
		{
			try
			{
				var pendingBooking = await _repository.GetPendingAsync(BookingId);
				if (pendingBooking == null) return NotFound($"The pending booking does not exist");

				// Create a new Booking object based on the pending booking
				var confirmedBooking = new Bookings
				{

					FirstName = pendingBooking.FirstName,
					LastName = pendingBooking.LastName,
					Instagram = pendingBooking.Instagram,
					Email = pendingBooking.Email,
					Eventname = pendingBooking.Eventname,
					Additional = pendingBooking.Additional,
					Entertainment_TypeId = pendingBooking.Entertainment_TypeId,
					Demo = pendingBooking.Demo,
					ContactNumber = pendingBooking.ContactNumber
				};

				_repository.Delete(pendingBooking); // Delete the pending booking
				_repository.Add(confirmedBooking); // Add the confirmed booking

				if (await _repository.SaveChangesAsync())
				{
					return Ok(confirmedBooking);
				}
				else
				{
					return StatusCode(StatusCodes.Status500InternalServerError, "Failed to save changes to the database.");
				}
			}
			catch (Exception ex)

			{
				// Log the exception message and stack trace
				var innerExcept = ex.InnerException?.Message;

				_logger.LogError(ex, "An error occurred while moving the booking to confirmed.");

				return BadRequest($"Invalid transaction. Error. {ex.Message}. Inner Exception: {innerExcept}");
			}
		}

		[HttpGet]
		[Route("GetBooking/{bookingId}")]
		public async Task<IActionResult> GetBookingAsync(int bookingId)
		{
			try
			{
				var result = await _repository.GetBookingAsync(bookingId);

				if (result == null) return NotFound("Booking does not exist. You need to create an booking first");

				return Ok(result);
			}
			catch (Exception)
			{
				return StatusCode(500, "Internal Server Error. Please contact support");
			}
		}


		[HttpGet("GetBookingInfor/{email}")]
		public async Task<IActionResult> GetBookingInfor(string email)
		{
			try
			{
				var result = await _repository.GetBookingInforAsync(email);

				if (result == null || result.Count == 0)
					return NotFound("Booking does not exist. You need to create a booking first");

				// Map the entertainmenttype to entertainmenttypeName in the response
				var mappedResult = result.Select(booking => new
				{
					booking.BookingId,
					booking.FirstName,
					booking.LastName,
					booking.Email,
					booking.Instagram,
					booking.ContactNumber,
					booking.Eventname,
					booking.Additional,
					booking.Demo,
					EntertainmentTypeName = booking.EntertainmentType.Name, // Assuming the entertainment type name is stored in the Name property of the EntertainmentType
					/*Event = booking.Event.Name*/ // Assuming the entertainment type name is stored in the Name property of the EntertainmentType
				});

				return Ok(mappedResult);
			}
			catch (Exception)
			{
				return StatusCode(500, "Internal Server Error. Please contact support");
			}
		}


	}
}
