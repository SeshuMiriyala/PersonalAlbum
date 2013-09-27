using System.Web.Http;

namespace PersonalAlbumCollection.Controllers
{
    public class HomeController : ApiController
    {
        public string Get()
        {
            var usr = User.Identity.Name;
            //return System.Web.HttpContext.Current.User.Identity.Name;
            return "Seshu";
        }
    }
}
