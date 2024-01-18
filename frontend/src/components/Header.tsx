import { Link } from "react-router-dom";

const Header = () => {
  return (
      <nav className="navbar bg-primary text-white shadow-inner">
        <Link to="/home" className="btn btn-ghost text-xl">Event Eagle</Link>
      </nav>
  );
};

export default Header;
