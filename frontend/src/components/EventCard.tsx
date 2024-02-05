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
  return fetch("https://event-eagle.azurewebsites.net/Events/add/userEvent", {
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
      console.log('Success:', data);
      return data; 
    })
    .catch(error => {
      console.error('Error:', error);
      throw error; 
    });
};


const handleDeleteEvent = async () => {
  try {
    const response = await fetch(
      `  https://event-eagle.azurewebsites.net/Events/userEvents/delete?userId=${user?.id}&eventId=${props.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    console.log('Event deleted successfully');
  } catch (error) {
    console.error('Error:', error);
  }
};


const handleSaveEventClick = () => {
  PostUserEvent()
    .then(() => props.updateSavedEvents?.())
    .then(() => navigate("/savedEvents"))
    .catch((error) => {
      console.error('Error:', error);
    });
}

const handleDeleteSavedEventClick = async () => {
  await handleDeleteEvent();
await props.updateSavedEvents?.();
navigate("/savedEvents");

}

const isSaveEventButtonVisible = location.pathname !== "/savedEvents";

const isIdANumber = typeof props.id === 'number';

  const iconSrc = getIcon[props.category] || "";
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full animate__animated animate__bounceInDown">
      <figure>
        <img src={iconSrc} alt={props.category} />
      </figure>
      <div className="card-body">
        <div className="flex">

        <h2 className="card-title mr-auto">{props.title}</h2>
        {!isSaveEventButtonVisible && (
          <button className="btn btn-primary" onClick={handleDeleteSavedEventClick}>Remove</button>
          )}
        </div>
        <p>{props.description}</p>
        <p>{props.price} SEK</p>
        <CountdownTimer targetDate={props.startTime} />
        <div className="card-actions justify-center mt-10">
          <button className="btn btn-primary" onClick={handleSeeDetailsClick}>
            See Details
          </button>
          {isSaveEventButtonVisible&& isIdANumber && (
            <button className="btn btn-primary" onClick={handleSaveEventClick}>
              Save Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
