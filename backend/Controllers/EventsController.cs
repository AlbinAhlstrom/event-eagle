using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Data;
using Microsoft.Identity.Client;
using System.Threading.Tasks;

namespace EventFider.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventContext _context;
        private readonly IEventRepo _repo; 

        public EventsController(EventContext context, IEventRepo repo)
        {
            _context = context;
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventResponse>>> GetEvents() 
        {
            var eventResponseList = await _repo.GetAllEvents(); 

            return Ok(eventResponseList);
        }
        [HttpGet("dto")]
        public async Task<ActionResult<IEnumerable<EventResponseDTO>>> GetEventsDTO() 
        {
            var eventResponseList = await _repo.GetAllEventsDTO(); 

            return Ok(eventResponseList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EventResponse>> GetEvent(int id)
        {
            var ev = await _context.Events.FindAsync(id);

            if (ev == null) return NotFound();

            var eventResponse = await _repo.GetEventById(id); 

            return Ok(eventResponse);
        }
        [HttpGet("dto/{id}")]
        public async Task<ActionResult<EventResponse>> GetEventDTO(int id)
        {
            var ev = await _context.Events.FindAsync(id);

            if (ev == null) return NotFound();

            var eventResponse = await _repo.GetEventDTOById(id); 

            return Ok(eventResponse);
        }

        [HttpPost]
        public async Task<ActionResult<EventRequest>> PostEvent(EventRequest newEvent)
        {
            var response = await _repo.CreateEvent(newEvent); 

            return CreatedAtAction("PostEvent", new { id = response.Id }, response);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
             await _repo.DeleteEventById(id); 
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult PutEvent(int id, EventRequest updatedEvent)
        {
            if (id != updatedEvent.Id) return BadRequest();

             _repo.UpdateEventById(id, updatedEvent);

            try
            {
                _context.SaveChangesAsync();
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
