using Microsoft.EntityFrameworkCore;
using Models;
namespace Data;
public class EventContext : DbContext
    {
        public EventContext (DbContextOptions<EventContext> options)
            : base(options)
        {
        }

        public DbSet<Event> Events { get; set; } = default!;
        public DbSet<UserEvents> UserEvents { get; set; } = default!;
        public DbSet<Ticket> Tickets {get; set;} = default!;


protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ticket>()
                .HasKey(t => t.Id);


            base.OnModelCreating(modelBuilder);
        }
}
