import { useEffect } from 'react';
import GoogleMap from 'google-map-react';

type Coordinate = {
  lat: number;
  lng: number;
};

type MapWindowProps = {
  center: Coordinate;
  distanceFilter: number;
};

const MapComponent = ({ center, distanceFilter }: MapWindowProps) => {

  const mapStyles = {
    height: "70vh",
    width: "70vh",
  };

  useEffect(() => {}, [center]);

  const Map = () =>(
    <div style={mapStyles}>
      <GoogleMap
        bootstrapURLKeys={{ key: import.meta.env.VITE_GMAPS_KEY }}
        defaultZoom={16}
        defaultCenter={center}
        onGoogleApiLoaded={({map, maps}) =>
          new google.maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.3,
            map,
            center: center,
            radius: 275,
          })}
      />
    </div>
  );

  return (
    Map()
  );
};

export default MapComponent;