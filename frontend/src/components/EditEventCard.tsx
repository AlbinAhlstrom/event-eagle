import React from 'react';
import sports from '../images/sports-icon.webp';
import family from '../images/family-icon.webp';
import arts from '../images/arts-icon.webp';
import music from '../images/music-icon.webp';
import { IconMap } from '../util';
import { EventListing } from '../util';
import { useNavigate } from 'react-router-dom';

const getIcon: IconMap = {
  "Music": music,
  "Sports": sports,
  "Arts": arts,
  "Family": family
};

interface EditEvenCardProps {
    event: EventListing
}


const EditEventCard: React.FC<EditEvenCardProps> = ({event}) => {

  const iconSrc = getIcon[event.category] || '';
  const navigate = useNavigate()

  const deleteEvent = async (event: EventListing) => {
    const BASE_URL = "http://event-eagle.azurewebsites.net"
    const EVENTS_ENDPOINT = `${BASE_URL}/Events/${event.id}`;
    await fetch(EVENTS_ENDPOINT, {
      method: "DELETE",
    });
  };



  const handleUpdateEvent = () => navigate(`/events/${event.id}/update`)
  const handleDeleteEvent = () => deleteEvent(event)
  return (
    <div className="card bg-base-100 shadow-xl image-full w-56">
      <figure>
        <img src={iconSrc} alt={event.category} />
      </figure>
      <div className="card-body w-full h-full">
        <h2 className="card-title">{event.title}</h2>
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={handleUpdateEvent}>
            Update
        </button>
        <div className='flex gap-2'>
          <button className="btn btn-primary" onClick={handleDeleteEvent}>
              Delete
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventCard;