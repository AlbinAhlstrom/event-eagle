import React from "react";

const DistanceSlider = ({
  value,
  onChange,
}: {
  value: number;
  onChange: () => void;
}) => {
  return (
    <>
    <div className="flex flex-col justify-center px-20">
    <input
        type="range"
        min={0}
        max={10}
        step={0.1}
        value={value}
        className="range range-secondary px-7"
        onChange={onChange}
      />
      <div className="w-full flex justify-between text-xs px-4">
        <span>0 km</span>
        <span>2 km</span>
        <span>4 km</span>
        <span>6 km</span>
        <span>8 km</span>
        <span>10 km</span>
      </div>
      <h1>{value}</h1>
    </div>
      
    </>
  );
};

export default DistanceSlider;
