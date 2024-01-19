import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import image from '../images/nature.jpg'

type EventListing = {
    id: number;
    title: string;
    description: string;
    startTime: Date;
    endTime: Date;
    venue: string;
    address: string;
    latitude: number;
    longitude: number;
    price: number;
    category: "Music" | "Sports" | "Arts" | "Family";
};

const defaultEventListing: EventListing = {
    id: 0,
    title: "",
    description: "",
    startTime: new Date(),
    endTime: new Date(),
    venue: "",
    address: "",
    latitude: 0,
    longitude: 0,
    price: 0,
    category: "Music"
};

const EventDetails = () => {
    const navigate = useNavigate();
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
                setStartTime(event.startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
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
            <Header />
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: `url(${image})`,
                }}
            >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content glass">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">{event.title}</h1>
                        
                        <p className="mb-5 text-xl">{event.description}</p>
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
