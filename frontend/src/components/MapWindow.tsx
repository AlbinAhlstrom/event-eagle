import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import { mapStyle } from "../util";

const MapWindow = () => {

  const position = {lat: 59.34676644462517, lng: 18.055573862709853}
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  return (
    <div className="flex justify-center items-center h-screen-h">
<APIProvider apiKey={apiUrl}>
      <div className="h-80vh w-80vh">
        <Map 
        zoom={12} 
        center={position}
        styles={mapStyle}
        scrollwheel = {false}
        gestureHandling = {'none'}
        disableDefaultUI={true}
        >
          <AdvancedMarker position={position}>
            <Pin/>
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
    </div>
    
  )
}

export default MapWindow;
