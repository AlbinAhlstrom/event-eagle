import React from 'react';

// Convert the slider input (0-20) to the actual value (0.1-10)
const sliderToValue = (sliderValue: number) => {
  if (sliderValue <= 10) {
    return 0.1 + 0.9 * (sliderValue / 10);
  } else {
    return 1 + (sliderValue - 10);
  }
};

const valueToSlider = (value: number) => {
  if (value <= 1) {
    return ((value - 0.1) / 0.9) * 10;
  } else {
    return 10 + (value - 1);
  }
};

type Props = {
  value: number,
  onChange: (event: React.ChangeEvent) => void
}

const DistanceSlider = ({ value, onChange }: Props) => {
  const handleSliderChange = (event: React.ChangeEvent) => {
    onChange({ ...event, target: { ...event.target, value: sliderToValue(parseFloat(event.target.value)) } });
  };

  const distanceUnit = () => (value < 1 ? "m" : "km");

  const distanceValue = () => (value < 1 ? Math.floor(value * 10) * 100 : Math.floor(value));

  return (
    <div className="card card-compact mt-0 w-full flex-initial max-w-70vh">
      <div className="card-body bg-neutral flex justify-center">
        <input
          type="range"
          min="0.9"
          max="19"
          step="0.01"
          value={valueToSlider(value)}
          className="range range-primary flex-0"
          onChange={handleSliderChange}
        ></input>
        <span className="text-md">
          events within <span className="font-bold text-lg">{distanceValue()}</span> {distanceUnit()}:
        </span>
      </div>
    </div>
  );
};

export default DistanceSlider;