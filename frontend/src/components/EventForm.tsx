import { useForm, useController } from "react-hook-form";
import { EventListing } from "../util";
import { defaultEventListing } from "../util";
import { categoryType, categories } from "../util";
import Select from "react-select";
import MapWindow from "./MapWindow";
import "flatpickr/dist/themes/material_green.css";

const categoryOptions = [
  { value: categories.music, label: categories.music },
  { value: categories.sports, label: categories.sports },
  { value: categories.arts, label: categories.arts },
  { value: categories.family, label: categories.family },
] as const;

type categoryOption = {
  value: categoryType;
  label: categoryType;
};

type props = {
  onSave: (formData: EventListing) => void;
  defaultEvent?: EventListing;
};

const EventForm = ({ onSave, defaultEvent = defaultEventListing }: props) => {
  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: defaultEvent,
  });

  const handleSave = async (formValues: EventListing) => {
    await onSave(formValues);
  };


  const { field } = useController({ name: "category", control });

  const handleFieldChange = (newValue?: categoryOption) => {
    field.onChange(newValue ? newValue.value : categoryOptions[0]);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="flex items-center h-80vh"
    >
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body">
          <label>
            <div className="label">
              <span className="label-text">{"title"}</span>
            </div>
            <input className="input input-bordered" {...register("title")} />
          </label>
          <label>
            <div className="label">
              <span className="label-text">{"description"}</span>
            </div>
            <textarea className="textarea textarea-bordered" {...register("description")} />
          </label>

          <div className="card-actions justify-end">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
          <div>
          <p>Start Time</p>
          <input
            type="datetime-local"
            {...register("startTime")}
          />
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
            <p>Price</p>
            <input type="number" {...register("price")} />
          </div>
          <div>
            <p>Category</p>
            <Select
              value={categoryOptions.find(
                (option) => option.value === field.value
              )}
              onChange={handleFieldChange}
              options={categoryOptions}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
