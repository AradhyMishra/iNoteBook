import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  let navigate = useNavigate();
  useEffect(() => {
    /* console.log(location.pathname); */
  }, [location.pathname]);


  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate("/login")
  }
  return (
    <div style={{ marginBottom: "56px" }}>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand mx-2" to="/">
          iNoteBook
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          {!localStorage.getItem("token") ? (
            <div className="ms-auto">
              <Link to="/login" className="btn btn-outline-success mx-2">
                Login
              </Link>
              <Link to="/signup" className="btn btn-outline-warning mx-2">
                Signup
              </Link>
            </div>
          ) : (
            <button type="button" onClick = {handleLogout} className="btn btn-secondary mx-3">
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
