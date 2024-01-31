import React, { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import DistanceSlider from "../components/DistanceSlider";
import { EventListing, getDistanceFromLatLonInKm } from "../util";

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
  
  
  const [data, setData] = useState();

  const endTime = new Date();
  endTime.setHours(23, 59, 59);
  const endTimeISOString = endTime.toISOString().slice(0, -5) + "Z";
  
  const ticketMasterAPI = `https://app.ticketmaster.com/discovery/v2/events.json?size=50&unit=km&geoPoint=u6scd&radius=10&endDateTime=${endTimeISOString}&sort=date,asc&apikey=va6F5GmTa5GuKAGKbcUuGWdLAjCWOdec`;

useEffect(()=>{
  const fetchData = async () => {
    try {
      const res = await fetch(ticketMasterAPI);
      const result = await res.json();

      if (result._embedded && result._embedded.events) {
        setData(result._embedded.events);
        console.log(data);
      } else {
        console.error("No TicketMaster events today.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);

const ticketEvents = [];

if (data) {
  data.map(event => {
    ticketEvents.push({
      id: event.id,
      title: event.name,
      description: "Ticketmaster event",
      startTime: event.dates.start.dateTime,
      address: event._embedded.venues[0]?.address.line1 || "No address available",
      latitude: parseFloat(event._embedded.venues[0]?.location.latitude) || "No address available",
      longitude: parseFloat(event._embedded.venues[0]?.location.longitude) || "No address available",
      price: event.priceRanges[0]?.min || 0,
      venue: "",
      endTime: null
    });
  });
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

  let { data: events, error } = useSWR<EventListing[]>(
    EVENTS_ENDPOINT,
    fetcher
  );
console.log(events);

events = Array.isArray(events) ? [...events, ...ticketEvents] : ticketEvents;

  const eventsNearby = useMemo(() => {
    return (
      events?.filter((event) => {
        if (!userLocation) return false;
        const eventLat = event.latitude;
        const eventLng = event.longitude;
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

  const filteredEvents = useMemo(() => {
    return (
      eventsNearby.filter((event) => !type || event.category === type) || []
    );
  }, [eventsNearby, type]);

  console.log(filteredEvents);

  

  return (
      <div className="flex flex-col">
        <DistanceSlider value={distanceFilter} onChange={handleSliderChange} />
        <div className="flex justify-center items-center flex-wrap gap-10 mt-10 mb-32">
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