namespace Africanacity_Team24_INF370_.EmailService
{
	public interface IEmailService
	{
        Task SendEmailAsync(string recipientEmail, string subject, string message);
    }
}
