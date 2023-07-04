using Africanacity_Team24_INF370_.models;
using System;

namespace Africanacity_Team24_INF370_.EmailService
{
	public interface IEmailService
	{

		void SendEmail(EmailModel emailModel);
	}
}
