import { Link } from "react-router-dom";
import logo from '../images/event-eagle-logo-nobg.webp';
import { useNavigate } from "react-router-dom";
import { UserButton } from '@clerk/clerk-react';


const Header = () => {

const navigate = useNavigate()

  return (
    <div
      className="navbar bg-base-100 shadow h-nav z-50 sticky top-0 h-nav-h"
    >
      
  <div className="flex-1">
    <Link to="/home" className="btn btn-ghost text-xl h-nav-icon-h">
      <img src={logo} className="h-full"></img>
        <h1>Event Eagle</h1>
      </Link>
  </div>
  <div className="flex-none">
    <button className="btn btn-square btn-ghost" onClick={() => navigate("/admin")}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
    </button>
  </div>
    <UserButton afterSignOutUrl="/"/>

    </div>
    
  );
};

export default Header;
