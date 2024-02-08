const DistanceSlider = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const distanceUnit = () => value < 1 
    ? "m" 
    : "km"

  const distanceValue = () => value < 1 
    ? Math.round(value*10) * 100
    : Math.round(value)

  return (
    <div className="card card-compact mt-0">
      <div className="card-body bg-neutral rounded-lg flex justify-center">
        <input
          type="range"
          min={0.1}
          max={10}
          step={0.01}
          value={value}
          className="range range-primary flex-0"
          onChange={onChange}
        ></input>
        <span className="text-md">events within <span className="font-bold text-lg">{distanceValue()}</span> {distanceUnit()}:</span>
      </div>
    </div>
  );
};

export default DistanceSlider;
