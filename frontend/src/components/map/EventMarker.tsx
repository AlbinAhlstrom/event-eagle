import React from "react";
import { useNavigate } from "react-router-dom";
import sports from "../../images/icon/sports-icon.webp";
import family from "../../images/icon/family-icon.webp";
import arts from "../../images/icon/arts-icon.webp";
import music from "../../images/icon/music-icon.webp";
import CountdownTimer from "../countdown/MiniCountdown";
import { IconMap, Event } from "../../util";
import { useClerk } from "@clerk/clerk-react";

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

const EventMarker: React.FC<Props> = ({ event, updateSavedEvents }) => {
  const navigate = useNavigate();
  const { user } = useClerk();

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
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("Event deleted successfully");
    } catch (error) {
      console.error("Error:", error);
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
      await handleDeleteEvent();
      await updateSavedEvents();
      navigate("/savedEvents");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const isSaveEventButtonVisible = location.pathname !== "/savedEvents";

  const isFromTicketmaster = event.description === "Ticketmaster Event";

  const iconSrc = getIcon[event.category] || "";
  return (
    <div className="card w-64 h-64 bg-neutral z-50  animate__animated animate__bounceInDown">
      <figure>
        <img src={iconSrc} alt={event.category} />
      </figure>
      <div className="card-body">
        <div className="flex">
          <h2 className="card-title mr-auto">{event.title}</h2>
          {!isSaveEventButtonVisible && (
            <button
              className="btn btn-primary"
              onClick={handleDeleteSavedEventClick}
            >
              Remove
            </button>
          )}
        </div>
        <p>{event.price} SEK</p>
        <CountdownTimer targetDate={event.startTime} />
        <div className="flex flex-row">
          <div className="flex flex-row card-actions justify-center mt-10">
            <button className="btn btn-primary" onClick={handleSeeDetailsClick}>
              See Details
            </button>
            {isSaveEventButtonVisible && !isFromTicketmaster && (
              <button
                className="btn btn-primary w-12"
                onClick={handleSaveEventClick}
              >
                Pin Event
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventMarker;
