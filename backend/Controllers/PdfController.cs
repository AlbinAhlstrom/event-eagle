using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Azure.Storage.Blobs;
using Models;
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Data;

[Route("api/[controller]")]
[ApiController]
public class PdfController : ControllerBase
{
    private readonly BlobStorageService _blobStorageService;
    private readonly EventContext _context;
    private readonly BlobServiceClient _blobServiceClient;

    public PdfController(BlobStorageService blobStorageService, EventContext context, BlobServiceClient blobServiceClient)
    {
        _blobStorageService = blobStorageService;
        _context = context;
        _blobServiceClient = blobServiceClient;
    }

   [HttpPost("submitApplication")]
public async Task<ActionResult<Ticket>> SubmitApplicationForm([FromForm] TicketRequest ticketRequest)
{
    try
    {
        // Ensure PdfFile is not null
        if (ticketRequest.PdfFile == null)
        {
            return BadRequest("Please upload a PDF file.");
        }

        // Specify the container name
        var containerName = "pdf";

        // Upload PDF and get the URI
        var pdfFilePath = await _blobStorageService.UploadPdfAsync(containerName, ticketRequest.PdfFile, ticketRequest.TicketId);

        // Create a new Ticket
        var ticket = new Ticket
        {
            EventId = ticketRequest.EventId,
            SellerId = ticketRequest.SellerId,
            SellerName = ticketRequest.SellerName,
            Available = ticketRequest.Available,
            PdfFilePath = pdfFilePath, // Use PdfFilePath instead of PdfUri
            TicketId = ticketRequest.TicketId
        };

        // Add the ticket to the database
        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(SubmitApplicationForm), new { id = ticket.Id }, ticket);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

}
