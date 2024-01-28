import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="navbar bg-base-100 self-start shadow h-nav z-50 sticky top-0"
    >
      <Link to="/home" className="btn btn-ghost text-xl">
        Event Eagle
      </Link>
    </div>
  );
};

export default Header;
