using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Models;

public class Ticket
{
    public string TicketId { get; set; } = new TicketId().ToString();
    [Key]
    public int Id {get; set;}
    
    public int EventId { get; set; }
    public Event Event { get; set; }
    public string SellerId { get; set; }
    public string SellerName { get; set; }
    public bool Available { get; set; }

}

