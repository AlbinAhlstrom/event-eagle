const DistanceSlider = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="card card-compact mt-0">
      <div className="card-body bg-neutral rounded-lg flex justify-center">
        <input
          type="range"
          min={0.2}
          max={10}
          step={0.01}
          value={value}
          className="range range-primary flex-0"
          onChange={onChange}
        ></input>
        <span>Events within {}</span>
      </div>
    </div>
  );
};

export default DistanceSlider;
