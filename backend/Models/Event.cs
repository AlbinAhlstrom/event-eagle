using System.ComponentModel.DataAnnotations;

namespace Models;

public class Event
{
    public EventId eventId = new();
    [Key]
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Venue { get; set; } = default!;
    public string Address { get; set; } = default!;
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; } = default!;
}