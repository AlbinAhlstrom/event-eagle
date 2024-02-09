using System;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Ticket
    {
        [Key]
        public int Id { get; set; }
        public string TicketId { get; set; }
        public int EventId { get; set; }
        public Event Event { get; set; }
        public string SellerId { get; set; }
        public string SellerName { get; set; }
        public bool Available { get; set; } = true;
        public string? PurchasedBy { get; set; }

        public Ticket()
        {
            TicketId = $"ti-{GenerateShortGuid()}";
        }

        private static string GenerateShortGuid()
        {
            return Guid.NewGuid().ToString("N").Substring(0, 10);
        }
    }
}
