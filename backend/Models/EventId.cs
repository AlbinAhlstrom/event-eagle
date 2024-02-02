namespace Models;
public class EventId
{
    public string Id { get; }

    public EventId()
    {
        int randomNumber;
        lock (new Random())
        {
            randomNumber = new Random().Next(100000000, 999999999);
        }

        Id = "ev-" + randomNumber.ToString();
    }
}
