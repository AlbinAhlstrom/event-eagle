import React from "react";
import image from "../../images/background/nature.jpg";
import { CheckCircleIcon } from "@heroicons/react/solid";

const SuccessPage: React.FC = () => {
  return (
    <div
      className="hero min-h-screen animate-fadeIn"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center drop-shadow-2xl text-neutral-content bg-base-100 rounded-2xl p-10 animate-scaleUp">
        <div className="max-w-md">
          <CheckCircleIcon className="mx-auto mb-4 h-20 w-20 text-green-500" />
          <h1 className="mb-5 text-5xl font-bold">Congratulations!</h1>
          <p className="mb-5 text-xl">Payment successfull!</p>
          <p className="mb-5 text-xl">
            Check your <strong>e-mail</strong> inbox for confirmation and
            tickets.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
