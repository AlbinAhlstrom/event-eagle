using System.ComponentModel.DataAnnotations;

namespace EventFinder.Models;

public class TempModel {
    [Key]
    public int Id { get; set; }
    public string? Name { get; set; }
}