import { Circle } from "./Circle";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useState, useEffect, useRef, SetStateAction } from "react";
import { Event, categories } from "../util";
import EventMarker from "./EventMarker";
import { Coordinate } from "../util";

export type Point = google.maps.LatLngLiteral & { key: string };

type MapWindowProps = {
  center: Coordinate;
  circleRadius: number;
  zoom: number;
};

const DiscoveryMap = ({ center, circleRadius, zoom }: MapWindowProps) => {
  const [selectedEventId, setSelectedEventId] = useState<number>(0);

  const handleMapClick = () => {
    setSelectedEventId(0); 
  };
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;

  return (
    <div className="h-70vh w-full">
      <APIProvider apiKey={apiUrl}>
        <Map
          zoom={zoom}
          center={center}
          mapId={mapId}
          gestureHandling={"greedy"}
          onClick={handleMapClick}
        >
          <Circle center={center} radius={circleRadius} />
          <Markers selectedEventId={selectedEventId} setSelectedEventId={setSelectedEventId} />
        </Map>
      </APIProvider>
    </div>
  );
};

type MarkersProps = {
  selectedEventId: number,
  setSelectedEventId: React.Dispatch<SetStateAction<number>>,
}

const Markers = ({ selectedEventId, setSelectedEventId }: MarkersProps) => {
  const [events, setEvents] = useState<Event[]>([]);

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
      {events.map((event) => (
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
              {event.category === categories.sports && <span className="text-5xl">⚽</span>}
              {event.category === categories.music && <span className="text-5xl">🎸</span>}
              {event.category === categories.arts && <span className="text-5xl">🎭</span>}
              {event.category === categories.family && <span className="text-5xl">🧸</span>}
            </>
          )}
        </AdvancedMarker>
      ))}
    </div>
  );
};

export default DiscoveryMap;
