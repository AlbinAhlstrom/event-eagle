/* eslint-disable */

import { useForm, SubmitHandler } from "react-hook-form";
import { categories } from "../util";
import MapWindow from "./map/FormMap";
import { useEffect, useState } from "react";
import { Coordinate, Event, formFields, defaultEventListing } from "../util";

type Props = {
  onSave: (formData: formFields) => void;
  defaultEvent: Event;
  title?: string;
};

const EventForm = ({ onSave, defaultEvent, title = "" }: Props) => {
  // Form
  const { register, handleSubmit, setValue } = useForm<formFields>({
    defaultValues: defaultEvent,
  });

  const onSubmit: SubmitHandler<formFields> = (data) => {
    console.log("updated event:", data);
    onSave(data);
  };

  // Position
  const [{ lat, lng }, setPosition] = useState({
    lat: defaultEvent.latitude,
    lng: defaultEvent.longitude,
  });

  const updatePosition = (newPosition: Coordinate) => {
    setPosition(newPosition);
    setValue("latitude", newPosition.lat);
    setValue("longitude", newPosition.lng);
  };

  useEffect(() => {
    if (defaultEvent === defaultEventListing) {
      console.log("creating new event");
      navigator.geolocation.getCurrentPosition((position) => {
        updatePosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setValue("title", defaultEvent.title);
        setValue("category", defaultEvent.category);
        return;
      });
    }
    updatePosition({ lat: defaultEvent.latitude, lng: defaultEvent.longitude });
  }, [defaultEvent]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex justify-center items-center gap-4 h-80vh"
    >
      <div className="card w-96 h-80vh bg-neutral text-neutral-content">
        <div className="card-body">
          <h1 className="text-xl">{title ? title : "Create new event:"}</h1>
          <label>
            <p className="label-text">{"title"}</p>
            <input
              type="text"
              className="input input-bordered w-3/4"
              {...register("title")}
            />
          </label>
          <label>
            <p className="label-text">{"description"}</p>
            <input
              className="input input-bordered  w-3/4"
              {...register("description")}
            />
          </label>
          <label>
            <p className="label-text">{"start time"}</p>
            <input
              type="datetime-local"
              className="input input-bordered  w-3/4"
              {...register("startTime")}
            />
          </label>
          <label>
            <p className="label-text">{"price"}</p>
            <input
              className="input input-bordered  w-3/4"
              defaultValue={defaultEvent.price}
              {...register("price")}
            />
          </label>
          <label>
            <p className="label-text">{"category"}</p>
            <select
              className="select select-bordered w-3/4"
              {...register("category")}
            >
              <option value={categories.music}>{categories.music}</option>
              <option value={categories.sports}>{categories.sports}</option>
              <option value={categories.arts}>{categories.arts}</option>
              <option value={categories.family}>{categories.family}</option>
            </select>
          </label>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="card w-80vh h-80vh bg-neutral text-neutral-content">
        <div className="card-body w-full h-full rounded">
          <input
            className="hidden"
            {...register("latitude")}
            defaultValue={defaultEvent.latitude}
          />
          <input
            className="hidden"
            {...register("longitude")}
            defaultValue={defaultEvent.longitude}
          />
          <div className="h-full w-full">
            <MapWindow position={{ lat, lng }} setPosition={updatePosition} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
