import { EventListing } from "../util";

interface EventsOverviewProps {
    events: EventListing[];
    deleteEvent: (id: number) => void;
}

const EventsOverview = ({events, deleteEvent}: EventsOverviewProps) => {
  return (
    <>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title}
            <button className="btn" onClick={() => deleteEvent(event.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default EventsOverview;
