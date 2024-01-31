import { useState, useEffect } from "react";
import { EventListing, defaultEventListing } from "../util";
import { useParams } from "react-router-dom";

const Purchase = () => {
  const { id } = useParams<"id">();
  const BASE_URL = "https://event-eagle.azurewebsites.net";
  const [event, setEvent] = useState<EventListing>(defaultEventListing);

  useEffect(() => {
    const fetchEvent = async () => {
      const EVENTS_ENDPOINT = `${BASE_URL}/Events/${id}`;
      try {
        const response = await fetch(EVENTS_ENDPOINT);
        const data: EventListing = await response.json();
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event", error);
      }
    };

    fetchEvent();
  }, [id, BASE_URL]);
  return (
    <div>
      <div>Purchase</div>
      <div>{event.id}</div>
      <div>{event.title}</div>
    </div>
  );
};

export default Purchase;
