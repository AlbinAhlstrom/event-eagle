import { APIProvider, Map, AdvancedMarker, AdvancedMarkerRef, Pin } from '@vis.gl/react-google-maps';
import { Coordinate } from '../util';


type MapWindowProps =  {
  position: Coordinate
  setPosition: ({lat, lng}:Coordinate) => void
  pins?: AdvancedMarkerRef[]
}
const MapWindow: React.FC<MapWindowProps> = ({position, setPosition}: MapWindowProps) => {
  const apiUrl = import.meta.env.GMAPS_KEY;
  const mapId = import.meta.env.GMAPS_MAPID;
  
  const handleDragEnd = (event: google.maps.MapMouseEvent) => {
    const newPos = event.latLng;
    if (newPos) {
      setPosition({lat: newPos.lat(), lng: newPos.lng()});
      console.log(position)
    }
  };

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={apiUrl}>
        <Map
          zoom={16}
          center={position}
          mapId={mapId}
          gestureHandling={'greedy'}
          disableDefaultUI={true}>          
          <AdvancedMarker
            position={position}
            draggable={true}
            onDragEnd={handleDragEnd}
          >
            <Pin />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </div>
  )
};

export default MapWindow;