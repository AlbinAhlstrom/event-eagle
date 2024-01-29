"useclient";
import {useState} from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

const MapWindow = () => {

  const position = {lat: 59.34676644462517, lng: 18.055573862709853}
  const apiUrl = import.meta.env.VITE_GMAPS_KEY;
  const mapId = import.meta.env.VITE_GMAPS_MAPID;
  return (
    <APIProvider apiKey={apiUrl}>
      <div className="h-40vh w-40vh">
        <Map 
        zoom={9} 
        center={position}
        mapId={mapId}
        >

        </Map>
      </div>
    </APIProvider>
  )
}

export default MapWindow;
