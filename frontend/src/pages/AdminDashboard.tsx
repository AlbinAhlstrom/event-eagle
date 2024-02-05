import { useEffect, useState } from "react";
import { EventListing } from "../util";
import BottomButton from "../components/BottomButton";
import { useClerk } from "@clerk/clerk-react";
import EditEventCard from "../components/EditEventCard";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
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

  const deleteEvent = async (event: EventListing) => {
    const BASE_URL = "http://event-eagle.azurewebsites.net"
    const EVENTS_ENDPOINT = `${BASE_URL}/Events/${event.id}`;
    const response = await fetch(EVENTS_ENDPOINT, {
      method: "DELETE",
    });
    if (response.ok) {
      setEvents(events.filter((ev) => event.id !== ev.id));
    }
  };


  const handleCreateEvent = () => {
    navigate("/events/create")
  };

  if(user?.publicMetadata.role !== "admin"){
  navigate("/home");  
  }

  return (
      <div className="flex flex-col h-screen-h items-center w-full ">
        <h1 className="text-5xl font-bold m-5"> Admin Dashboard</h1>
      <ul className="flex justify-center flex-wrap w-2/3 gap-10">
        {events.map((event) => (
          <li key={event.id}>
            <EditEventCard event={event} deleteEvent={deleteEvent}/>
          </li>
        ))}
      </ul>
        <BottomButton onClick={handleCreateEvent} text="Create new event" />
      </div>
  );
};

export default AdminDashboard;
