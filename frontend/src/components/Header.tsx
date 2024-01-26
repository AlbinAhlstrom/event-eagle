import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div
      className="navbar bg-base-100 self-start shadow "
      style={{ height: "10vh" }}
    >
      <Link to="/home" className="btn btn-ghost text-xl z-50">
        Event Eagle
      </Link>
    </div>
  );
};

export default Header;
