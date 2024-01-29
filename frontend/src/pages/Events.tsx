import React, { useState } from "react";
import EventListing from "../helpers/types";
import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import getDistanceFromLatLonInKm from "../helpers/util";
import DistanceSlider from "../components/DistanceSlider";

const BASE_URL = "https://event-eagle.azurewebsites.net/";
const EVENTS_ENDPOINT = `${BASE_URL}Events`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Events = () => {
  const [userLocation, setUserLocation] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [distanceFilter, setDistanceFilter] = useState(2);
  const { type } = useParams<"type">();
  const navigate = useNavigate();

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = Number(event.target.value);
    setDistanceFilter(sliderValue);
  };

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

  const { data: events, error } = useSWR<EventListing[]>(
    EVENTS_ENDPOINT,
    fetcher
  );

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
        return distance <= distanceFilter;
      }) || []
    );
  }, [events, userLocation, distanceFilter]);

  const filteredEvents = React.useMemo(() => {
    return (
      eventsNearby.filter((event) => !type || event.category === type) || []
    );
  }, [eventsNearby, type]);

  return (
      <div className="flex flex-col">
        <DistanceSlider value={distanceFilter} onChange={handleSliderChange} />
        <div className="flex justify-center items-center flex-wrap gap-10 mt-10">
          {error && <h1>Failed to load</h1>}
          {!events && (
            <span className="loading loading-lg big-spinner h-16 text-primary text-xl"></span>
          )}
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              title={event.title}
              description={event.description}
              startTime={new Date(event.startTime)}
              venue={event.venue}
              price={event.price}
              category={event.category}
            />
          ))}
        </div>
      <button
        className="btn btn-primary self-center fixed bottom-2 mt-auto w-40 z-50 max-md:w-5/6"
        onClick={() => navigate("/categories")}
      >
        Back to Categories
      </button>
      </div>

  );
};

export default Events;