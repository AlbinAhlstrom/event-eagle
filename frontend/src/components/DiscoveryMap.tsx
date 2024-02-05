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
    <div className="h-60vh w-80vh rounded">
      <APIProvider apiKey={apiUrl}>
        <Map
        className="h-full w-full rounded-xl"
          // Zoom out when distance filter increases
          zoom={16 - distanceFilter}
          center={center}
          mapId={mapId}
          gestureHandling={'greedy'}
          disableDefaultUI={false}>          
          <AdvancedMarker
            position={center}
            draggable={false}
          >
          <Pin />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  )
};

export default MapWindow;