import React, { useEffect, useRef } from 'react';
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
    height: '70vh',
    width: '70vh',
  };

  const mapRef = useRef(null);
  const mapsRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && mapsRef.current) {
      if (circleRef.current) {
        circleRef.current.setCenter(center);
        circleRef.current.setRadius(1000 * distanceFilter);
      } else {
        circleRef.current = new mapsRef.current.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.3,
          map: mapRef.current,
          center: center,
          radius: 1000 * distanceFilter,
        });
      }
    }
  }, [center, distanceFilter]);

  useEffect(() => {
    if (mapRef.current && center) {
      mapRef.current.panTo(center);
    }
  }, [center]);

  return (
    <div style={mapStyles}>
      <GoogleMap
        bootstrapURLKeys={{ key: import.meta.env.VITE_GMAPS_KEY }}
        center={center}
        defaultZoom={16 - distanceFilter}
        zoom={16 - distanceFilter}
        defaultCenter={center}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          mapRef.current = map;
          mapsRef.current = maps;
          circleRef.current = new maps.Circle({
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.3,
            map: map,
            center: center,
            radius: 1000 * distanceFilter,
          });
        }}
      />
    </div>
  );
};

export default MapComponent;