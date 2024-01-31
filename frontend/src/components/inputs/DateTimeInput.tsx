import React from "react";

type dateTimeInputProps = {
    title: string,
    name: string,
    value: Date,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const toLocalDateTimeString = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-indexed, add 1
  const day = date.getDate().toString().padStart(2, '0');
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const localDateString = `${year}-${month}-${day}T${hour}:${minutes}`;
  return localDateString;
};

const DateTimeInput: React.FC<dateTimeInputProps> = ({title, name, value, onChange}) => {
  return (
    <div>
      <label>
        <div className="label">
          <span className="label-text">{title}</span>
        </div>
        <input
          type="datetime-local"
          name={name}
          className="input input-bordered input-ghost"
          value={toLocalDateTimeString(value)}
          onChange={onChange}
          required
        />
      </label>
    </div>
  );
};

export default DateTimeInput;
