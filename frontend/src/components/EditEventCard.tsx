import React from 'react';
import { useNavigate } from 'react-router-dom';
import sports from '../images/sports-icon.webp';
import family from '../images/family-icon.webp';
import arts from '../images/arts-icon.webp';
import music from '../images/music-icon.webp';
import CountdownTimer from './CountDown';
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
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
        <img src={iconSrc} alt={event.category} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
        <p>{event.description}</p>
        <h1>{event.startTime}</h1>

        <div className="card-actions justify-center mt-10">
          <button className="btn btn-primary" onClick={() => navigate("/event/" + event.id)}>
            View details
        </button>
          <button className="btn btn-primary" onClick={() => onDelete(event.id)}>
              Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEventCard;