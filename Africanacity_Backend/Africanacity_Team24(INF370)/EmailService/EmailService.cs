using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
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
            var message = new MailMessage(SenderEmail, recipientEmail)
            {
                Subject = "Employee Added",
                Body = $"Dear recipient, a new employee with the name {FirstName} has been added to the system."
            };

            await _smtpClient.SendMailAsync(message);
        }

        public Task SendEmailAsync(string recipientEmail, string subject, string message)
        {
            throw new NotImplementedException();
        }
    }
}
