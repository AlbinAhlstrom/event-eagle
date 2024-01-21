import React, {useState} from 'react';
import useSWR from 'swr';
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import EventCard from "../components/EventCard";
import getDistanceFromLatLonInKm from '../helpers/util';
import DistanceSlider from '../components/DistanceSlider';

const BASE_URL = 'http://localhost:5004/';
const EVENTS_ENDPOINT = `${BASE_URL}Events`;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Events = () => {
  const [userLocation, setUserLocation] = React.useState<{ lat: number; lng: number } | null>(null);
  const [distanceFilter, setDistanceFilter] = useState(2);
  const { type } = useParams<'type'>();
  const navigate = useNavigate();

  const handleSliderChange = (event) => {
    setDistanceFilter(event.target.value);
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
        return distance <= distanceFilter; 
      }) || []
    );
  }, [events, userLocation, distanceFilter]);

  const filteredEvents = React.useMemo(() => {
    return (
      eventsNearby.filter((event) => (!type || event.category === type)) || []
    );
  }, [eventsNearby, type]);

  if (error) return <div>Failed to load</div>;
  if (!events) return <div>Loading...</div>;

  return (
    <>
    <Header/>
    <DistanceSlider value={distanceFilter} onChange={handleSliderChange} />
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