import { useEffect, useState } from "react";
import { Event } from "../../util";
import BottomButton from "../components/BottomButton";
import { useClerk } from "@clerk/clerk-react";
import EditEventCard from "../../components/card/EditEventCard";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { user } = useClerk();
  const navigate = useNavigate();

  const BASE_URL = "http://event-eagle.azurewebsites.net";

  useEffect(() => {
    const EVENTS_ENDPOINT = `${BASE_URL}/Events`;
    fetch(EVENTS_ENDPOINT)
      .then((response) => response.json())
      .then((data: Event[]) => setEvents(data));
  }, []);

  const deleteEvent = async (event: Event) => {
    const BASE_URL = "http://event-eagle.azurewebsites.net";
    const EVENTS_ENDPOINT = `${BASE_URL}/Events/${event.id}`;
    const response = await fetch(EVENTS_ENDPOINT, {
      method: "DELETE",
    });
    if (response.ok) {
      setEvents(events.filter((ev) => event.id !== ev.id));
    }
  };

  const handleCreateEvent = () => {
    navigate("/events/create");
  };

  if (user?.publicMetadata.role !== "admin") {
    navigate("/home");
  }

  return (
    <div className="flex flex-col h-screen-h w-full mt-10">
      <h1 className="text-5xl font-bold mx-auto mb-default-my">
        {" "}
        Manage events
      </h1>
      <ul className="flex justify-center flex-wrap w-full gap-10">
        {events.map((event) => (
          <li key={event.id}>
            <EditEventCard event={event} deleteEvent={deleteEvent} />
          </li>
        ))}
      </ul>

      <button
        onClick={handleCreateEvent}
        className="btn btn-primary self-center fixed bottom-4 mt-auto w-40 z-50 max-md:w-2/3"
      >
        Create event
      </button>
    </div>
  );
};

export default AdminDashboard;
