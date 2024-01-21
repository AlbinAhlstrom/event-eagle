import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  return (
    <>

      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
      >
        <Header/>
        <div className="hero-overlay bg-opacity-100"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome</h1>
            <p className="mb-5 text-xl">
              Find and grab tickets to today's nearby events. Tap below and start your next adventure!
            </p>
            <button className="btn btn-primary" onClick={() => navigate("/categories")}>Browse Categories</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
