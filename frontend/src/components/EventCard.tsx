import React from 'react';
import { useNavigate } from 'react-router-dom';
import sports from '../images/sports-icon.webp';
import family from '../images/family-icon.webp';
import arts from '../images/arts-icon.webp';
import music from '../images/music-icon.webp';
import CountdownTimer from './CountDown';

type EventCardProps = {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  venue: string;
  price: number;
  category: 'Music' | 'Sports' | 'Arts' | 'Family';
};

interface IconMap {
  [key: string]: string;
}

const getIcon: IconMap = {
  "Music": music,
  "Sports": sports,
  "Arts": arts,
  "Family": family
};

const EventCard: React.FC<EventCardProps> = (props) => {
  const navigate = useNavigate();


  const iconSrc = getIcon[props.category] || '';
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full animate__animated animate__bounceInDown">
      <figure>
        <img src={iconSrc} alt={props.category} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.description}</p>
    <CountdownTimer targetDate={props.startTime}/>

        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => navigate("/event/" + props.id)}>
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;