using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Data;

var builder = WebApplication.CreateBuilder(args);

// Get and update connection string
// var connectionString = builder.Configuration.GetConnectionString("SQLServerDBConnectionString") ?? throw new InvalidOperationException("Connection string 'eventContext' not found.");

// builder.Services.AddDbContext<EventContext>(options =>
//     options.UseSqlServer(connectionString));
// Add services to the container.

// builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors();

var app = builder.Build();


app.UseSwagger();
app.UseSwaggerUI();

// using (var scope = app.Services.CreateScope())
// {
//     var services = scope.ServiceProvider;

//     SeedData.Initialize(services);
// }

app.UseCors(policy =>
{
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader();
});

app.UseHttpsRedirection();

// app.UseAuthorization();

// app.MapControllers();
app.MapGet("/", () => "Hello world");

app.Run();
