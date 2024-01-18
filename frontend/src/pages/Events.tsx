import React, { useState, useEffect } from "react";
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

const BASE_URL = 'http://localhost:5004/'

const Events = () => {
  const [events, setEvents] = useState<EventListing[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { type } = useParams<"type">();
  const navigate = useNavigate();

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetch(BASE_URL + "Events")
        .then((response) => response.json())
        .then((data: EventListing[]) => {
          const nearbyEvents = data.filter((event) => {
            const eventLat = parseFloat(event.latitude);
            const eventLng = parseFloat(event.longitude);
            const distance = getDistanceFromLatLonInKm(userLocation!.lat, userLocation!.lng, eventLat, eventLng);
            return distance <= 20000;
          });
          
          const filteredEvents = type
            ? nearbyEvents.filter((event) => event.category === type)
            : nearbyEvents;
          setEvents(filteredEvents);
        })
        .catch((err) => console.log(err));
    }
  }, [type, userLocation]);

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