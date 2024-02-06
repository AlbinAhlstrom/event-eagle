import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { useClerk } from "@clerk/clerk-react";
import { Event, fetchUserEvents, updateSavedEvents } from "../util";
import { useNavigate } from "react-router-dom";

const SavedEvents: React.FC = () => {
  const [savedEvents, setSavedEvents] = useState<Event[]>([]);
  const { user } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    const fetcher = async () => {
      if (user) {
        const data = await fetchUserEvents(user.id);
        await setSavedEvents(data);
        console.log(data);
      }
    };

    fetcher();
  }, []);


  const handleBackToListClick = () => {
    navigate(-1);
  };

  const handleUpdateSaveEvent = async (id: string) => {
    if (user) {
      setSavedEvents(await updateSavedEvents(user.id));
      console.log(savedEvents);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h1 className="text-5xl font-bold">Saved Events</h1>
      <button className="btn btn-primary mt-5" onClick={handleBackToListClick}>
        Back to list
      </button>
      <div className="flex gap-10 flex-wrap justify-center mt-10 ">
        {savedEvents.map((ev, index) => {
          return (
            <EventCard
              key={index}
              event={ev}
              updateSavedEvents={handleUpdateSaveEvent}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SavedEvents;
