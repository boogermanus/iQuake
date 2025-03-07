using iQuake.Core.Models.Database;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace iQuake.Infrastructure;
public class iQuakeDbContext: IdentityDbContext<User>
{
    public iQuakeDbContext(DbContextOptions<iQuakeDbContext> options) : base(options) {}
}