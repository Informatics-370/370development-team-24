//using Twilio;
//using Twilio.Rest.Api.V2010.Account;
//using Twilio.Types;

//public class SMS_OTP
//{
//	private readonly string TwilioAccountSid = "AC990cd8ea3c4d027a78115a210649f954";
//	private readonly string TwilioAuthToken = "c9f509b594dcd47072bff65d6b52a024";
//	private readonly string TwilioPhoneNumber = "+12569523967";

//	public SMS_OTP()
//	{
//		TwilioClient.Init(TwilioAccountSid, TwilioAuthToken);
//	}

//	public void SendOTP(string recipientPhoneNumber, string otp)
//	{
//		try
//		{
//			var message = MessageResource.Create(
//				to: new PhoneNumber(recipientPhoneNumber),
//				from: new PhoneNumber(TwilioPhoneNumber),
//				body: $"Your OTP is: {otp}"
//			);
//		}
//		catch (Exception e)
//		{
//			// Handle any exceptions here
//		}
//	}
//}

using Twilio.Types;
using Twilio;
using Twilio.Rest.Api.V2010.Account;

public class SMS_OTP
{
	private readonly IConfiguration _configuration;

	public SMS_OTP(IConfiguration configuration)
	{
		_configuration = configuration;
	}

	public void SendOTP(string phoneNumber, string otp)
	{
		string username = "AC990cd8ea3c4d027a78115a210649f954"; // Replace with your Twilio Account SID key in appsettings.json
		string password = "c9f509b594dcd47072bff65d6b52a024"; // Replace with your Twilio Auth Token key in appsettings.json
		string twilioPhoneNumber = "+12569523967"; // Replace with your Twilio phone number key in appsettings.json

		TwilioClient.Init(username, password);

		var to = new PhoneNumber("+27665903505");
		var from = new PhoneNumber(twilioPhoneNumber);

		// Customize your OTP message
		var message = MessageResource.Create(
			to: to,
			from: from,
			body: $"Your OTP code is: {otp}");

		// You can handle the result or any exceptions here
		// For example, check if the message was successfully sent
		if (message.Status == MessageResource.StatusEnum.Sent)
		{
			// OTP SMS sent successfully
			// You can add logging or other handling here
		}
		else
		{
			// Handle the case where the SMS failed to send
			// You can add error handling or retry logic here
		}
	}


	

}
