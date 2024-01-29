import { useEffect, useState } from "react";
import { EventListing } from "../util";
import AddEventForm from "../components/AddEventForm";

export const AdminDashboard = () => {
  const [events, setEvents] = useState<EventListing[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const BASE_URL = "https://event-eagle.azurewebsites.net";

  // Get all events
  useEffect(() => {
    const EVENTS_ENDPOINT = `${BASE_URL}/Events`;
    fetch(EVENTS_ENDPOINT)
      .then((response) => response.json())
      .then((data: EventListing[]) => setEvents(data));
  }, []);

  // Post an event
  const postEvent = async (event: Omit<EventListing, "id">) => {
    const EVENTS_ENDPOINT = `${BASE_URL}/Events`;
    const response = await fetch(EVENTS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    const data: EventListing = await response.json();
    setEvents([...events, data]);
    // Close the form after posting the new event
    setIsCreating(false);
  };

  // Delete an event
  const deleteEvent = async (id: number) => {
    const EVENTS_ENDPOINT = `${BASE_URL}/Events/${id}`;
    const response = await fetch(EVENTS_ENDPOINT, {
      method: "DELETE",
    });
    if (response.ok) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const handleCreateEvent = () => {
    setIsCreating(true);
  };

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title}
            <button className="btn" onClick={() => deleteEvent(event.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {isCreating ? (
        <AddEventForm postEvent={postEvent} />
      ) : (
        <button className="btn" onClick={handleCreateEvent}>
          Create New Event
        </button>
      )}
    </div>
  );
};

export default AdminDashboard;
