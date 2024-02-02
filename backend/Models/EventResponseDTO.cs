using Microsoft.AspNetCore.Components.Web;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;

namespace Models;
public class EventResponseDTO
{
    public EventId eventId {get; set;}
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Details Details { get; set; }
    public Location Location { get; set; }
    public ActionOption[] ActionOptions { get; set; }
}





