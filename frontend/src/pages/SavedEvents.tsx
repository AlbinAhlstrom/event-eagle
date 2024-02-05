import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const SavedEvents = () => {
  const [savedEvents, setSavedEvents] = useState([]);

  const fetchUserEvents = async () => {
    const response = await fetch(
      "https://event-eagle.azurewebsites.net/Events/userEvents"
    );
    const data = await response.json();
    setSavedEvents(data);
  };

  useEffect(() => {
    fetchUserEvents();
    console.log(savedEvents);
  }, []);

  return (
    <div>
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
          />
        );
      })}
    </div>
  );
};

export default SavedEvents;
