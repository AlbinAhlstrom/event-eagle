using Microsoft.EntityFrameworkCore;
using Models;
using Data;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using (var context = new EventContext(
            serviceProvider.GetRequiredService<
                DbContextOptions<EventContext>>()))
        {
            if (context.Events.Any())
            {
                return;
            }
            context.Events.AddRange(
                new Event
                {
                    Title = "Event 1",
                    Description = "An event",
                    StartTime = DateTime.Parse("2024-01-26"),
                    EndTime = DateTime.Parse("2024-01-27"),
                    Venue = "A venue",
                    Address = "StreetName here",
                    Latitude = 59.34380503032283,
                    Longitude = 18.043768996272945,
                    Price = 100,
                    Category = "Music",
                }
            );
        context.SaveChanges();
        }
    }
}
