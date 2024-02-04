import { useForm, SubmitHandler } from "react-hook-form";
import { categories } from "../util";
import MapWindow from "./MapWindow";
import { useEffect, useState } from "react";
import {
  Coordinate,
  EventListing,
  formFields,
  formToListing,
  defaultEventListing,
} from "../util";

type props = {
  onSave: (formData: EventListing) => void;
  defaultEvent: EventListing;
  title?: string;
};

const EventForm = ({ onSave, defaultEvent, title = "" }: props) => {
  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<formFields>();

  const onSubmit: SubmitHandler<formFields> = (data) => {
    onSave(formToListing(data));
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
        return;
      });
    }
    updatePosition({ lat: defaultEvent.latitude, lng: defaultEvent.longitude });
  }, [defaultEvent]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-4 h-80vh"
    >
      <div className="card w-96 h-80vh bg-neutral text-neutral-content">
        <div className="card-body">
          <h1 className="text-xl">{title ? title : "Create new event:"}</h1>
          <label>
            <p className="label-text">{"title"}</p>
            <input
              className="input input-bordered"
              defaultValue={defaultEvent.title}
              {...register("title", { required: "Title is required." })}
            />
            {errors.title && (
              <div className="text-error">{errors.title.message}</div>
            )}
          </label>
          <label>
            <p className="label-text">{"description"}</p>
            <input
              className="input input-bordered"
              defaultValue={defaultEvent.description}
              {...register("description")}
            />
          </label>
          <label>
            <p className="label-text">{"start time"}</p>
            <input
              type="datetime-local"
              className="input input-bordered"
              {...register("startTime", { required: true })}
            />
            {errors.startTime && (
              <div className="text-error">{errors.startTime.message}</div>
            )}
          </label>
          <label>
            <p className="label-text">{"price"}</p>
            <input
              className="input input-bordered"
              defaultValue={defaultEvent.price}
              {...register("price", {
                required: true,
                validate: {
                  isNumeric: (value) => !isNaN(value),
                  isPositive: (value) => value >= 0,
                },
              })}
            />
            {errors.price && (
              <div className="text-error">
                {errors.price.type === "isNumeric" && (
                  <p>Please enter a valid price</p>
                )}
                {errors.price.type === "isPositive" && (
                  <p>Price must be positive</p>
                )}
              </div>
            )}
          </label>
          <label>
            <p className="label-text">{"category"}</p>
            <select
              className="select select-bordered"
              defaultValue={defaultEvent.category}
              {...register("category", { required: "This field is required" })}
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
        <div className="card-body w-80vh h-80vh rounded">
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
