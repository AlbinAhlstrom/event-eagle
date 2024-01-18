import React from 'react'
import { useNavigate } from 'react-router-dom'
import sports from '../images/football.png'
import family from '../images/family-events.jpg'
import arts from '../images/theater.png'
import music from '../images/musical-note.png'

type EventCardProps = {
  id: number,
  title: string,
  description: string,
  startTime: string,
  venue: string,
  price: number,
};


const EventCard: React.FC<EventCardProps> = (props) => {
  const navigate = useNavigate()

  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src={sports} alt="image here"/></figure>
  <div className="card-body">
    <h2 className="card-title">{props.title}</h2>
    <p>{props.description}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={() => navigate("/events/" + props.id)}>Buy Tickets</button>
    </div>
  </div>
</div>
  )
}

export default EventCard