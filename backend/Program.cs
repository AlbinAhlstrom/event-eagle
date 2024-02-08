using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Data;
using DotNetEnv;
using Models;

DotNetEnv.Env.Load();

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("DbConnectionString") ?? throw new InvalidOperationException("Connection string 'eventContext' not found.");

builder.Services.AddDbContext<EventContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddScoped<IEventRepo, EventRepo>();

builder.Services.Configure<StripeSettings>(options =>
{
    options.PublicKey = Env.GetString("STRIPE_PUBLIC_KEY");
    options.SecretKey = Env.GetString("STRIPE_SECRET_KEY");
});





var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    SeedData.Initialize(services);
}

app.UseCors(policy =>
{
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader();
});

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();
