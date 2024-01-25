using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Models;
namespace Data{
public class EventContext : DbContext
    {
        public EventContext (DbContextOptions<EventContext> options)
            : base(options)
        {
        }

        public DbSet<Event> Events { get; set; } = default!;
}
}
    

// protected override void OnModelCreating(ModelBuilder modelBuilder)
// {
    // var event1 = new Event
    // {
    //     Id = 1,
    //     Title = "Jazz by the Waterfront",
    //     Category = "Music",
    //     Description = "Delight in the melodic swag tunes of live jazz as you watch the sunset by the waterfront.",
    //     StartTime = DateTime.Parse("2024-01-19T16:00:00.000"),
    //     EndTime = DateTime.Parse("2024-01-19T16:30:00.000"),
    //     Venue = "Waterfront Stage",
    //     Address = "Strandvägen 1, 114 51 Stockholm, Sweden",
    //     Latitude = 59.330680,
    //     Longitude = 18.076220,
    //     Price = 220.00M
    // };

    // var event2 = new Event
    // {
    //     Id = 2,
    //     Title = "Family Fun Run",
    //     Category = "Sports",
    //     Description = "Get your sneakers ready for a family-friendly 5k run around the scenic Djurgården!",
    //     StartTime = DateTime.Parse("2024-01-20T08:00:00.000"),
    //     EndTime = DateTime.Parse("2024-01-20T08:30:00.000"),
    //     Venue = "Djurgården Run Trail",
    //     Address = "Djurgårdsvägen 6-16, 115 21 Stockholm, Sweden",
    //     Latitude = 59.325117,
    //     Longitude = 18.103896,
    //     Price = 100.00M
    // };

    // var event3 = new Event
    // {
    //     Id = 3,
    //     Title = "The Winter's Tale",
    //     Category = "Arts",
    //     Description = "Witness one of the most enchanting winter plays by Shakespeare at the Royal Dramatic Theatre.",
    //     StartTime = DateTime.Parse("2024-01-20T15:30:00.000"),
    //     EndTime = DateTime.Parse("2024-01-20T15:30:00.000"),
    //     Venue = "The Royal Dramatic Theatre",
    //     Address = "Nybroplan, 111 47 Stockholm, Sweden",
    //     Latitude = 59.330923,
    //     Longitude = 18.076842,
    //     Price = 350.00M
    // };

    // var event4 = new Event
    // {
    //     Id = 4,
    //     Title = "Children's Art Workshop",
    //     Category = "Family",
    //     Description = "A fun and interactive art workshop for children aged 5-10, exploring painting and sculpture.",
    //     StartTime = DateTime.Parse("2024-01-21T10:00:00.000"),
    //     EndTime = DateTime.Parse("2024-01-21T10:30:00.000"),
    //     Venue = "Stockholm Art Hub",
    //     Address = "Södermalmstorg 4, 116 45 Stockholm, Sweden",
    //     Latitude = 59.319882,
    //     Longitude = 18.071957,
    //     Price = 150.00M
    // };

    // modelBuilder.Entity<Event>().HasData(event1, event2, event3, event4);

//     base.OnModelCreating(modelBuilder);
// }
// }
