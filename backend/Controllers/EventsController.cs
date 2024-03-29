using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models;
using Data;
using Microsoft.Identity.Client;
using System.Threading.Tasks;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.Mvc.Diagnostics;

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

        [HttpGet("userEvents")]
        public async Task<ActionResult<IEnumerable<UserEvents>>> GetUserEvents(string userId)
        {
            var response = await _repo.GetUserEventsData(userId);
            return Ok(response);
        }
        [HttpPost("add/userEvent")]
        public async Task<ActionResult<UserEvents>> AddUserEvent(UserEventDTO userEvents)
        {
            var response = await _repo.CreateUserEvent(userEvents);
            return Ok(response);
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

        [HttpDelete("userEvents/delete")]
        public async Task<IActionResult> DeleteUserEvent(string userId, int eventId)
        {
            await _repo.DeleteUserEventById(userId, eventId);
            return NoContent();
        }

        [HttpGet("Tickets/getAll")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetAllTickets()
        {
            var tickets = await _repo.GetAllTickets();

            return Ok(tickets);
        }

        [HttpGet("Tickets/get/{id}")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTicketById(string id)
        {
            var ticket = await _repo.GetTicketById(id);

            return Ok(ticket);
        
        }
        [HttpGet("Tickets/purchased/{id}")]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetPurchasedTicketsById(string userId)
        {
            var ticket = await _repo.GetPurchasedTickets(userId);

            return Ok(ticket);
        }

        [HttpPost("Tickets/add")]
        public async Task<ActionResult<Ticket>> CreateTicket(TicketRequest req)
        {
            var result = await _repo.CreateTicket(req);
            return CreatedAtAction("CreateTicket", new { id = result.Id }, req);

        }

        [HttpPut("Tickets/Update")]
        public async Task<ActionResult<Ticket>> ToggleTicketAvailability(string ticketId, UpdateTicketDTO updatedEvent)
        {

            var response = await _repo.UpdateTicketAvailability(updatedEvent);
            await _context.SaveChangesAsync();

            return Ok(response);
        }


        [HttpDelete("Tickets/Delete")]
        public async Task<IActionResult> DeleteTicket (string ticketId)
        {
            await _repo.DeleteTicket(ticketId);

            return NoContent();
        } 

        [HttpGet("EventTickets")]
        public async Task<ActionResult<EventTicketDTO>> GetEventWithTickets(int eventId)
        {
            var result = await _repo.GetEventWithTickets(eventId);

            if(result.Title == null) return NotFound();

            return Ok(result);
        }



        private bool EventExists(int id)
        {
            return _context.Events.Any(e => e.Id == id);
        }
    }
}