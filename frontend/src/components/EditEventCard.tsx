import React from 'react';
import { useNavigate } from 'react-router-dom';
import sports from '../images/sports-icon.webp';
import family from '../images/family-icon.webp';
import arts from '../images/arts-icon.webp';
import music from '../images/music-icon.webp';
import { IconMap } from '../util';
import { EventListing } from '../util';

const getIcon: IconMap = {
  "Music": music,
  "Sports": sports,
  "Arts": arts,
  "Family": family
};

interface EditEvenCardProps {
    event: EventListing
    onDelete: (id: number) => void
}


const EditEventCard: React.FC<EditEvenCardProps> = ({event, onDelete}) => {
  const navigate = useNavigate();

  const iconSrc = getIcon[event.category] || '';
  return (
    <div className="card bg-base-100 shadow-xl image-full w-56">
      <figure>
        <img src={iconSrc} alt={event.category} />
      </figure>
      <div className="card-body w-full h-full">
        <h2 className="card-title">{event.title}</h2>
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={() => navigate(`/event/${event.id}/edit`)}>
            View details
        </button>
        <div className='flex gap-2'>
          <button className="btn btn-primary" onClick={() => onDelete(event.id)}>
              Delete
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventCard;