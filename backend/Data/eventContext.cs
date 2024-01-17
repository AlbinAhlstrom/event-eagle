using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using EventFinder.Models;

    public class eventContext : DbContext
    {
        public eventContext (DbContextOptions<eventContext> options)
            : base(options)
        {
        }

        public DbSet<EventFinder.Models.Event> Event { get; set; } = default!;
    }
