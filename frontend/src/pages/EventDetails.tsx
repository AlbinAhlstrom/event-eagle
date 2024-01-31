import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import image from '../images/nature.jpg'
import { EventListing, defaultEventListing } from '../util';
import EventMiniMap from '../components/EventMiniMap';

const EventDetails = () => {
    const { id } = useParams<'id'>(); 
    const navigate = useNavigate();
    const [event, setEvent] = useState<EventListing>(defaultEventListing);
    const [startTime, setStartTime] = useState("");
    const position = {lat:event.latitude, lng:event.longitude}

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
                <span className='h-2/6 w-2/6 absolute top-20'>
                        <EventMiniMap position={position}/>
                        </span>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content glass rounded-md">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{event.title}</h1>
                        
                        <p className="mb-5 text-xl">{event.description}</p>
                        <p>{event.startTime.toString()}</p>
                        <p>{startTime}</p>
                        <p>{event.latitude}</p>
                        <p>{event.longitude}</p>
                        <p>{startTime}</p>

                        <h2 className='my-6 text-xl'>Price: {event.price} SEK</h2>

                        <p>{event.address}</p>
                        <button className='btn btn-primary' onClick={() => navigate('purchase/')}>Purchase</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventDetails;
