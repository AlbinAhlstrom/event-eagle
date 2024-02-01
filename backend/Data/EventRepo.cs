using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    }
}
