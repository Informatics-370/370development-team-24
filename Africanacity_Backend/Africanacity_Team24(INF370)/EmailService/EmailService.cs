using System;
using System.Threading.Tasks;
using Africanacity_Team24_INF370_.models.Inventory;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Africanacity_Team24_INF370_.EmailService
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            var emailMessage = new MimeMessage();
            var from = new MailboxAddress("MMINO Restaurant Team", _configuration["EmailSettings:From"]);
            var to = new MailboxAddress("Recipient Name", toEmail); // Use the recipient's name or leave it empty if not needed
            emailMessage.From.Add(from);
            emailMessage.To.Add(to);
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = body
            };

            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(_configuration["EmailSettings:SmtpServer"], int.Parse(_configuration["EmailSettings:Port"]), SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(_configuration["EmailSettings:Username"], _configuration["EmailSettings:Password"]);
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
        }

        public async Task CheckAndSendNotificationAsync(string itemName, int itemQuantity, int predefinedLevel)
        {
            if (itemQuantity < predefinedLevel)
            {
                // Compose the email message
                string toEmail = _configuration["EmailSettings:To"];
                string subject = "Inventory Item Stock Level Notification";
                string content = $"Inventory Item: {itemName} has reached below {predefinedLevel}. Current Stock: {itemQuantity}";

                // Send the email asynchronously
                await SendEmailAsync(toEmail, subject, content);
            }
        }
    }
}
