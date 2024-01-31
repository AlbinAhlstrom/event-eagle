import React from "react";

type textInputProps = {
    title: string,
    name: string,
    value: string | number,
    hidden?: boolean,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const TextInput: React.FC<textInputProps> = ({title, name, value, onChange, hidden}) => {
  if (hidden) return(<></>)
  
  return (
    <div>
      <label>
        <div className="label">
          <span className="label-text">{title}</span>
        </div>
        <input
          name={name}
          className="input input-bordered"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default TextInput;
