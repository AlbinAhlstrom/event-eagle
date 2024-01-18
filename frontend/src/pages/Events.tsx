import { useState, useEffect } from 'react';
import Header from "../components/Header";
import EventCard from "../components/EventCard";

type EventListing = {
  id: number,
  title: string,
  description: string,
  startTime: string,
  endTime: string,
  venue: string,
  address: string,
  latitude: string,
  longitude: string,
  price: number,
  category: string,
};

const BASE_URL = 'http://localhost:5004/'



const Events = () => {
  const [events, setEvents] = useState<EventListing[]>([]);

  useEffect(() => {
    fetch(BASE_URL + "Events")
    .then(response => response.json())
    .then(data => setEvents(data))
    .catch(err => console.log(err))

    console.log(events)
  }, []);

  return (
    <>
      <Header />
      {events.map(category => (
        <EventCard key={category.id} category="Title" description="event description"/>
      ))}
    </>
  );
};

export default Events;