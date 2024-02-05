import React from "react";
import { useNavigate } from "react-router-dom";
import sports from "../images/sports-icon.webp";
import family from "../images/family-icon.webp";
import arts from "../images/arts-icon.webp";
import music from "../images/music-icon.webp";
import CountdownTimer from "./CountDown";
import { EventCardProps, IconMap } from "../util";
import { useClerk } from "@clerk/clerk-react";

const getIcon: IconMap = {
  Music: music,
  Sports: sports,
  Arts: arts,
  Family: family,
};

const EventCard: React.FC<EventCardProps> = (props) => {
  const navigate = useNavigate();
  const {user} = useClerk();

  const handleSeeDetailsClick = () => {
    navigate(`/event/${props.id}`, { state: { event: props } });
  };

const userEvent = {
  userId: user?.id,
  eventId: props.id,
  createdByUser: false
};

const PostUserEvent = () => {

fetch("https://event-eagle.azurewebsites.net/Events/add/userEvent", {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(userEvent),
})
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle the response data
    console.log('Success:', data);
  })
  .catch(error => {
    // Handle errors
    console.error('Error:', error);
  });
}

const handleSaveEventClick = () => {
PostUserEvent();
navigate("/savedEvents");
}


  const iconSrc = getIcon[props.category] || "";
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full animate__animated animate__bounceInDown">
      <figure>
        <img src={iconSrc} alt={props.category} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{props.title}</h2>
        <p>{props.description}</p>
        <p>{props.price} SEK</p>
        <CountdownTimer targetDate={props.startTime} />

        <div className="card-actions justify-center mt-10">
          <button className="btn btn-primary" onClick={handleSeeDetailsClick}>
            See Details
          </button>
          <button className="btn btn-primary" onClick={handleSaveEventClick}>
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
