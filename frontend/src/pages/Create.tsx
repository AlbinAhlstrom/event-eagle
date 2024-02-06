import { Event, defaultEventListing } from '../util';
import EventForm from '../components/EventForm';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate()

  const postEvent = async (event: Event) => {
    console.log("posting", event)
    const BASE_URL = "http://event-eagle.azurewebsites.net"
    const EVENTS_ENDPOINT = `${BASE_URL}/Events`;
    const response = await fetch(EVENTS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    const data: Event = await response.json();
    console.log("posting", data)
    navigate("/admin");

  };

    return (
        <div className="flex flex-col items-center h-screen-h">
          <EventForm onSave={postEvent} defaultEvent={defaultEventListing}/>
          <button className='btn btn-primary fixed bottom-2 mt-auto self-center' onClick={() => navigate("/admin")}>Back to dashboard</button>
        </div>
      )
}

export default Create