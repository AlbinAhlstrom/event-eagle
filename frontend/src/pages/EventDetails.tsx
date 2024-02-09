import { useLocation } from 'react-router-dom';
import image from '../images/nature.jpg';
import EventDetailsCard from '../components/EventDetailsCard';
import TicketCard from '../components/TicketCard';
import EventMiniMap from '../components/EventMiniMap';

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
          backgroundImage: `url(${image})`
        }}
      >
        <span className="h-2/6 w-2/6 absolute top-20">
        </span>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className='flex flex-col'>

        <EventDetailsCard event={event.id}/>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
