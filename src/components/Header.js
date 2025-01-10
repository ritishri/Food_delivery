import { NavLink, useNavigate } from "react-router-dom";
import logo from "../images/logo.jpg";

function Navbar() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("role"); // Get the role from localStorage

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom mb-3">
      <div className="container">
        {/* Logo */}
        <a className="navbar-brand" href="#" onClick={() => navigate("/")}>
          <img src={logo} alt="Food Delivery Logo" style={{ width: "120px" }} />
        </a>

        {/* Mobile menu toggle button */}
        {userRole === "user" && (
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        )}

        {/* Navbar links */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav d-flex justify-content-center">
            {/* Only show these links if the user is logged in as a user */}
            {userRole === "user" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/menu">
                    MENU
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/cart">
                    CART
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/orders">
                    ORDERS
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logout Button */}
        <button className="btn btn-danger ms-auto" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
