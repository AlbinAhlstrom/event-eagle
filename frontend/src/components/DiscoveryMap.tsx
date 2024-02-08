import { Circle } from "./Circle";
import { APIProvider, Map, AdvancedMarker, Marker } from "@vis.gl/react-google-maps";
import { useState, useEffect } from "react";
import { defaultEventListing } from "../util";
import { Coordinate } from "../util";
import { Event } from "../util";

export type Point = google.maps.LatLngLiteral & {key: string};



type MapWindowProps = {
  center: Coordinate;
  circleRadius: number;
  zoom: number;
};

const DiscoveryMap = ({ center, circleRadius, zoom }: MapWindowProps) => {
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;

  const points = [{lat: 59.39758577087886, lng: 18.035769033715795, key: "point"}]

  return (
    <div className="h-60vh w-60vh">
      <APIProvider apiKey={apiUrl}>
        <Map
          zoom={zoom}
          center={center}
          mapId={mapId}
          gestureHandling={"greedy"}
        >
          <Circle center={center} radius={circleRadius} />
          <Markers />
        </Map>
      </APIProvider>
    </div>
  );
};

const Markers = () => {

  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const BASE_URL = "https://event-eagle.azurewebsites.net/";
    const EVENTS_ENDPOINT = `${BASE_URL}Events`;
    fetch(EVENTS_ENDPOINT).then(async (res) => setEvents(await res.json()));
  }, [])


  return (
  <>
    {events && events.map((event) => <AdvancedMarker position={{lat: event.latitude, lng: event.longitude}} key={event.title}>
        <div className="card card-neutral"><span className="text-5xl bg-red">🎵</span></div>
      </AdvancedMarker>)}
  </>
  )
}

export default DiscoveryMap;
