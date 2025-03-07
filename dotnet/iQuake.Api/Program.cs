using iQuake.Core.Models.Database;
using iQuake.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Permutate.Core.Auth.Interfaces;
using Permutate.Core.Auth.Services;

var builder = WebApplication.CreateBuilder(args);
builder.WebHost.UseUrls("http://localhost:5007");
builder.Services.AddControllers();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpContextAccessor();

// database setup
var connStr = builder.Configuration.GetConnectionString("DefaultConnection") ??
    throw new Exception("Connection string 'DefaultConnection' not found");
builder.Services.AddDbContext<iQuakeDbContext>(options => options.UseSqlite(connStr));
builder.Services.AddDefaultIdentity<User>(options =>
{
    options.User.RequireUniqueEmail = true;
    options.Password.RequireDigit = false;
})
.AddEntityFrameworkStores<iQuakeDbContext>();

// register custom services
builder.Services.AddTransient<IUserService, UserService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.MapControllers();
app.Run();

