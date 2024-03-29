import { SignedOut, SignUpButton, SignInButton } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <div
      className="hero h-screen-h flex flex-col justify-center items-center"
      style={{
        backgroundImage:
          "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
      }}
    >
      <SignedOut >
        <div className="hero-overlay bg-opacity-60 flex items-center justify-center">
          <div className="flex flex-col w-2/3 items-center justify-center">
            <h1 className="text-5xl font-bold mb-5 ">Welcome!</h1>
            <p className="mb-5 text-xl">Sign in or sign up to continue</p>
            <div className="flex gap-2">
              <button className="btn text-xl font-bold btn-primary w-28">
                <SignInButton redirectUrl="/home">Log in</SignInButton>
              </button>
              <button className="btn text-xl font-bold btn-primary w-28">
                <SignUpButton />
              </button>
            </div>
          </div>
        </div>
      </SignedOut>
    </div>
  );
};

export default SignInPage;
