import { Link } from "react-router-dom";

const Header = () => {
  return (
      <nav className="navbar bg-base-100 ">
        <Link to="/home" className="btn btn-ghost text-xl">Event Eagle</Link>
      </nav>
  );
};

export default Header;
