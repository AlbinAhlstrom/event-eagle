using Microsoft.AspNetCore.Components.Web;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;

namespace Data;
public class EventResponseDTO
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public Details Details { get; set; }
    public Location Location { get; set; }
    public ActionOption[] ActionOptions { get; set; }

}

public class Details
{
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public decimal Price { get; set; }
}

public class Location
{
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string Venue { get; set; }
    public string Address { get; set; }
}

public class ActionOption
{
    public string Name { get; set; }
    public string Uri { get; set; }
    public string Method { get; set; }
}