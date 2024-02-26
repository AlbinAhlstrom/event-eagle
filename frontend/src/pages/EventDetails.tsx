import { useLocation } from "react-router-dom";
import image from "../images/icon/sports-icon.webp";
import EventDetailsCard from "../components/card/EventDetailsCard";

const EventDetails = () => {
  const location = useLocation();
  const event = location.state?.event;
  if (!event) {
    return <div>Loading event details...</div>;
  }

  return (
    <>
      <div
        className="hero min-h-screen-h"
        style={{
          backgroundImage: `url(https://cdn.sanity.io/images/fvrrd1kn/production/6f392aa2e95b58b97001f53bcd3a88e016fb6b68-2400x1600.jpg?q=75&fit=clip&auto=format)`,
        }}
      >
        <span className="h-2/6 w-2/6 absolute top-20"></span>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="flex flex-col">
          <EventDetailsCard event={event.id} />
        </div>
      </div>
    </>
  );
};

export default EventDetails;
