import React from "react";
import image from "../../images/background/nature.jpg";
import { CheckCircleIcon } from "@heroicons/react/solid";

const SuccessPage: React.FC = () => {
  return (
    <div
      className="hero min-h-screen animate-fadeIn"
      style={{
        backgroundImage: `url(https://cdn.sanity.io/images/fvrrd1kn/production/b7356711b8c60bc9caea5c0c5c5c3a05870ea363-2994x2000.jpg?q=75&fit=clip&auto=format)`,
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
