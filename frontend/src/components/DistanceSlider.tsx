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
        step={0.5}
        value={value}
        className="range range-primary px-7"
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
      <div className="card shadow-md bg-ghost text-base-400 w-1/3 flex-auto">
    <div className="card-body ">
      <h2 className="card-title">
        Events less than {value} km away:
        </h2> 
    </div>
  </div> 

    </div>
      
    </>
  );
};

export default DistanceSlider;
