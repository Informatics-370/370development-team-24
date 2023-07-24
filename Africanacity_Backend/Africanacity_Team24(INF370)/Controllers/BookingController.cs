using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Booking;
using Microsoft.AspNetCore.Mvc;

namespace Africanacity_Team24_INF370_.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BookingController : Controller
	{
			private readonly IRepository _repository;
			public BookingController(IRepository repository)
			{
				_repository = repository;
			}

			[HttpGet]
			[Route("ManageBooking")]
			public async Task<ActionResult> ManageBooking()
			{
				try
				{
					var results = await _repository.GetPendingsAsync();

					dynamic bookings = results.Select(p => new
					{
						p.Pending_BookingId,
						p.FirstName,
						EntertainmentTypeName = p.EntertainmentType.Name,
						ScheduleDate = p.Schedule.Date,
						p.LastName,
						p.Demo,
						p.Email,
						p.ContactNumber
					});

					return Ok(bookings);
				}
				catch (Exception)
				{

					return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
				}
			}

		[HttpGet]
		[Route("BookingListing")]
		public async Task<ActionResult> BookingListing()
		{
			try
			{
				var results = await _repository.GetBookingsAsync();

				dynamic bookings = results.Select(p => new
				{
					p.BookingId,
					p.FirstName,
					EntertainmentTypeName = p.EntertainmentType.Name,
					ScheduleDate = p.Schedule.Start_Time,
					p.LastName,
					p.Demo,
					p.Email,
					p.ContactNumber
				});

				return Ok(bookings);
			}
			catch (Exception)
			{

				return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
			}
		}

		[HttpPost, DisableRequestSizeLimit]
			[Route("RequestBooking")]
			public async Task<IActionResult> RequestBooking([FromForm] IFormCollection formData)
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
								
								FirstName = formData["firstname"]
								,
								LastName = formData["lastname"]
								,
								Email = formData["Email"]
								,
								ContactNumber = formData["contactnumber"]
								,
								ScheduleId = Convert.ToInt32(formData["schedule"])
								,
								EntertainmentTypeId = Convert.ToInt32(formData["entertainmenttype"])
								,
								Demo = base64
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

		[HttpPost, DisableRequestSizeLimit]
		[Route("AddBooks")]
		public async Task<IActionResult> AddBooks([FromForm] IFormCollection formData)
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

						var booking = new Bookings
						{

							FirstName = formData["firstname"]
							,
							LastName = formData["lastname"]
							,
							Email = formData["Email"]
							,
							ContactNumber = formData["contactnumber"]
							,
							ScheduleId = Convert.ToInt32(formData["schedule"])
							,
							EntertainmentTypeId = Convert.ToInt32(formData["entertainmenttype"])
							,
							Demo = base64
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


		[HttpGet]
			[Route("Schedule")]
			public async Task<ActionResult> Schedules()
			{
				try
				{
					var results = await _repository.GetSchedulesAsync();

					return Ok(results);
				}
				catch (Exception)
				{

					return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
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

		[HttpPost]
		[Route("AddBooking")]
		public async Task<IActionResult> AddBooking(BookingView cvm)
		{
			var addBooking = new Pending_Booking
			{
				LastName = cvm.lastname,
				FirstName = cvm.firstname,
				ContactNumber = cvm.phoneNumber,
				Email = cvm.email,
				Demo = cvm.Demo,
				EntertainmentTypeId = Convert.ToInt32(cvm.entertainmenttype),
				ScheduleId = Convert.ToInt32(cvm.schedule)
			};
			

			try
			{
				_repository.Add(addBooking);
				await _repository.SaveChangesAsync();
				
			}
			catch (Exception)
			{
				return BadRequest("Invalid transaction");
			}
			return Ok(addBooking);
		}

	}
}
