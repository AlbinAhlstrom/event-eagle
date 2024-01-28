import { Link } from "react-router-dom";
import logo from '../images/event-eagle-logo-nobg.webp';

const Header = () => {
  return (
    <div
      className="navbar bg-base-100 self-start shadow h-nav z-50 sticky top-0"
    >
      <Link to="/home" className="btn btn-ghost text-xl h-full">
      <img src={logo} className="h-full"></img>

        Event Eagle
      </Link>
    </div>
  );
};

export default Header;
