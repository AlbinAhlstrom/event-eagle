import React, { useEffect, useState } from "react";
import EventCard from "../components/card/EventCard";
import { useClerk } from "@clerk/clerk-react";
import { UserEvent, fetchUserEvents, updateSavedEvents } from "../util";
import { useNavigate } from "react-router-dom";

const SavedEvents: React.FC = () => {
  const [savedEvents, setSavedEvents] = useState<UserEvent[]>([]);
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

  const handleUpdateSaveEvent = async () => {
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
              event={ev.event}
              updateSavedEvents={handleUpdateSaveEvent}
            />
          );
        })}
      </div>
      <button
        className="btn btn-primary self-center fixed bottom-4 mt-auto w-40 z-50 max-md:w-2/3"
        onClick={handleBackToListClick}
      >
        go back
      </button>
    </div>
  );
};

export default SavedEvents;
