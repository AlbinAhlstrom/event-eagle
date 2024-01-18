using System.ComponentModel.DataAnnotations;

namespace EventFider.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string? Title { get; set; }
    }
}