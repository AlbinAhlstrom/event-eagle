import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import { useClerk } from "@clerk/clerk-react";
import { SavedEvent } from "../util";

const SavedEvents: React.FC = () => {
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([]);
  const {user} = useClerk();

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


  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h1 className="text-5xl font-bold">Saved Events</h1>
      <div className="flex gap-10 flex-wrap justify-center mt-10 ">

      {savedEvents.map((ev, index) => {
        return (
          <EventCard
          key={index}
          id={ev.event.id}
          title={ev.event.title}
          description={ev.event.description}
          startTime={ev.event.startTime}
          venue={ev.event.venue}
          price={ev.event.price}
          category={ev.event.category}
          updateSavedEvents={updateSavedEvents}
          />
          );
        })}
        </div>
    </div>
  );
};

export default SavedEvents;
