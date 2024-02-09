namespace Models;

public class TicketRequest 
{
    public int EventId { get; set; }
        public string SellerId { get; set; }
        public string SellerName { get; set; }
        public bool Available { get; set; }
}