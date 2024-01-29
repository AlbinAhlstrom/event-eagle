import { useEffect, useState } from "react";
import { EventListing } from "../util";
import AddEventForm from "../components/AddEventForm";
import EventsOverview from "../components/EventsOverview";
import BottomButton from "../components/BottomButton";

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

  const goBack = () => setIsCreating(false);

  if (isCreating) {
    return (
      <div className="flex flex-col items-center">
        <AddEventForm postEvent={postEvent} />
        <BottomButton onClick={goBack} text="Back to events" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <EventsOverview events={events} deleteEvent={deleteEvent} />
      <BottomButton onClick={handleCreateEvent} text="Create new event" />
    </div>
  );
};

export default AdminDashboard;
