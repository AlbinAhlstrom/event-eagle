import { useForm, SubmitHandler } from "react-hook-form";
import { EventListing, categoryType } from "../util";
import { defaultEventListing } from "../util";
import { categories } from "../util";
import MapWindow from "./MapWindow";
import { useEffect, useState } from "react";

type props = {
  onSave: (formData: EventListing) => void;
  defaultEvent?: EventListing;
  title?: string;
};

type formFields = {
  title: string;
  description: string;
  startTime: Date;
  price: number;
  category: categoryType;
  latitude: number;
  longitude: number;
};

const EventForm = ({ defaultEvent = defaultEventListing, title = "",}: props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<formFields>();

  const [latitude, setLatitude] = useState(defaultEvent.latitude,);
  const [longitude, setLongitude] = useState(defaultEvent.longitude,);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude( position.coords.latitude)
        setLongitude( position.coords.longitude)
      }
    );
  }, []);

  const onSubmit: SubmitHandler<formFields> = (data) => {
    console.log(data);
  };

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
              {...register("price", {
                required: false,
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
              value={defaultEvent.category}
              defaultValue={defaultEvent.category}
            >
              <option disabled selected></option>
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
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body w-full h-80vh rounded">
          <input className="hidden" {...register("latitude")} />
          <input className="hidden" {...register("longitude")} />
          <div className="h-full w-full">
            <MapWindow position={{lat}} setPosition={setPosition} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
