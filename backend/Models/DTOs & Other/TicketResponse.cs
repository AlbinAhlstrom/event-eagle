namespace Models;

public class TicketResponse
{
    public string TicketId { get; set; }
public int EventId { get; set; }
public string SellerId { get; set; }
public string  SellerName { get; set; }
public bool Available { get; set; }
public string PurchasedBy {get; set;}
}