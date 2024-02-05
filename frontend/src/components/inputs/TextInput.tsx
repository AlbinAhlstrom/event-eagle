import React from "react";

type TextInputProps = {
  register: () => void;
  title: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hidden?: boolean; 
};

const TextInput: React.FC<TextInputProps> = ({
  register,
  title,
  name,
  value,
  onChange,
  hidden = false,
}) => {
  if (hidden) return <></>;

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
          ref={register} // Assuming you want to use the ref for form registration
        />
      </label>
    </div>
  );
};

export default TextInput;
