import React from 'react';
import useSWR from 'swr';
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import EventCard from "../components/EventCard";

type EventListing = {
  id: number;
  title: string;
  description: string;
  startTime: Date; 
  endTime: string;
  venue: string;
  address: string;
  latitude: string;
  longitude: string;
  price: number;
  category: "Music" | "Sports" | "Arts" | "Family";
};
// Function to calculate the distance between two coordinates in kilometers
const getDistanceFromLatLonInKm = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  // Radius of the earth in km
  const R = 6371; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  // Distance in km
  const d = R * c; 
  return d;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

const BASE_URL = 'http://localhost:5004/';
const EVENTS_ENDPOINT = `${BASE_URL}Events`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Events = () => {
  const [userLocation, setUserLocation] = React.useState<{ lat: number; lng: number } | null>(null);
  const { type } = useParams<'type'>();
  const navigate = useNavigate();

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const { data: events, error } = useSWR<EventListing[]>(EVENTS_ENDPOINT, fetcher);

  // Filter events by distance
  const eventsNearby = React.useMemo(() => {
    return (
      events?.filter((event) => {
        if (!userLocation) return false;
        const eventLat = parseFloat(event.latitude);
        const eventLng = parseFloat(event.longitude);
        const distance = getDistanceFromLatLonInKm(
          userLocation.lat,
          userLocation.lng,
          eventLat,
          eventLng
        );
        return 1000000000;
      }) || []
    );
  }, [events, userLocation]);

  const filteredEvents = React.useMemo(() => {
    return (
      eventsNearby.filter((event) => (!type || event.category === type)) || []
    );
  }, [eventsNearby, type]);

  if (error) return <div>Failed to load</div>;
  if (!events) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-center content-center flex-wrap gap-10 mt-20">
        
        {filteredEvents.map((event) => (
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
        <button className="btn btn-primary mt-10" onClick={() => navigate('/categories')}>
          Back to Categories
        </button>
      </div>
    </>
  );
};

export default Events;