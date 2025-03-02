using Microsoft.AspNetCore.Mvc;

namespace iQuake.Controllers;
[ApiController()]
[Route("/")]
public class HomeController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok($"iQuake API {DateTime.UtcNow}");
    }
}