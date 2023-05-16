using Microsoft.AspNetCore.Mvc;

namespace Africanacity_Team24_INF370_.Controllers
{
    public class Help : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
