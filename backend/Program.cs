using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Fetch environment variable first
var password = Environment.GetEnvironmentVariable("DB_PASSWORD");

// Get and update connection string
var connectionString = builder.Configuration.GetConnectionString("eventContext") ?? throw new InvalidOperationException("Connection string 'eventContext' not found.");
connectionString = connectionString.Replace("{DB_PASSWORD}", password);

builder.Services.AddDbContext<EventContext>(options =>
    options.UseSqlServer(connectionString));
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
