import { Circle } from "./Circle";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useState, useEffect, useRef, SetStateAction } from "react";
import { Event, categories, getDistanceFromLatLonInKm } from "../util";
import EventMarker from "./EventMarker";
import { Coordinate } from "../util";

export type Point = google.maps.LatLngLiteral & { key: string };

type MapWindowProps = {
  center: Coordinate;
  distanceFilter: number;
  zoom: number;
};

const DiscoveryMap = ({ center, distanceFilter, zoom }: MapWindowProps) => {
  const [selectedEventId, setSelectedEventId] = useState<number>(0);

  const handleMapClick = () => {
    setSelectedEventId(0); 
  };
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;

  return (
    <div className="h-70vh  w-full sm:w-70vh">
      <APIProvider apiKey={apiUrl}>
        <Map
          zoom={zoom}
          center={center}
          mapId={mapId}
          gestureHandling={"greedy"}
          onClick={handleMapClick}
          disableDefaultUI={true}
          disableDoubleClickZoom={true}
          draggable={false}
        >
          <Circle center={center} radius={distanceFilter*1000} clickable={false} strokeOpacity={0.75} strokeWeight={0.5}/>
          <Markers userLocation={center} distanceFilter={distanceFilter} selectedEventId={selectedEventId} setSelectedEventId={setSelectedEventId} />
        </Map>
      </APIProvider>
    </div>
  );
};

type MarkersProps = {
  userLocation: Coordinate,
  distanceFilter: number,
  selectedEventId: number,
  setSelectedEventId: React.Dispatch<SetStateAction<number>>,
}

const Markers = ({ userLocation, distanceFilter, selectedEventId, setSelectedEventId }: MarkersProps) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [visibleEvents, setVisibleEvents] = useState<Event[]>([]);

  useEffect(() => {setVisibleEvents(events?.filter((event) => {
    const eventLocation = {lat:event.latitude, lng:event.longitude}
    const distance = getDistanceFromLatLonInKm(userLocation, eventLocation);
    return distance <= distanceFilter;
  }) || [])}, [events, distanceFilter, userLocation])

  useEffect(() => {
    const BASE_URL = "https://event-eagle.azurewebsites.net/";
    const EVENTS_ENDPOINT = `${BASE_URL}Events`;
    fetch(EVENTS_ENDPOINT)
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const markersRef = useRef(null);


  return (
    <div ref={markersRef}>
      {visibleEvents.map((event) => (
        <AdvancedMarker
          position={{ lat: event.latitude, lng: event.longitude }}
          key={event.title}
          onClick={() => setSelectedEventId(selectedEventId !== event.id ? event.id : 0)}
          zIndex={selectedEventId === event.id ? 100 : 1}
        >
          {selectedEventId === event.id ? (
            <EventMarker
              key={event.id}
              event={event}
              updateSavedEvents={() => {}}
            />
          ) : (
            <>
              {event.category === categories.sports && <span className="text-4xl">⚽</span>}
              {event.category === categories.music && <span className="text-5xl">🎸</span>}
              {event.category === categories.arts && <span className="text-4xl">🎭</span>}
              {event.category === categories.family && <span className="text-4xl">🧸</span>}
            </>
          )}
        </AdvancedMarker>
      ))}
    </div>
  );
};

export default DiscoveryMap;
