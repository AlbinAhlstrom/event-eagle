import React, { useState, useEffect } from "react";
import { EventListing, defaultEventListing } from "../util";
import MapWindow from "./MapWindow";
import TextInput from "./inputs/TextInput";
import DateTimeInput from "./inputs/DateTimeInput";
import TextArea from "./inputs/TextArea";

interface EventFormProps {
  postEvent: (event: EventListing) => Promise<void>;
}

const AddEventForm: React.FC<EventFormProps> = ({ postEvent }) => {
  const [position, setPosition] = useState({
    lat: 59.34676644462517,
    lng: 18.055573862709853,
  });
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
    setEventListing((listing) => ({
      ...listing,
      latitude: position.lat,
      longitude: position.lng,
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
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body">
            <h2 className="card-title">Create new event:</h2>
            <TextInput
              title="Title:"
              name="title"
              value={eventListing.title}
              onChange={handleChange}
            />

            <TextArea
              title="Description"
              name="description"
              value={eventListing.description}
              onChange={handleChange}
            />
            <DateTimeInput
              title="Start time:"
              name="startTime"
              value={eventListing.startTime}
              onChange={handleChange}
            />
            <DateTimeInput
              title="End time:"
              name="endTime"
              value={eventListing.endTime}
              onChange={handleChange}
            />
            <TextInput
              title="Latitude:"
              name="latitude"
              value={eventListing.latitude}
              onChange={handleChange}
              hidden={true}
            />
            <TextInput
              title="Longitude:"
              name="longitude"
              value={eventListing.longitude}
              onChange={handleChange}
              hidden={true}
            />
            <TextInput
              title="Price:"
              name="price"
              value={eventListing.price}
              onChange={handleChange}
            />
            <TextInput
              title="Category:"
              name="category"
              value={eventListing.category}
              onChange={handleChange}
            />
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={() => handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-40vh h-40vh">
        <MapWindow position={position} setPosition={setPosition} />
      </section>
    </form>
  );
};

export default AddEventForm;
