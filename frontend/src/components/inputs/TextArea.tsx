import React from "react";

type textAreaProps = {
    title: string,
    name: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea: React.FC<textAreaProps> = ({title, name, value, onChange}) => {
  return (
    <div>
      <label>
        <div className="label">
          <span className="label-text">{title}</span>
        </div>
        <textarea
          name={name}
          className="input input-bordered input-ghost"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

export default TextArea;
