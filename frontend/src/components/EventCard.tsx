import React from 'react'
import { useNavigate } from 'react-router-dom'

interface EventCardProps {
    category: string
    description: string
}

const EventCard: React.FC<EventCardProps> = (props) => {
  const navigate = useNavigate()

  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src="../images/family2.jpg" alt={props.category}/></figure>
  <div className="card-body">
    <h2 className="card-title">{props.category}</h2>
    <p>{props.description}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={() => navigate("/events/" + props.category)}>Buy Tickets</button>
    </div>
  </div>
</div>
  )
}

export default EventCard