// import React, { useEffect, useRef } from 'react';
// import GoogleMap from 'google-map-react';

// type Coordinate = {
//   lat: number;
//   lng: number;
// };

// type MapWindowProps = {
//   center?: Coordinate;
//   distanceFilter: number;
// };

// const MapComponent = ({ center, distanceFilter }: MapWindowProps) => {
//   const mapStyles = {
//     height: '70vh',
//     width: '70vh',
//   };

//   useEffect(()=>{}, [center])

//   const mapRef = useRef(null);
//   const mapsRef = useRef(null);
//   const circleRef = useRef(null);

//   const defaultPosition = {
//     lat: 0,
//     lng: 0,
//   };



//   useEffect(() => {
//     if (mapRef.current && mapsRef.current) {
//       if (circleRef.current) {
//         circleRef.current.setCenter(center || defaultPosition);
//         circleRef.current.setRadius(1000 * distanceFilter);
//       } else {
//         circleRef.current = new mapsRef.current.Circle({
//           strokeColor: '#FF0000',
//           strokeOpacity: 0.8,
//           strokeWeight: 2,
//           fillColor: '#FF0000',
//           fillOpacity: 0.3,
//           map: mapRef.current,
//           center: center || defaultPosition,
//           radius: 1000 * distanceFilter,
//         });
//       }
//     }
//   }, [center, distanceFilter]);

//   return (
//     <div style={mapStyles}>
//       <GoogleMap
//         bootstrapURLKeys={{ key: import.meta.env.VITE_GMAPS_KEY }}
//         center={center || defaultPosition}
//         defaultZoom={16 - distanceFilter}
//         yesIWantToUseGoogleMapApiInternals
//         onGoogleApiLoaded={({ map, maps }) => {
//           mapRef.current = map;
//           mapsRef.current = maps;
//           circleRef.current = new maps.Circle({
//             strokeColor: '#FF0000',
//             strokeOpacity: 0.8,
//             strokeWeight: 2,
//             fillColor: '#FF0000',
//             fillOpacity: 0.3,
//             map: map,
//             center: center || defaultPosition,
//             radius: 1000 * distanceFilter,
//           });
//         }}
//       />
//     </div>
//   );
// };

// export default MapComponent;

import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { Coordinate, Event } from '../util';
import React, { useEffect, useRef } from 'react';
import GoogleMap from 'google-map-react';


type MapWindowProps =  {
  center: Coordinate
  distanceFilter: number
}

const MapWindow: React.FC<MapWindowProps> = ({center, distanceFilter}: MapWindowProps) => {
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;

  useEffect(()=>{}, [center])

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

  return (
    
    <div className="relative h-60vh w-60vh rounded">
      <h1 className='hidden'>{distanceFilter}</h1>
      <APIProvider apiKey={apiUrl}>
        <GoogleMap
          zoom={16 - distanceFilter}
          center={center}          
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
        ></GoogleMap>
      </APIProvider>
    </div>
  );
};

export default MapWindow;