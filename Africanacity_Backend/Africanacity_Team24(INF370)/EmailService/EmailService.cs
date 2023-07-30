using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
﻿using Africanacity_Team24_INF370_.models;

using SmtpClient = System.Net.Mail.SmtpClient;

namespace Africanacity_Team24_INF370_.EmailService
{
	public class EmailService : IEmailService
	{

        private readonly SmtpClient _smtpClient;
        private const string SenderEmail = "lavanianaidoo13@gmail.com";
        private const string SenderPassword = "Shimmering123";

        public EmailService()
        {
            _smtpClient = new SmtpClient("smtp.gmail.com", 587)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(SenderEmail, SenderPassword),
                EnableSsl = true
            };
        }

        public async Task SendEmployeeAddedEmailAsync(string recipientEmail, string FirstName)
        {
            var emailMessage = new MimeMessage();
            var from = new MailboxAddress("MMINO Restaurant Team", _configuration["EmailSettings1:From"]);
            var to = new MailboxAddress("Recipient Name", toEmail); // Use the recipient's name or leave it empty if not needed
            emailMessage.From.Add(from);
            emailMessage.To.Add(to);
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            var message = new MailMessage(SenderEmail, recipientEmail)
            {
                Subject = "Employee Added",
                Body = $"Dear recipient, a new employee with the name {FirstName} has been added to the system."
            };

            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(_configuration["EmailSettings1:SmtpServer"], int.Parse(_configuration["EmailSettings1:Port"]), SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(_configuration["EmailSettings1:Username"], _configuration["EmailSettings1:Password"]);
                    await client.SendAsync(emailMessage);
                }
                catch (Exception ex)
                {
                    throw new ApplicationException("Failed to send the email. " + ex.Message);
                }
                finally
                {
                    await client.DisconnectAsync(true);
                }
            }
            await _smtpClient.SendMailAsync(message);
        }

        public Task SendEmailAsync(string recipientEmail, string subject, string message)
        {
            if (itemQuantity < predefinedLevel)
            {
                // Compose the email message
                string toEmail = _configuration["EmailSettings1:To"];
                string subject = "Inventory Item Stock Level Notification";
                string content = $"Inventory Item: {itemName} has reached below {predefinedLevel}. Current Stock: {itemQuantity}";

                // Send the email asynchronously
                await SendEmailAsync(toEmail, subject, content);
            }
            throw new NotImplementedException();
        }

		public void SendEmail(EmailModel emailModel)
		{
			var emailMessage = new MimeMessage();
			var from = _configuration["EmailSettings:From"];
			emailMessage.From.Add(new MailboxAddress("MMINO Restaurant Team", from));
			emailMessage.To.Add(new MailboxAddress(emailModel.To, emailModel.To));
			emailMessage.Subject = emailModel.Subject;
			emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
			{
				Text = string.Format(emailModel.Content)
			};

			using (var client = new SmtpClient())
			{
				try
				{
					client.Connect(_configuration["EmailSettings:SmtpServer"], 465, true);
					client.Authenticate(_configuration["EmailSettings:From"], _configuration["EmailSettings:Password"]);
					client.Send(emailMessage);
				}
				catch (Exception ex)
				{
					throw;
				}
				finally
				{
					client.Disconnect(true);
					client.Dispose();
				}
			}
		}
	}
}

