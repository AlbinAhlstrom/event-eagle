import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import EventCard from "../components/card/EventCard";
import DistanceSlider from "../components/DistanceSlider";
import {
  getDistanceFromLatLonInKm,
  Event,
  TicketmasterEvent,
  updateSavedEvents,
} from "../util";

const BASE_URL = "https://event-eagle.azurewebsites.net/";
const EVENTS_ENDPOINT = `${BASE_URL}Events`;
const ticketmasterKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Events: React.FC = () => {
  const [userLocation, setUserLocation] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [distanceFilter, setDistanceFilter] = useState(0.2);
  const { type } = useParams<"type">();
  const navigate = useNavigate();

  const [data, setData] = useState<TicketmasterEvent[]>();

  const endTime = new Date();
  endTime.setHours(23, 59, 59);
  const endTimeISOString = endTime.toISOString().slice(0, -5) + "Z";
  const ticketMasterAPI = `https://app.ticketmaster.com/discovery/v2/events.json?size=50&unit=km&geoPoint=u6scd&radius=10&endDateTime=${endTimeISOString}&sort=date,asc&apikey=${ticketmasterKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(ticketMasterAPI);
        const result = await res.json();

        if (result._embedded && result._embedded.events) {
          setData(result._embedded.events);
        } else {
          console.error("No TicketMaster events today.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ticketMasterAPI]);

  console.log(data);

  let ticketEvents: Event[] = [];
  if (data) {
    ticketEvents = data.map((data: TicketmasterEvent) => ({
      id: 0,
      title: data.name || "Untitled Event",
      description: "Ticketmaster Event",
      startTime: data.dates.start.dateTime || "",
      endTime: data.sales?.public.endDateTime || "",
      venue: data._embedded.venues[0]?.city?.name || "Unknown Venue",
      address: data._embedded.venues[0]?.address.line1 || "Unknown Address",
      latitude: parseFloat(data._embedded.venues[0]?.location.latitude) || 0,
      longitude: parseFloat(data._embedded.venues[0]?.location.longitude) || 0,
      price: data.priceRanges[0]?.min || 0,
      category: "Music",
    }));
  }

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = Number(event.target.value);
    setDistanceFilter(sliderValue);
  };

  useEffect(() => {
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

  // eslint-disable-next-line prefer-const
  let { data: events, error } = useSWR<Event[]>(EVENTS_ENDPOINT, fetcher);

  events = Array.isArray(events) ? [...events, ...ticketEvents] : ticketEvents;

  const eventsNearby = useMemo(() => {
    return (
      events?.filter((event) => {
        if (!userLocation) return false;
        const eventLocation = { lat: event.latitude, lng: event.longitude };
        const distance = getDistanceFromLatLonInKm(userLocation, eventLocation);
        return distance <= distanceFilter;
      }) || []
    );
  }, [events, userLocation, distanceFilter]);

  const filteredEvents = useMemo(() => {
    return (
      eventsNearby.filter((event) => !type || event.category === type) || []
    );
  }, [eventsNearby, type]);

  const handleUpdateSaveEvent = () => {
    updateSavedEvents("test");
  };

  console.log(filteredEvents);

  return (
    <div className="flex flex-col sm:mx-8 justify-center items-center">
      <DistanceSlider value={distanceFilter} onChange={handleSliderChange} />
      <div className="flex justify-center items-center flex-wrap gap-10 mt-10 mb-32">
        {error && <h1>Failed to load</h1>}
        {!filteredEvents.length && (
          <div className="flex flex-col items-center gap-6">
            <span className="loading h-20 w-20 text-primary text-xl"></span>
            <span className="text-2xl font-bold">Loading Events...</span>
            <span>Move the distance slider to find events further away.</span>
          </div>
        )}
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            updateSavedEvents={handleUpdateSaveEvent}
          />
        ))}
      </div>
      <div className="fixed bottom-2 flex justify-center w-full gap-2">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/categories")}
        >
          Back to Categories
        </button>
        <button
          className="btn flex-0 btn-primary w-12 z-50"
          onClick={() => navigate("/eventsmap")}
        >
          Map
        </button>
      </div>
    </div>
  );
};

export default Events;
