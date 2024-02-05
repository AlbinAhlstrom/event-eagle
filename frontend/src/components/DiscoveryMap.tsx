import { APIProvider, Map, AdvancedMarker, AdvancedMarkerRef, Pin } from '@vis.gl/react-google-maps';
import { Coordinate, EventListing } from '../util';


type MapWindowProps =  {
  events: EventListing[]
  center: Coordinate
  zoom: number
}

const MapWindow: React.FC<MapWindowProps> = ({events, center, distanceFilter}: MapWindowProps) => {
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;

  return (
    <div className="relative h-60vh w-60vh rounded">
      <APIProvider apiKey={apiUrl}>
        <Map
          className="h-full w-full rounded-xl"
          zoom={16 - distanceFilter}
          center={center}
          mapId={mapId}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          <AdvancedMarker position={center} draggable={false}>
            <Pin />
          </AdvancedMarker>
        </Map>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-1/2 w-1/2 bg-yellow-500 opacity-50 rounded-full"></div>
        </div>
      </APIProvider>
    </div>
  );
};

export default MapWindow;