import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import image from '../images/nature.jpg'
import { EventListing, defaultEventListing } from '../helpers/util';

const EventDetails = () => {
    const { id } = useParams<'id'>(); 
    const [event, setEvent] = useState<EventListing>(defaultEventListing);
    const [startTime, setStartTime] = useState("");

    useEffect(() => {
        const fetchEvent = async () => {
            const BASE_URL = 'http://localhost:5004/';
            const EVENT_ENDPOINT = `${BASE_URL}Events/${id}`;
            try {
                const response = await fetch(EVENT_ENDPOINT);
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data = await response.json() as EventListing;

                setEvent(data);
                setStartTime(event.startTime.toTimeString())
            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            fetchEvent();
        }
    }, [id]);

    if (!event) {
        return <div>Loading event details...</div>;
    }

    return (
        <>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url(${image})`,
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content glass rounded-md">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{event.title}</h1>
                        
                        <p className="mb-5 text-xl">{event.description}</p>
                        <p>{event.startTime.toString()}</p>
                        <p>{startTime}</p>

                        <h2 className='my-6 text-xl'>Price: {event.price} SEK</h2>

                        <p>{event.address}</p>
                        <p>venue: {event.venue}</p>

                    </div>
                </div>
            </div>
        </>
    );
};

export default EventDetails;
