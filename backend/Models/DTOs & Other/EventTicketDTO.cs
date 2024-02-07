namespace Models;

public class EventTicketDTO
{
    public int EventId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Venue { get; set; }
    public string Address { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
    public List<TicketResponse> EventTickets { get; set; }
}