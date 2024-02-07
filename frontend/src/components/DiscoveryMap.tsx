import {
  APIProvider,
  Map,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';


type Coordinate = {
  lat: number;
  lng: number;
};

type MapWindowProps = {
  center: Coordinate;
  distanceFilter: number;
};

const DiscoveryMap = ({ center, distanceFilter }: MapWindowProps) => {
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;



  return (
    <div className='h-60vh w-60vh'>
    <APIProvider apiKey={apiUrl}>
    <Map
      zoom={distanceFilter}
      center={center}
      mapId={mapId}
      gestureHandling={"greedy"}
    >
      <AdvancedMarker position={center} draggable={false}>
      </AdvancedMarker>
    </Map>
  </APIProvider>
  </div>
  );
};

export default DiscoveryMap;