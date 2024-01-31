import { EventListing, defaultEventListing } from '../util';
import EventForm from '../components/EventForm';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate()

  const postEvent = async (event: Omit<EventListing, "id">) => {
    const BASE_URL = "http://event-eagle.azurewebsites.net"
    const EVENTS_ENDPOINT = `${BASE_URL}/Events`;
    const response = await fetch(EVENTS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    const data: EventListing = await response.json();
    console.log(data)
    navigate("/admin");

  };

    return (
        <div className="flex flex-col items-center h-screen-h">
          <EventForm event={defaultEventListing} onFormSubmit={postEvent} />
          <button className='btn btn-primary fixed bottom-2 mt-auto self-center' onClick={() => navigate("/admin")}>Back to dashboard</button>
        </div>
      )
}

export default Create