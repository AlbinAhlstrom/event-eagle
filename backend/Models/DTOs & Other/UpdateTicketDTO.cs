namespace Models;

public class UpdateTicketDTO 
{
    public string TicketId { get; set; }
    public bool Available { get; set; }
    public string PurchasedBy {get; set;}
}