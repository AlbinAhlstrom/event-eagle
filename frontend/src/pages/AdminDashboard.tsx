import { useEffect, useState } from "react";
import { EventListing } from "../util";
import AddEventForm from "../components/EventForm";
import BottomButton from "../components/BottomButton";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from 'react-router-dom';
import EditEventCard from "../components/EditEventCard";


export const AdminDashboard = () => {
  const [events, setEvents] = useState<EventListing[]>([]);
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const BASE_URL = "http://event-eagle.azurewebsites.net";


const {user} = useClerk();

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

  const updateEvent = (event: EventListing) => {
    setIsCreating(true);
    event
  }

  const handleCreateEvent = () => {
    setIsCreating(true);
  };

  const goBack = () => setIsCreating(false);

  const navigate = useNavigate();
  
  if (isCreating) {
    return (
      <div className="flex flex-col items-center h-screen-h">
        <AddEventForm postEvent={postEvent} />
        <BottomButton onClick={goBack} text="Back to events" />
      </div>
    );
  }

  if(user?.publicMetadata.role !== "admin"){
  navigate("/home");  
  }

  return (
      <div className="flex flex-col h-screen-h">
        <h1>Events</h1>
      <ul className="flex flex-wrap gap-10">
        {events.map((event) => (
          <li key={event.id}>
            <EditEventCard event={event} onDelete={deleteEvent} onUpdate={handleCreateEvent}/>
          </li>
        ))}
      </ul>
        <BottomButton onClick={handleCreateEvent} text="Create new event" />
      </div>
  );
};

export default AdminDashboard;
