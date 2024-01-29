"useclient";
import {useState} from "react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

const MapWindow = () => {

  const position = {lat: 59.34676644462517, lng: 18.055573862709853}

  return (
    <APIProvider apiKey={process.env.REACT_APP_GMAPS_API_KEY}>
      <div className="h-40vh w-40vh">
        <Map zoom={9} center={position}></Map>
      </div>
    </APIProvider>
  );
};

export default MapWindow;
