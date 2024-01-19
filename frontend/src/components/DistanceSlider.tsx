import React from 'react';

const DistanceSlider = ({ value, onChange }: {value: number, onChange: () => void}) => {
  return (
    <>
      <input
        type="range"
        min={0}
        max="20 km"
        value={value}
        className="range range-secondary"
        onChange={onChange}
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>0 km</span>
        <span>5 km</span>
        <span>10 km</span>
        <span>15 km</span>
        <span>20 km</span>
      </div>
    </>
  );
};

export default DistanceSlider;