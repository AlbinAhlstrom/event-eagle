import { useLocation } from 'react-router-dom';
import image from '../images/nature.jpg';
import EventDetailsCard from '../components/EventDetailsCard';

const EventDetails = () => {
  const location = useLocation();
  const event = location.state?.event;

  if (!event) {
    return <div>Loading event details...</div>;
  }

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${image})`
        }}
      >
        <span className="h-2/6 w-2/6 absolute top-20">
          {/* <EventMiniMap position={position} /> */}
        </span>
        <div className="hero-overlay bg-opacity-60"></div>
        <EventDetailsCard event={event}/>
      </div>
    </>
  );
};

export default EventDetails;
