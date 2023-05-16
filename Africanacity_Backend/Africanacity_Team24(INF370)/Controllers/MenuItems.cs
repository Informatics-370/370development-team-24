using Microsoft.AspNetCore.Mvc;

namespace Africanacity_Team24_INF370_.Controllers
{
    public class MenuItems : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
