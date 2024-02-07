using System.ComponentModel.DataAnnotations;

namespace Models;

public class Ticket
{
    [Key]
    public TicketId Id { get; set; }
    public int EventId { get; set; }
    public Event Event { get; set; }
    public string SellerId { get; set; }
    public string SellerName { get; set; }
    public bool Available { get; set; }
}