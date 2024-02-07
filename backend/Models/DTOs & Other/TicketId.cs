namespace Models
{
    public class TicketId
    {
        private static readonly Random random = new Random();
        private static readonly object lockObject = new object();

        public string Id { get; }

        public TicketId()
        {
            lock (lockObject)
            {
                int randomNumber = random.Next(100000000, 999999999);
                Id = "ti-" + randomNumber.ToString();
            }
        }
    }
}
