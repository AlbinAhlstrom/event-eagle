using Microsoft.EntityFrameworkCore;
using Models;

namespace Data
{
    public class EventRepo : IEventRepo
    {
        private readonly EventContext _context;

        public EventRepo(EventContext context)
        {
            _context = context;
        }

        public async Task<EventRequest> CreateEvent(EventRequest newEvent)
        {
            var eventToAdd = new Event
            {
                Id = newEvent.Id,
                Title = newEvent.Title,
                Description = newEvent.Description,
                StartTime = newEvent.StartTime,
                EndTime = newEvent.EndTime,
                Venue = newEvent.Venue,
                Address = newEvent.Address,
                Latitude = newEvent.Latitude,
                Longitude = newEvent.Longitude,
                Price = newEvent.Price,
                Category = newEvent.Category
            };

            _context.Events.Add(eventToAdd);
            await _context.SaveChangesAsync();

            return newEvent;
        }

        public async Task DeleteEventById(int id)
        {
            var eventToDelete = await _context.Events.FindAsync(id);

            if (eventToDelete != null)
            {
                _context.Events.Remove(eventToDelete);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<EventResponse>> GetAllEvents()
        {
            var events = await _context.Events.ToListAsync();
            var eventResponseList = events.Select(ev => new EventResponse
            {
                Id = ev.Id,
                Title = ev.Title,
                Description = ev.Description,
                StartTime = ev.StartTime,
                EndTime = ev.EndTime,
                Venue = ev.Venue,
                Address = ev.Address,
                Latitude = ev.Latitude,
                Longitude = ev.Longitude,
                Price = ev.Price,
                Category = ev.Category
            }).ToList();

            return eventResponseList;
        }

        public async Task<EventResponse> GetEventById(int id)
        {
            var eventToReturn = await _context.Events.FindAsync(id);

            if (eventToReturn != null)
            {
                var eventResponse = new EventResponse
                {
                    Id = eventToReturn.Id,
                    Title = eventToReturn.Title,
                    Description = eventToReturn.Description,
                    StartTime = eventToReturn.StartTime,
                    EndTime = eventToReturn.EndTime,
                    Venue = eventToReturn.Venue,
                    Address = eventToReturn.Address,
                    Latitude = eventToReturn.Latitude,
                    Longitude = eventToReturn.Longitude,
                    Price = eventToReturn.Price,
                    Category = eventToReturn.Category
                };

                return eventResponse;
            }

            return null;
        }

        public async Task UpdateEventById(int id, EventRequest updatedEvent)
        {

            var eventToUpdate = _context.Events.Where(e => e.Id == id).FirstOrDefault();

            eventToUpdate.Title = updatedEvent.Title;
            eventToUpdate.Description = updatedEvent.Description;
            eventToUpdate.StartTime = updatedEvent.StartTime;
            eventToUpdate.EndTime = updatedEvent.EndTime;
            eventToUpdate.Venue = updatedEvent.Venue;
            eventToUpdate.Address = updatedEvent.Address;
            eventToUpdate.Latitude = updatedEvent.Latitude;
            eventToUpdate.Longitude = updatedEvent.Longitude;
            eventToUpdate.Price = updatedEvent.Price;
            eventToUpdate.Category = updatedEvent.Category;

            var finished = _context.Events.Update(eventToUpdate);
            await _context.SaveChangesAsync();
        }





         public async Task<IEnumerable<EventResponseDTO>> GetAllEventsDTO()
        {
            var events = await _context.Events.ToListAsync();
            var eventResponseList = events.Select(ev => new EventResponseDTO
        {
            eventId = ev.eventId,
            Id = ev.Id,
            Title = ev.Title,
            Description = ev.Description,
            Details = new Details
            {
                StartTime = ev.StartTime,
                EndTime = ev.EndTime,
                Price = ev.Price
            },
            Location = new Location
            {
                Latitude = ev.Latitude,
                Longitude = ev.Longitude,
                Venue = ev.Venue,
                Address = ev.Address,
            },
            ActionOptions =
                [
                    new ActionOption
                    {
                        Name = "Get event by ID",
                        Uri = $"/Events/{ev.Id}",
                        Method = "GET"
                    },
                    new ActionOption
                    {
                        Name = "Delete event by ID",
                        Uri = $"/Events/{ev.Id}",
                        Method = "DELETE"
                    },
                    new ActionOption
                    {
                        Name = "Update event by ID",
                        Uri = $"/Events/{ev.Id}",
                        Method = "PUT"
                    }
                ]
        }).ToList();

            return eventResponseList;
        }

        public async Task<EventResponseDTO> GetEventDTOById(int id)
        {
            var eventToReturn = await _context.Events.FindAsync(id);

            if (eventToReturn != null)
            {
                var eventResponse = new EventResponseDTO
        {
            eventId = eventToReturn.eventId,
            Id = eventToReturn.Id,
            Title = eventToReturn.Title,
            Description = eventToReturn.Description,
            Details = new Details
            {
                StartTime = eventToReturn.StartTime,
                EndTime = eventToReturn.EndTime,
                Price = eventToReturn.Price
            },
            Location = new Location
            {
                Latitude = eventToReturn.Latitude,
                Longitude = eventToReturn.Longitude,
                Venue = eventToReturn.Venue,
                Address = eventToReturn.Address,
            },
            ActionOptions =
                [
                    new ActionOption
                    {
                        Name = "Get event by ID",
                        Uri = $"/Events/{eventToReturn.Id}",
                        Method = "GET"
                    },
                    new ActionOption
                    {
                        Name = "Delete event by ID",
                        Uri = $"/Events/{eventToReturn.Id}",
                        Method = "DELETE"
                    },
                    new ActionOption
                    {
                        Name = "Update event by ID",
                        Uri = $"/Events/{eventToReturn.Id}",
                        Method = "PUT"
                    }
                ]
        };

                return eventResponse;
            }

            return null;
        }

        public async Task<IEnumerable<UserEvents>> GetUserEventsData()
        {
            var userEvents = await _context.UserEvents
                                    .Include(ue => ue.Event) 
                                    .ToListAsync(); 

            return userEvents;
        }

        public async Task<UserEvents> CreateUserEvent(UserEventDTO userEvent)
        {
            var mappingObj = await _context.Events.Where(e => e.Id == userEvent.EventId).SingleOrDefaultAsync();
            var addUserEvent = new UserEvents
            {
                UserId = userEvent.UserId,
                EventId = userEvent.EventId,
                Event = mappingObj,
                CreatedByUser = userEvent.CreatedByUser
            };

            _context.UserEvents.Add(addUserEvent);
            await _context.SaveChangesAsync();

            return addUserEvent;
        }
    }
}
