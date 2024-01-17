using System.ComponentModel.DataAnnotations;

namespace EventFinder.Models;

public class Event {
    [Key]
    public int Id { get; set; }
    public string? Name { get; set; }
}