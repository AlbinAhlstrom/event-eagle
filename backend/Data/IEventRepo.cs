using System.Collections.Generic;
using System.Threading.Tasks;
using Models;

namespace Data
{
    public interface IEventRepo
    {
        Task<IEnumerable<EventResponse>> GetAllEvents();
        Task<EventResponse> GetEventById(int id);
        Task UpdateEventById(int id, EventRequest updatedEvent);
        Task DeleteEventById(int id);
        Task<EventRequest> CreateEvent(EventRequest request);
    }
}
