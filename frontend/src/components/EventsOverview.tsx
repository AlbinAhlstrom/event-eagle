import { EventListing } from "../util";
import EditEventCard from "./EditEventCard";

interface EventsOverviewProps {
    events: EventListing[];
    deleteEvent: (id: number) => void;
}

const EventsOverview = ({events, deleteEvent}: EventsOverviewProps) => {
  return (
    <>
      <h1>Events</h1>
      <ul className="flex flex-wrap gap-10">
        {events.map((event) => (
          <li key={event.id}>
            <EditEventCard event={event} onDelete={deleteEvent}/>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventsOverview;
