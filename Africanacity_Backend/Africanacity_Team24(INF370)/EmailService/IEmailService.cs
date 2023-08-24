using System.Threading.Tasks;
using Africanacity_Team24_INF370_.models.Inventory;
﻿using Africanacity_Team24_INF370_.models;

namespace Africanacity_Team24_INF370_.EmailService
{
    public interface IEmailService
    {

        Task SendEmailNotificationAsync(string toEmail, string subject, string body);
        Task CheckAndSendNotificationAsync(string itemName, int itemQuantity, int predefinedLevel);
	    void SendEmail(EmailModel emailModel);
	}
}
