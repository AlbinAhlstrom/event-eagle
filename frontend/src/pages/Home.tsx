import { useNavigate } from "react-router-dom";
import Map from "../components/Map";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="hero h-screenH"

        style={{backgroundImage: 'url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)'}}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome</h1>
            <p className="mb-5 text-xl">
              Find and grab tickets to today's nearby events. Tap below to
              start your next adventure!
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/categories")}
            >
              Browse Categories
            </button>
            <Map/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
