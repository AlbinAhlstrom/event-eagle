import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="hero h-screen-h flex-initial"
        style={{
          backgroundImage:
            "url(https://cdn.sanity.io/images/fvrrd1kn/production/94eaa6cb42a17d86fc66906bd19ec6d548e22a7a-8192x5464.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome</h1>
            <p className="mb-5 text-xl">
              Find and grab tickets to today's nearby events. Tap below to start
              your next adventure!
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/categories")}
            >
              Browse Categories
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
