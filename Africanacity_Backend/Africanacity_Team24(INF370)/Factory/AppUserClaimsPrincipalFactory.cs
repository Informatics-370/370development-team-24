using Africanacity_Team24_INF370_.models.Login;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace Africanacity_Team24_INF370_.Factory
{
    public class AppUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<AppUser, IdentityRole>
	{
		public AppUserClaimsPrincipalFactory(UserManager<AppUser> userManager,
		RoleManager<IdentityRole> roleManager,
		IOptions<IdentityOptions> optionsAccessor)
		: base(userManager, roleManager, optionsAccessor)
		{
		}

	}
}
