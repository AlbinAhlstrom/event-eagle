import { useEffect, useState } from "react";
import { EventListing } from "../util";
import BottomButton from "../components/BottomButton";
import { useClerk } from "@clerk/clerk-react";
import EditEventCard from "../components/EditEventCard";
import { useNavigate } from "react-router-dom";


export const AdminDashboard = () => {
  const [events, setEvents] = useState<EventListing[]>([]);
  const {user} = useClerk();
  const navigate = useNavigate();

  const BASE_URL = "http://event-eagle.azurewebsites.net"

  useEffect(() => {
    const EVENTS_ENDPOINT = `${BASE_URL}/Events`;
    fetch(EVENTS_ENDPOINT)
      .then((response) => response.json())
      .then((data: EventListing[]) => setEvents(data));
  }, []);


  const handleCreateEvent = () => {
    navigate("/events/create")
  };

  if(user?.publicMetadata.role !== "admin"){
  navigate("/home");  
  }

  return (
      <div className="flex flex-col h-screen-h">
        <h1>Events</h1>
      <ul className="flex flex-wrap gap-10">
        {events.map((event) => (
          <li key={event.id}>
            <EditEventCard event={event}/>
          </li>
        ))}
      </ul>
        <BottomButton onClick={handleCreateEvent} text="Create new event" />
      </div>
  );
};

export default AdminDashboard;
