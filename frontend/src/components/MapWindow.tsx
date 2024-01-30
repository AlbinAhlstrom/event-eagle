import React, { useState, useEffect } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const MapWindow: React.FC = () => {
  const [position, setPosition] = useState({lat: 59.34676644462517, lng: 18.055573862709853});
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;

  const handleDragEnd = (event: google.maps.MapMouseEvent) => {
    const newPos = event.latLng;
    if (newPos) {
      setPosition({ lat: newPos.lat(), lng: newPos.lng() });
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <div className="flex justify-center items-center h-screen-h">
      <APIProvider apiKey={apiUrl}>
        <Map
          zoom={16}
          center={position}
          mapId={mapId}
          gestureHandling={'none'}
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