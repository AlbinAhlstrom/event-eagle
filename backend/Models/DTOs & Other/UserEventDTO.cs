namespace Models;

public class UserEventDTO
{
    public string UserId { get; set; }
    public int EventId { get; set; }
    public bool CreatedByUser { get; set; }
}