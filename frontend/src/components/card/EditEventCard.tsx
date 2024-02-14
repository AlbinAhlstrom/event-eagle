import React from "react";
import sports from "../../images/icon/sports-icon.webp";
import family from "../../images/icon/family-icon.webp";
import arts from "../../images/icon/arts-icon.webp";
import music from "../../images/icon/music-icon.webp";
import { IconMap } from "../../util";
import { Event } from "../../util";
import { useNavigate } from "react-router-dom";

const getIcon: IconMap = {
  Music: music,
  Sports: sports,
  Arts: arts,
  Family: family,
};

interface EditEvenCardProps {
  event: Event;
  deleteEvent: (event: Event) => void;
}

const EditEventCard: React.FC<EditEvenCardProps> = ({ event, deleteEvent }) => {
  const iconSrc = getIcon[event.category] || "";
  const navigate = useNavigate();

  const handleUpdateEvent = () => navigate(`/events/${event.id}/edit`);
  const handleDeleteEvent = () => deleteEvent(event);
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
          <div className="flex gap-2">
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
