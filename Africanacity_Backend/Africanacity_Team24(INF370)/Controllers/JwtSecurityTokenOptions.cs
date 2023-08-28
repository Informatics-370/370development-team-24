using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace Africanacity_Team24_INF370_.Controllers
{
    internal class JwtSecurityTokenOptions : SecurityTokenDescriptor
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public ClaimsIdentity Subject { get; set; }
        public DateTime Expires { get; set; }
        public SigningCredentials SigningCredentials { get; set; }
    }
}