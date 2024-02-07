namespace Models;
public class TicketId
{
    public string Id { get; }

    public TicketId()
    {
        int randomNumber;
        lock (new Random())
        {
            randomNumber = new Random().Next(100000000, 999999999);
        }

        Id = "ti-" + randomNumber.ToString();
    }
}
