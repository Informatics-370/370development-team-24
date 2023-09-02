using Africanacity_Team24_INF370_.models;
using Africanacity_Team24_INF370_.models.Administration;
using Africanacity_Team24_INF370_.models.Booking;
using Africanacity_Team24_INF370_.models.Restraurant;
using Africanacity_Team24_INF370_.View_Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging; // Import the logging namespace
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Http;

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

		//**************************************************************************** Edit Booking email *******************************************************************************
		private async Task SendBookingUpdateNotificationEmail(string recipientEmail, string recipientName, string bookingEvent)
		{
			string emailSubject = "Booking Update Notification";
			string emailBody = $@"
        <html>
        <head>
          <style>
                body {{
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f2f2f2;
                }}
                .container {{
                    background-color: #ffffff;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }}
                h1 {{
                    margin-bottom: 20px;
                }}
                p {{
                    margin: 10px 0;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <h1>Booking Update Notification</h1>
                <p>Hello Mmino Restaurant Admin,</p>
                <p>The following booking has been updated:</p>
                <p><strong>Event:</strong> {bookingEvent}</p>
                <p><strong>Customer Name:</strong> {recipientName}</p>
                <p><strong>Email:</strong> {recipientEmail}</p>
            </div>
        </body>
        </html>";

			await SendEmailAsync("africanacitymmino@gmail.com", emailSubject, emailBody);
		}

		//**************************************************************************** Booking approval email *******************************************************************************
		private async Task SendApprovalEmail(string recipientEmail, string recipientName, string recipientlastName, string recipientEvent)
		{
			string emailSubject = "Booking Approval Confirmation";
			string emailBody = $@"
        <html>
        <head>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 20px;
                    background-color: #f2f2f2;
                }}
                .container {{
                    background-color: #ffffff;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                }}
                h1 {{
                    margin-bottom: 20px;
                }}
                p {{
                    margin: 10px 0;
                }}
            </style>
        </head>
        <body>
            <div class='container'>
                <h1>Booking Approval Confirmation</h1>
                <p>Hello {recipientName},</p>
                <p>Your booking has been approved and confirmed. Here are the details:</p>
                 <p><strong>Event:</strong> {recipientEvent}</p>
                <p><strong>First Name:</strong> {recipientName}</p>
                <p><strong>Last Name:</strong> {recipientlastName}</p>
                <p><strong>Email:</strong> {recipientEmail}</p>
            </div>
        </body>
        </html>";

			await SendEmailAsync(recipientEmail, emailSubject, emailBody);
		}

		private async Task SendEmailAsync(string recipientEmail, string subject, string body)
	    {
		 var smtpClient = new SmtpClient("smtp.gmail.com")
		{
			Port = 587,
			Credentials = new NetworkCredential("africanacitymmino@gmail.com", "swcxmrsbjmhmxpny"),
			EnableSsl = true,
		};

		var mailMessage = new MailMessage
		{
			From = new MailAddress("africanacitymmino@gmail.com"),
			Subject = subject,
			Body = body,
			IsBodyHtml = true,
		};
		mailMessage.To.Add(recipientEmail);

		await smtpClient.SendMailAsync(mailMessage);
	}


		//**************************************************************************** Events *******************************************************************************t
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


		//**************************************************************************** Entertainment Type *******************************************************************************
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


			//**************************************************************************** Edit Booking *******************************************************************************
			[HttpPut]
			[Route("EditBooking/{bookingId}")]
			public async Task<IActionResult> EditBooking(int bookingId, [FromForm] IFormCollection formData)
			{
				try
				{
					var existingBooking = await _repository.GetBookingAsync(bookingId);

					if (existingBooking == null)
					{
						return NotFound($"The booking with ID {bookingId} does not exist");
					}

				// Update booking properties from the form data
				existingBooking.FirstName = formData["firstName"];
					existingBooking.LastName = formData["lastName"];
					existingBooking.Instagram = formData["Instagram"];
					existingBooking.Email = formData["email"];
					existingBooking.Eventname = formData["Eventname"];
					existingBooking.Additional = formData["Additional"];
				    //existingBooking.Entertainment_TypeId = entertainmentTypeId; 
				    existingBooking.Entertainment_TypeId = Convert.ToInt32(formData["entertainmenttype"]);
					existingBooking.ContactNumber = formData["contactNumber"];

					// Check if a new demo image was uploaded
					var file = formData.Files.FirstOrDefault();
					if (file != null && file.Length > 0)
					{
						using (var ms = new MemoryStream())
						{
							file.CopyTo(ms);
							var fileBytes = ms.ToArray();
							string base64 = Convert.ToBase64String(fileBytes);
							existingBooking.Demo = base64;
						}
					}

					// Save changes to the repository
					_repository.Update(existingBooking);
					await _repository.SaveChangesAsync();
				// Send booking update notification email to mmino restaurant admin
				await SendBookingUpdateNotificationEmail(existingBooking.Email, "Mmino Restaurant Admin", existingBooking.Eventname);

				return Ok(existingBooking);
				}
				catch (Exception ex)
				{
					return StatusCode(500, $"Internal server error: {ex}");
				}
			}



	//**************************************************************************** Delete Booking *******************************************************************************
	[HttpDelete]
		[Route("DeleteBooking/{BookingId}")]
		public async Task<IActionResult> DeleteBooking(int BookingId)
		{
			try
			{
				var existingBooking = await _repository.GetBookingAsync(BookingId);

				if (existingBooking == null) return NotFound($"The booking does not exist");

				// Retrieve the user's email address from the booking
				string userEmailAddress = existingBooking.Email;

				// Create a nicely formatted HTML email body
				string bookingDetails = $@"
            <html>
            <head>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        background-color: #f2f2f2;
                    }}
                    .container {{
                        background-color: #ffffff;
                        border-radius: 10px;
                        padding: 20px;
                        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                    }}
                    h1 {{
                        margin-bottom: 20px;
                    }}
                    p {{
                        margin: 10px 0;
                    }}
                </style>
            </head>
            <body>
                <div class='container'>
                    <h1>Booking Deletion Confirmation</h1>
                    <p>Hello,</p>
                    <p>Your booking has been successfully deleted. Here are the details:</p>
                    <p><strong>Event:</strong> {existingBooking.Eventname}</p>
                    <p><strong>First Name:</strong> {existingBooking.FirstName}</p>
                    <p><strong>Last Name:</strong> {existingBooking.LastName}</p>
                    <p><strong>Phone Number:</strong> {existingBooking.ContactNumber}</p>

                </div>
            </body>
            </html>";

				// Send the nicely formatted HTML email to the user's email address
				await SendEmailAsync(userEmailAddress, "Booking Deletion Confirmation", bookingDetails);

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



		//**************************************************************************** Request delete booking *******************************************************************************
		[HttpDelete]
		[Route("RequestDeleteBooking/{BookingId}")]
		public async Task<IActionResult> RequestBookingDeletion(int BookingId)
		{
			try
			{
				var existingBooking = await _repository.GetBookingAsync(BookingId);

				if (existingBooking == null) return NotFound($"The booking does not exist");

				// Retrieve the email address from the booking
				string senderEmail = existingBooking.Email;

				// Create a nicely formatted HTML email body
				string bookingDetails = $@"
            <html>
            <head>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                    }}
                    h1 {{
                        margin-bottom: 20px;
                    }}
                    p {{
                        margin: 10px 0;
                    }}
                </style>
            </head>
            <body>
                <h1>Booking Deletion Request</h1>
                <p><strong>Booking Event:</strong> {existingBooking.Eventname}</p>
                <p><strong>First Name:</strong> {existingBooking.FirstName}</p>
                <p><strong>Last Name:</strong> {existingBooking.LastName}</p>
                <p><strong>Phone Number:</strong> {existingBooking.ContactNumber}</p>
                <p><strong>Email:</strong> {existingBooking.Email}</p>
            </body>
            </html>";

				// Send nicely formatted HTML email to africanacitymmino@gmail.com
				await SendEmailAsync("africanacitymmino@gmail.com", "Booking Deletion Request", bookingDetails);

				return Ok("Booking deletion request sent successfully");
			}
			catch (Exception)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
			}
		}




		//**************************************************************************** Manage Delete Booking *******************************************************************************
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


		//**************************************************************************** Approved Booking *******************************************************************************
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



		//**************************************************************************** Booking waiting approval *******************************************************************************
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



		//**************************************************************************** Request Booking *******************************************************************************
		[HttpPost, DisableRequestSizeLimit]
	    [Route("RequestBk")]
	    public async Task<IActionResult> RequestBook([FromForm] IFormCollection formData)
        	{
	        	try
		          {
				// ... Your existing code ...
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


						// Send booking details via email
						string recipientEmail = "africanacitymmino@gmail.com"; // Email from form data
						string senderEmail = "africanacitymmino@gmail.com"; // Your sender email
						string senderPassword = "xuaqebsjnbxopjtx"; // Your sender email password
						string smtpServer = "smtp.gmail.com"; // SMTP server for Gmail
						int smtpPort = 587; // SMTP port for Gmail

						using (var client = new SmtpClient(smtpServer, smtpPort))
						{
							client.UseDefaultCredentials = false;
							client.Credentials = new NetworkCredential(senderEmail, senderPassword);
							client.EnableSsl = true;

							var mailMessage = new MailMessage(senderEmail, recipientEmail)
							{
								Subject = "Booking Confirmation",
								Body = "Booking Request. Here are the entertainers booking details:\n\n" +
								       $"Event: {formData["Eventname"]}\n" +
									   $"First Name: {formData["firstName"]}\n" +
									   $"Last Name: {formData["lastName"]}\n" +
									   $"Phone Number: {formData["contactNumber"]}\n" +  
									   $"Email: {formData["email"]}\n" 
									  
			                };

							await client.SendMailAsync(mailMessage);
						}

						
						_repository.Add(booking);
						await _repository.SaveChangesAsync();
					};

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



		//**************************************************************************** Make Booking *******************************************************************************
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


		//**************************************************************************** Confirmed booking *******************************************************************************
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
					// Send approval email to the user
					await SendApprovalEmail(confirmedBooking.Email, confirmedBooking.FirstName, confirmedBooking.LastName, confirmedBooking.Eventname);

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
				var innerExceptionMessage = ex.InnerException?.Message;

				_logger.LogError(ex, "An error occurred while moving the booking to confirmed.");

				return BadRequest($"Invalid transaction. Error: {ex.Message}. Inner Exception: {innerExceptionMessage}");
			}
		}



		//**************************************************************************** Get booking by id *******************************************************************************
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


		//**************************************************************************** Get booking by email *******************************************************************************
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

