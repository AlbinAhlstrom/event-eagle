import React from "react";
import { useNavigate } from "react-router-dom";
import sports from "../images/sports-icon.webp";
import family from "../images/family-icon.webp";
import arts from "../images/arts-icon.webp";
import music from "../images/music-icon.webp";
import CountdownTimer from "./CountDown";
import { IconMap, Event } from "../util";
import { useClerk } from "@clerk/clerk-react";
import { useState } from "react";
import "animate.css"

const getIcon: IconMap = {
  Music: music,
  Sports: sports,
  Arts: arts,
  Family: family,
};

type Props = {
  event: Event;
  updateSavedEvents: () => void;
};

const EventCard: React.FC<Props> = ({event, updateSavedEvents }) => {
  const navigate = useNavigate();
  const { user } = useClerk();
  const [deleteAnimEventId, setDeleteAnimEventId] = useState<string | null>(null);

  const handleSeeDetailsClick = () => {
    navigate(`/event/${event.id}`, { state: { event: event } });
  };

  const userEvent = {
    userId: user?.id,
    eventId: event.id,
    createdByUser: false,
  };

  const PostUserEvent = () => {
    return fetch("https://event-eagle.azurewebsites.net/Events/add/userEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userEvent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
        throw error;
      });
  };
  
  const handleDeleteEvent = async () => {
    try {
      const response = await fetch(
        `  https://event-eagle.azurewebsites.net/Events/userEvents/delete?userId=${user?.id}&eventId=${event.id}`,
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
      .then(() => updateSavedEvents())
      .then(() => navigate("/savedEvents"))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDeleteSavedEventClick = async () => {
    try {
      setDeleteAnimEventId(event.id);
      await handleDeleteEvent();
      await updateSavedEvents();

      const element = document.getElementById(`event-card-${event.id}`);
      element.addEventListener('animationend', () => {
        navigate("/savedEvents");
        setDeleteAnimEventId(null);
      }, { once: true });
      
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const isSaveEventButtonVisible = location.pathname !== "/savedEvents";

  const isFromTicketmaster = event.description === "Ticketmaster Event";

  const iconSrc = getIcon[event.category] || "";
  return (
      <div className={`card w-96 bg-base-100 shadow-xl image-full animate__animated ${deleteAnimEventId === event.id ? 'animate__fadeOut' : 'animate__fadeIn'}`} id={`event-card-${event.id}`}>
      <figure>
        <img src={iconSrc} alt={event.category} />
      </figure>
      <div className="card-body">
        <div className="flex">
          <h2 className="card-title mr-auto">{event.title}</h2>
          {isSaveEventButtonVisible && !isFromTicketmaster && (
            <button className="" onClick={handleSaveEventClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 hover:scale-125 transform transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="#4B9980"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>
          )}
          {!isSaveEventButtonVisible && (
            <button
              onClick={handleDeleteSavedEventClick}
            >
<svg xmlns="http://www.w3.org/2000/svg" className="saved-event h-8 w-8 hover:scale-125 transform transition duration-150 ease-in-out" fill="none" viewBox="0 0 24 24" stroke="#FA91A8">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
</svg>            </button>
          )}
        </div>
        <p>{event.description}</p>
        <p>{event.price} SEK</p>
        <CountdownTimer targetDate={event.startTime} />
        <div className="card-actions justify-center mt-10">
          <button className="btn btn-primary" onClick={handleSeeDetailsClick}>
            See Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
