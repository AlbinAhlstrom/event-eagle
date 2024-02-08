using System.ComponentModel.DataAnnotations;
using Models;

namespace Models;

public class UserEvents
{
    [Key]
    public int Id { get; set; }
    public string UserId {get; set;}
    
    public int EventId { get; set; }
    public Event Event {get; set;}
    public bool CreatedByUser {get; set;} = false;
}