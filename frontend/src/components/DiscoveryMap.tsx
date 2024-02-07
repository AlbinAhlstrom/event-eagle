import { Circle } from "./Circle";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useState } from "react";

type Coordinate = {
  lat: number;
  lng: number;
};

type MapWindowProps = {
  center: Coordinate;
  circleRadius: number;
  zoom: number;
};

const DiscoveryMap = ({ center, circleRadius, zoom }: MapWindowProps) => {
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;


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
        </Map>
      </APIProvider>
    </div>
  );
};

export default DiscoveryMap;
