import { Circle } from "./Circle";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useState } from "react";

type Coordinate = {
  lat: number;
  lng: number;
};

type MapWindowProps = {
  center: Coordinate;
};

const DiscoveryMap = ({ center }: MapWindowProps) => {
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;

  const [distanceFilter, setDistanceFilter] = useState(2);

  return (
    <div className="h-60vh w-60vh">
      <APIProvider apiKey={apiUrl}>
        <Map
          zoom={16}
          center={center}
          mapId={mapId}
          gestureHandling={"greedy"}
        >
          <Circle center={center} radius={15000} />
        </Map>
      </APIProvider>
    </div>
  );
};

export default DiscoveryMap;
