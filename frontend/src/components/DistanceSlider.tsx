import React, { useState } from 'react';

const DistanceSlider = () => {
  const [sliderValue, setSliderValue] = useState(25);
  
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  return (
    <>
      <input
        type="range"
        min={0}
        max="100"
        value={sliderValue}
        className="range range-secondary"
        step="25"
        onChange={handleSliderChange} 
      />
      <div className="w-full flex justify-between text-xs px-2">
        <span>0 km</span>
        <span>5 km </span>
        <span>10 km </span>
        <span>15 km</span>
        <span>20 km</span>
      </div>
    </>
  );
};

export default DistanceSlider;