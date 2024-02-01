import { useForm } from "react-hook-form";
import { EventListing } from "../util";
import { defaultEventListing } from "../util";
import MapWindow from "./MapWindow";
export interface FormFields {
  title: string;
}

type props = {
  onSave: (formData: EventListing) => void;
  defaultEvent: EventListing;
};

const EventForm = ({ onSave, defaultEvent = defaultEventListing }: props) => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: defaultEvent,
  });

  const handleSave = async (formValues: EventListing) => {
    await onSave(formValues);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="flex items-center h-80vh"
    >
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body">
          <h2 className="card-title">Create new event:</h2>
          <div>
            <p>Title</p>
            <input {...register("title")} />
          </div>
          <div>
            <p>Description</p>
            <textarea {...register("description")} />
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
          <div>
            <p>Start Time</p>
            <input type="datetime-local" {...register("startTime")} />
          </div>
          <div>
            <p>End Time</p>
            <input type="datetime-local" {...register("endTime")} />
          </div>
          <div>
            <p>Venue</p>
            <input {...register("venue")} />
          </div>
          <div>
            <p>Address</p>
            <input {...register("address")} />
          </div>
          <div>
            <p>Latitude</p>
            <input type="number" {...register("latitude")} />
          </div>
          <div>
            <p>Longitude</p>
            <input type="number" {...register("longitude")} />
          </div>
          <div>
            <p>Price</p>
            <input type="number" {...register("price")} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
