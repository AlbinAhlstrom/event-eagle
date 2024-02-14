import { useLocation } from "react-router-dom";
import image from "../images/icon/sports-icon.webp";
import EventDetailsCard from "../components/card/EventDetailsCard";

const EventDetails = () => {
  const location = useLocation();
  const event = location.state?.event;
  console.log(event.id);
  if (!event) {
    return <div>Loading event details...</div>;
  }

  return (
    <>
      <div
        className="hero min-h-screen-h"
        style={{
          backgroundImage: `url(https://cdn.sanity.io/images/fvrrd1kn/production/5b37976bf453b25395a1caad66250dedfd7cb7a5-2400x1600.jpg?q=75&fit=clip&auto=format)`,
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
