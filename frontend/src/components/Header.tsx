import { Link } from "react-router-dom";
import logo from "../images/event-eagle-logo-nobg.webp";
import cogIcon from "../images/eagleCog.png";
import { useNavigate } from "react-router-dom";
import { UserButton, useClerk } from "@clerk/clerk-react";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useClerk();

  let savedEventsButton = null;
  let adminButton = null;
  let sellTicketButton = null;

  if (user) {
    // User is signed in, show Saved Events button
    savedEventsButton = (
      <button
        className="btn btn-ghost text-xl h-nav-icon-h"
        onClick={() => navigate("/savedEvents")}
      >
        Saved Events
      </button>
    );

    sellTicketButton = (
      <button
        className="btn btn-ghost text-xl h-nav-icon-h"
        onClick={() => navigate("/sellticket")}
      >
        Sell Tickets
      </button>
    );

    // Check if the user is an admin
    if (user.publicMetadata.role === "admin") {
      adminButton = (
        <button
          className="btn btn-ghost text-xl h-nav-icon-h"
          onClick={() => navigate("/admin")}
        >
          Admin
        </button>
      );
    }
  }

  return (
    <div className="navbar bg-base-100 shadow-lg h-nav z-50 sticky top-0 h-nav-h">
      <div className="flex-1">
        <Link to="/home" className="btn btn-ghost text-xl h-nav-icon-h">
          <img src={logo} className="h-full" alt="Event Eagle Logo" />
          <h1>Event Eagle</h1>
        </Link>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
          <img src={cogIcon} className="h-14" alt="Event Eagle Logo" />

          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>{sellTicketButton}</li>
            <li>{savedEventsButton}</li>
            <li>{adminButton}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
