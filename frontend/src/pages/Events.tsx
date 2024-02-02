import React, { useState } from "react";
import useSWR from "swr";
import { useParams, useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import DistanceSlider from "../components/DistanceSlider";
import { EventDetailsListing, EventListing, getDistanceFromLatLonInKm } from "../util";

const BASE_URL = "https://event-eagle.azurewebsites.net/";
const EVENTS_ENDPOINT = `${BASE_URL}Events`;
const ticketmasterKey = import.meta.env.VITE_TICKETMASTER_API_KEY;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Events: React.FC = () => {
  const [userLocation, setUserLocation] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [distanceFilter, setDistanceFilter] = useState(2);
  const { type } = useParams<"type">();
  const navigate = useNavigate();

  const [data, setData] = useState<EventListing[]>();

  const endTime = new Date();
  endTime.setHours(23, 59, 59);
  const endTimeISOString =
    endTime.toISOString().slice(0, -5) + "Z";
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

  const ticketEvents: EventDetailsListing[] = [];

  if (data) {
    data.forEach((event) => {
      if (
        "_embedded" in event &&
        "priceRanges" in event &&
        "name" in event &&
        "dates" in event
      ) {
        const ticketmasterEvent = event as {
          _embedded: {
            venues: {
              address: {
                line1: string;
              };
              location: {
                latitude: string;
                longitude: string;
              };
            }[];
          };
          priceRanges: {
            min: number;
          }[];
          name: string;
          dates: {
            start: {
              dateTime: string;
            };
          };
        };

        const venue = ticketmasterEvent._embedded?.venues[0];
        const priceRange = ticketmasterEvent.priceRanges?.[0];

        ticketEvents.push({
          id: event.id,
          title: ticketmasterEvent.name || "Unknown Event",
          description: "Ticketmaster event",
          startTime: new Date(
            ticketmasterEvent.dates?.start?.dateTime || ""
          ),
          address: venue?.address?.line1 || "No address available",
          latitude: parseFloat(venue?.location?.latitude || "0") || 0,
          longitude: parseFloat(venue?.location?.longitude || "0") || 0,
          price: priceRange?.min || 0,
          venue: "",
          endTime: null,
        });
      } else {
        ticketEvents.push(event);
      }
    });
  }

  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  // eslint-disable-next-line prefer-const
  let { data: events, error } = useSWR<EventDetailsListing[]>(
    EVENTS_ENDPOINT,
    fetcher
  );

  events = Array.isArray(events)
    ? [...events, ...ticketEvents]
    : ticketEvents;

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

  const filteredEvents = React.useMemo(() => {
    return (
      eventsNearby.filter(
        (event) => !type || event.category === type
      ) || []
    );
  }, [eventsNearby, type]);


  return (
    <div className="flex flex-col">
      <DistanceSlider
        value={distanceFilter}
        onChange={handleSliderChange}
      />
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
            category={event.category ?? "Arts"}
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
