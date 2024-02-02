import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import flatpickr from "flatpickr";
import "flatpickr/dist/themes/material_green.css";

import {
  EventListing,
  defaultEventListing,
  categoryType,
  categories,
} from "../util";

const categoryOptions = [
  { value: categories.music, label: categories.music },
  { value: categories.sports, label: categories.sports },
  { value: categories.arts, label: categories.arts },
  { value: categories.family, label: categories.family },
];

type Props = {
  onSave: (formData: EventListing) => void;
  defaultEvent?: EventListing;
};

const EventForm = ({ onSave, defaultEvent = defaultEventListing }: Props) => {
  const { control, handleSubmit } = useForm<EventListing>({
    defaultValues: defaultEvent,
  });

  const handleSave = async (formValues: EventListing) => {
    await onSave(formValues);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSave)}
      className="flex items-center h-[80vh]"
    >
      <div className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body">
          <label>
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input className="input input-bordered" {...field} />
              )}
            />
          </label>

          <label>
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea className="textarea textarea-bordered" {...field} />
              )}
            />
          </label>

          <div>
            <span>Start Time</span>
            <Controller
              name="startTime"
              control={control}
              render={({ field: { onChange, onBlur, name, value } }) => (
                <input
                  type="text"
                  className="input input-bordered"
                  name={name}
                  value={value}
                  onBlur={onBlur}
                  ref={(input) => {
                    if (input) {
                      flatpickr(input, {
                        enableTime: true,
                        dateFormat: "Y-m-d H:i",
                        minDate: "today",
                        time_24hr: true,
                        onChange: (selectedDates) => {
                          onChange(selectedDates[0].toISOString());
                        },
                      });
                    }
                  }}
                />
              )}
            />
          </div>

          <div>
            <span>Venue</span>
            <Controller
              name="venue"
              control={control}
              render={({ field }) => (
                <input className="input input-bordered" {...field} />
              )}
            />
          </div>

          <div>
            <span>Address</span>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <input className="input input-bordered" {...field} />
              )}
            />
          </div>

          <div>
            <span>Price</span>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  className="input input-bordered"
                  {...field}
                />
              )}
            />
          </div>

          <div>
            <span>Category</span>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  value={categoryOptions.find(
                    (option) => option.value === field.value
                  )}
                  onChange={(option) => field.onChange(option.value)}
                  options={categoryOptions}
                  className="basic-single"
                  classNamePrefix="select"
                />
              )}
            />
          </div>

          <div className="card-actions justify-end mt-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EventForm;
