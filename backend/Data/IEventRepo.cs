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

        Task<IEnumerable<EventResponseDTO>> GetAllEventsDTO();
        Task<EventResponseDTO> GetEventDTOById(int id);
        Task<IEnumerable<UserEvents>> GetUserEventsData(string userId);
        Task<UserEvents> CreateUserEvent (UserEventDTO userEvent);
        Task DeleteUserEventById(string userId, int eventId);
        Task<IEnumerable<Ticket>> GetAllTickets();
        Task<Ticket> GetTicketById(string ticketId);
        Task<Ticket> CreateTicket(TicketRequest request);
        Task<Ticket> UpdateTicketAvailability(UpdateTicketDTO req);
        Task DeleteTicket(string id);
        Task<EventTicketDTO> GetEventWithTickets(int eventId);
    }
}
