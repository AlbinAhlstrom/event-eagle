import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { useClerk } from "@clerk/clerk-react";
import { Event } from "../util";
import { useNavigate } from "react-router-dom";

const SavedEvents: React.FC = () => {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const {user} = useClerk();
  const navigate = useNavigate();

  const fetchUserEvents = async () => {
    const response = await fetch(
      `https://event-eagle.azurewebsites.net/Events/userEvents?userId=${user?.id}`,
    );
    const data = await response.json();
    setSavedEvents(data);
  };

  
  const updateSavedEvents = async () => {
    await fetchUserEvents();
  };

  useEffect(() => {
    fetchUserEvents();

    
  }, []);
  
  
  const handleBackToListClick = () => {
    navigate(-1);
  }
  
  
  console.log(savedEvents);
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h1 className="text-5xl font-bold">Saved Events</h1>
      <button className="btn btn-primary mt-5" onClick={handleBackToListClick}>Back to list</button>
      <div className="flex gap-10 flex-wrap justify-center mt-10 ">

      {savedEvents.map((ev, index) => {
        return (
          <EventCard
          key={index}
          event={ev}
          updateSavedEvents={updateSavedEvents}
          />
          );
        })}
        </div>
    </div>
  );
};

export default SavedEvents;
