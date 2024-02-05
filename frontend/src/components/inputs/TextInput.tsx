import React from "react";

type textInputProps = {
    register:  () => void;
}

const TextInput: React.FC<textInputProps> = ({register, name}) => {
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
