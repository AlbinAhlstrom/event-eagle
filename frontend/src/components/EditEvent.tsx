import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EventListing, defaultEventListing } from "../util";
import PrimaryButton from "./PrimaryButton";
import MapWindow from "./MapWindow";

const EditEvent = () => {
  const { id } = useParams<"id">(); // Assuming that useParams is generic in TypeScript.
  const [event, setEvent] = useState<EventListing>(defaultEventListing);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const navigate = useNavigate();
  const BASE_URL = "https://event-eagle.azurewebsites.net";

  // Fetching the event to be edited
  useEffect(() => {
    const fetchEvent = async () => {
      const EVENTS_ENDPOINT = `${BASE_URL}/Events/${id}`;
      try {
        const response = await fetch(EVENTS_ENDPOINT);
        const data: EventListing = await response.json();
        setEvent(data);
        setPosition({ lat: data.latitude, lng: data.longitude });
      } catch (error) {
        console.error("Failed to fetch event", error);
      }
    };

    fetchEvent();
  }, [id, BASE_URL]);

  // Update an event
  const updateEvent = async (eventData: EventListing) => {
    const EVENTS_ENDPOINT = `${BASE_URL}/Events/${eventData.id}`;
    try {
      const response = await fetch(EVENTS_ENDPOINT, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
      if (response.ok) {
        navigate("/admin"); 
      } else {
        console.error("Failed to update event");
      }
    } catch (error) {
      console.error("Failed to update event", error);
    }
  };

  const handleChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = changeEvent.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (submitEvent: React.FormEvent) => {
    submitEvent.preventDefault();
    await updateEvent(event);
  };


  return (
    <form onSubmit={handleSubmit} className="flex items-center h-80vh">
      <section className="flex flex-col items-center h-full">
        <h1>Create new event:</h1>
        <div>
          <label>
            <div className="label">
              <span className="label-text">Title:</span>
            </div>
            <input
              type="text"
              name="title"
              className="input input-bordered input-ghost"
              value={event.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            <div className="label">
              <span className="label-text">Description:</span>
            </div>
            <textarea
              name="description"
              className="textarea textarea-bordered"
              value={event.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <h1>Start time:</h1>
          <input
            type="datetime-local"
            name="startTime"
            className="input input-bordered input-ghost"
            value={event.startTime.toString()}
            onChange={handleChange}
            required
          />
          <h1>End time:</h1>
          <input
            type="datetime-local"
            name="endTime"
            className="input input-bordered input-ghost"
            value={event.endTime.toString()}
            onChange={handleChange}
            required
          />
          <label>
            <div className="label">
              <span className="label-text">Latitude:</span>
            </div>
            <input
              type="text"
              name="latitude"
              className="input input-bordered input-ghost"
              value={event.latitude}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            <div className="label">
              <span className="label-text">Longitude:</span>
            </div>
            <input
              type="text"
              name="longitude"
              className="input input-bordered input-ghost"
              value={event.longitude}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Price:</span>
            </div>
            <input
              type="number"
              name="price"
              className="input input-bordered"
              value={event.price}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category:</span>
            </div>
            <input
              type="text"
              name="category"
              className="input input-bordered"
              value={event.category}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <PrimaryButton text="Submit" onClick={() => handleSubmit} />
        </div>
      </section>
      <section className="w-40vh h-40vh">
        <MapWindow position={position} setPosition={setPosition} />
      </section>
    </form>
  );
};

export default EditEvent;
