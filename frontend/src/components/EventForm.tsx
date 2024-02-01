import {useForm} from "react-hook-form"
import { defaultEventListing } from "../util";
import MapWindow from "./MapWindow";
export interface FormFields {
  title: string
}

type props = {
  onSave: (formData: FormFields) => void
  defaultEvent: FormFields
}

const EventForm = ({ onSave, defaultEvent = defaultEventListing}: props) => {
  const { register, control, handleSubmit } = useForm({defaultValues:defaultEvent})

  const handleSave = async (formValues: FormFields) => {
    await onSave(formValues);
  };

  return (
    <form onSubmit={handleSubmit(handleSave)} className="flex items-center h-80vh">
        <div className="card w-96 bg-neutral text-neutral-content">
          <div className="card-body">
            <h2 className="card-title">Create new event:</h2>
            <input {...register("title")}/>
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
