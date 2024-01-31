import React from "react";

type dateTimeInputProps = {
    title: string,
    name: string,
    value: Date,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

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
          value={value.toLocaleString()}
          onChange={onChange}
          required
        />
      </label>
    </div>
  );
};

export default DateTimeInput;
