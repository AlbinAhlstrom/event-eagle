import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import { useNavigate } from "react-router-dom"; // Import useParams
import Header from "../components/Header";
import EventCard from "../components/EventCard";

type EventListing = {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  venue: string;
  address: string;
  latitude: string;
  longitude: string;
  price: number;
  category: "Music" | "Sports" | "Arts" | "Family";
};

const BASE_URL = 'http://localhost:5004/'

const Events = () => {
  const [events, setEvents] = useState<EventListing[]>([]);
  // Get the type from the URL
  const { type } = useParams(); 

  useEffect(() => {
    fetch(BASE_URL + "Events")
      .then((response) => response.json())
      .then((data) => {
        const filteredEvents = type
          ? data.filter((event) => event.category === type)
          : data;
        setEvents(filteredEvents);
      })
      .catch((err) => console.log(err));
  }, [type]);

  const navigate = useNavigate()

  return (
    <>
      <Header />
      <div className="flex justify-center content-center flex-wrap gap-10 mt-20">
        {events.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            description={event.description}
            startTime={event.startTime}
            venue={event.venue}
            price={event.price}
            category={event.category}
          />
        ))}
      </div>
      <div className="flex justify-center">
      <button className="btn btn-primary mt-10" onClick={() => navigate("/categories")}>Back to Categories</button>

        </div>
    </>
  );
};

export default Events;