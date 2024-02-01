import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { EventListing } from '../util';

const EditEvent = () => {
  const { id } = useParams<'id'>();
  const [eventData, setEventData] = useState(null);
  const navigate = useNavigate();

  const BASE_URL = 'https://event-eagle.azurewebsites.net';
  const EVENTS_ENDPOINT = `${BASE_URL}/Events/${id}`;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(EVENTS_ENDPOINT);
        if (!response.ok) {
          throw new Error('Event not found');
        }
        const data = await response.json();
        setEventData(data);
      } catch (error) {
        console.error('Failed to fetch event', error);
      }
    };

    fetchEvent();
  }, [EVENTS_ENDPOINT]);

  const updateEvent = async (eventData: EventListing) => {
    console.log('put here:', eventData);
    try {
      const response = await fetch(EVENTS_ENDPOINT, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }
      navigate('/admin');
    } catch (error) {
      console.error('Failed to update event', error);
    }
  };

  // Only display the form if eventData is present
  return eventData ? (
    <div className='div className="flex flex-col justify-center items-center h-screen-h"'>
    <EventForm event={eventData} onFormSubmit={updateEvent} />
    <button className='btn btn-primary fixed bottom-2 mt-auto self-center' onClick={() => navigate("/admin")}>Back to dashboard</button>
    </div>
  ) : (
    <p>Loading event...</p>
  );
};

export default EditEvent;