import React from "react";
import image from '../images/nature.jpg';


const SuccessPage: React.FC = () => {
  return (
    
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center drop-shadow-2xl text-neutral-content bg-base-100 rounded-2xl p-10">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome</h1>
            <p className="mb-5 text-xl">
             . Tap below to start
              your next adventure!
            </p>
            <button
              className="btn btn-primary"
            >
              Browse Categories
            </button>
          </div>
        </div>
      </div>
    
  );
};

export default SuccessPage;