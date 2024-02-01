using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Data;
using Microsoft.Identity.Client;

namespace EventFider.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventContext _context;

        public EventsController(EventContext context)
        {
            _context = context;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<EventResponse>>> GetEvents()
        {
            var events = await _context.Events.ToListAsync();
            var eventResponseList = events.Select(ev => new EventResponse { 
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
                 }).ToList(); ;
            return eventResponseList;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventResponse>> GetEvent(int id)
        {
            var cd = await _context.Events.FindAsync(id);

            if (cd == null)
            {
                return NotFound();
            }

            var eventResponse = new EventResponse{
                Id = cd.Id,
                Title = cd.Title,
                Description = cd.Description,
                StartTime = cd.StartTime,
                EndTime = cd.EndTime,
                Venue = cd.Venue,
                Address = cd.Address,
                Latitude = cd.Latitude,
                Longitude = cd.Longitude,
                Price = cd.Price,
                Category = cd.Category
            };

            return eventResponse;
        }

        [HttpPost]
        public async Task<ActionResult<EventRequest>> PostCd(EventRequest newEvent)
        {
            var eventToAdd = new Event{
                Id =  newEvent.Id,
                Title =  newEvent.Title,
                Description =  newEvent.Description,
                StartTime =  newEvent.StartTime,
                EndTime =  newEvent.EndTime,
                Venue =  newEvent.Venue,
                Address =  newEvent.Address,
                Latitude =  newEvent.Latitude,
                Longitude =  newEvent.Longitude,
                Price =  newEvent.Price,
                Category =  newEvent.Category
            };

            _context.Events.Add(eventToAdd);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvent", new { id = newEvent.Id }, newEvent);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCd(int id)
        {
            var cd = await _context.Events.FindAsync(id);
            if (cd == null)
            {
                return NotFound();
            }

            _context.Events.Remove(cd);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, Event updatedEvent)
        {
            if (id != updatedEvent.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedEvent).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.Id == id);
        }
    }
}
