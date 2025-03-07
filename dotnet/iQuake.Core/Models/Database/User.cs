using Microsoft.AspNetCore.Identity;

namespace iQuake.Core.Models.Database;

public class User : IdentityUser
{
    public decimal? Lat { get; set; }
    public decimal? Long { get; set; }
}