using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;

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
        public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
        {
            var events = await _context.Events.ToListAsync();

            return events.ToArray();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            var cd = await _context.Events.FindAsync(id);

            if (cd == null)
            {
                return NotFound();
            }

            return cd;
        }

        [HttpPost]
        public async Task<ActionResult<Event>> PostCd(Event newEvent)
        {
            _context.Events.Add(newEvent);
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
    }
}
