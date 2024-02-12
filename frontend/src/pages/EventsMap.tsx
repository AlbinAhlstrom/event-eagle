import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DistanceSlider from "../components/DistanceSlider";
import DiscoveryMap from "../components/DiscoveryMap"

const EventsMap: React.FC = () => {
  const [userLocation, setUserLocation] = React.useState({ lat: 53.54992, lng: 10.00678 });
  const [distanceFilter, setDistanceFilter] = useState(0.1);
  const navigate = useNavigate();


  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const sliderValue = Number(event.target.value);
    setDistanceFilter(sliderValue);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
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
    <div className="flex flex-col sm:mx-8 max-sm:flex-col-reverse">
      <DistanceSlider
        value={distanceFilter}
        onChange={handleSliderChange}
      />
      <div className="flex justify-center items-center flex-wrap gap-10 mt-4 rounded-xl">
        <DiscoveryMap center={userLocation} distanceFilter={distanceFilter} zoom={Math.min(14, 14 - 1.5 * Math.log(distanceFilter))} />
      </div>
      <div className="flex gap-2 mx-2">
      <button
        className="btn btn-primary flex-grow"
        onClick={() => navigate("/categories")}
      >
        Back to Categories
      </button>
      <button
        className="btn btn-primary w-12"
        onClick={() => navigate("/events")}
      >List</button>
      </div>
      
    </div>
  );
};

export default EventsMap;