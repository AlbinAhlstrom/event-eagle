const DistanceSlider = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <div className="mx-10 mt-4">
        <input
          type="range"
          min={0.2}
          max={10}
          step={0.01}
          value={value}
          className="range range-primary"
          onChange={onChange}
        />
        <div className=" flex justify-between text-xs">
          <span className="slider-marking" id="0">
            0 km
          </span>
          <span className="slider-marking" id="2">
            2
          </span>
          <span className="slider-marking" id="4">
            4
          </span>
          <span className="slider-marking" id="6">
            6
          </span>
          <span className="slider-marking" id="8">
            8
          </span>
          <span className="slider-marking" id="10">
            10 km
          </span>
        </div>
      </div>
    </>
  );
};

export default DistanceSlider;
