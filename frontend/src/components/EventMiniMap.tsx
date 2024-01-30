import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { Coordinate } from "../util";

type EventMiniMapProps = {
  position: Coordinate;
};

const EventMiniMap = ({ position }: EventMiniMapProps) => {
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={apiUrl}>
        <Map zoom={16} center={position} mapId={mapId} gestureHandling={"none"} disableDefaultUI={true}>
          <AdvancedMarker position={position}>
            <Pin />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  );
};

export default EventMiniMap;
