import { useForm, useController } from "react-hook-form";
import { EventListing } from "../util";
import { defaultEventListing } from "../util";
import { categoryType, categories } from "../util";
import MapWindow from "./MapWindow";

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
  const { register, control, handleSubmit } = useForm({
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
            <p className="label-text">{"title"}</p>
            <input className="input input-bordered" {...register("title")} />
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
              {...register("startTime")}
            />
          </label>
          <label>
          <p className="label-text">{"price"}</p>
            <input className="input input-bordered" {...register("price")} />
          </label>
          <label>
          <p className="label-text">{"category"}</p>
          <select
            className="select select-bordered"
            value={field.value}
            onChange={handleFieldChange}
          >
            <option disabled selected>
            </option>
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
    </form>
  );
};

export default EventForm;
