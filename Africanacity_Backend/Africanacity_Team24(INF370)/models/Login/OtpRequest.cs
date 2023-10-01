using System.Text.Json;
using System.Text.Json.Serialization;

namespace Africanacity_Team24_INF370_.models.Login
{ 

public class OtpRequestModel
{
	[JsonIgnore]
	public string PhoneNumber { get; set; }

}

}
