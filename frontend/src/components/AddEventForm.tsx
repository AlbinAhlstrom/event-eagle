import React, { useState, useEffect } from "react";
import { EventListing, defaultEventListing } from "../util";
import PrimaryButton from "./PrimaryButton";
import MapWindow from "./MapWindow";

interface EventFormProps {
  postEvent: (event: EventListing) => Promise<void>;
}

const AddEventForm: React.FC<EventFormProps> = ({ postEvent }) => {
  const [position, setPosition] = useState({lat: 59.34676644462517, lng: 18.055573862709853});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const [eventListing, setEventListing] =
    useState<EventListing>(defaultEventListing);

    useEffect(() => {
      setEventListing(listing => ({
        ...listing,
        latitude: position.lat,
        longitude: position.lng
      }));
    }, [position]);

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEventListing({ ...eventListing, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await postEvent({
      ...eventListing,
    });
    // Reset form after submission
    setEventListing(defaultEventListing);
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
            value={eventListing.title}
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
            value={eventListing.description}
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
            value={eventListing.startTime.toString()}
            onChange={handleChange}
            required
          />

            <h1>End time:</h1>

            <input
            type="datetime-local"
            name="endTime"
            className="input input-bordered input-ghost"
            value={eventListing.endTime.toString()}
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
            value={position.lat}
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
            value={position.lng}
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
            value={eventListing.price.toString()}
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
            value={eventListing.category}
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
      <MapWindow position={position} setPosition={setPosition}/>
      </section>
    </form>
  );
};

export default AddEventForm;
