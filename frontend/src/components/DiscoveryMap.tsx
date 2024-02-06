import { useEffect } from 'react';
import { Coordinate, Event } from '../util';
import { LoadScript, GoogleMap } from '@react-google-maps/api';


type MapWindowProps =  {
  center: Coordinate
  distanceFilter: number
}

const MapComponent = ({center, distanceFilter}: MapWindowProps) => {
  const mapStyles = {
    height: "70vh",
    width: "70vh",
  };

  useEffect(() => {}, [center])

  if (center.lat === 0) return <div>Loading</div>

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GMAPS_KEY}>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={16 - distanceFilter}
        center={center}
      >
      </GoogleMap>
    </LoadScript>
  );
}

export default MapComponent;