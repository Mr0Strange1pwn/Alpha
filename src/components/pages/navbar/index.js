import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { faToggleOff } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [change, setChange] = useState(false);

  const { toggle } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [change]);

  const clickHandle = () => {
    toggle ? dispatch({ type: "OFF" }) : dispatch({ type: "ON" });
  };
  const btnStyle = {
    width: "20%",
  };

  if (change) {
    btnStyle.width = "5%";
  }

  const hideme = {
    display: "flex",
  };

  if (change) {
    hideme.display = "none";
  }

  return (
    <div className="sidebar" style={btnStyle}>
      {/* <img className="login__logo" src={logo} alt="logo" /> <button class="openbtn" onClick={this.clickHandle} >&#9776;</button> */}

      <nav class="nav flex-column">
        <div>
          <img className="login__logo" src="images/logo.png" alt="logo" />{" "}
          <button
            class="openbtn"
            style={hideme}
            onClick={() => {
              setChange(!change);
              clickHandle();
            }}
          >
            &#9776;
          </button>
        </div>
        <div style={{marginLeft:"10px"}}>
          <Link to="/dashboard">
            <img
              className="image__logo"
              src="images/Dashboard-h.png"
              alt="logo"
            />
            <a className="nav-link" style={hideme} href="/dashboard">
              DASHBOARD
            </a>
          </Link>
          <Link to="/Employee">
            <img
              className="image__logo"
              src="images/Employees-h.png"
              alt="logo"
            />{" "}
            <a className="nav-link" style={hideme} href="">
              EMPLOYEE
            </a>
          </Link>
          <Link to="/Rolespermission">
            <img className="image__logo" src="images/Role-H.png" alt="logo" />{" "}
            <a className="nav-link" style={hideme} href="">
              ROLES AND PERMISSION
            </a>
          </Link>
          <Link to="/projects">
            <img
              className="image__logo"
              src="images/Project-h.png"
              alt="logo"
            />{" "}
            <a className="nav-link" style={hideme} href="">
              PROJECTS
            </a>
          </Link>
          <Link to="/settings">
            <img className="image__logo" src="images/Set-h.png" alt="logo" />{" "}
            <a className="nav-link" style={hideme} href="">
              SETTINGS
            </a>
          </Link>
        </div>
      </nav>

      <button
        className="openbtn"
        value={clickHandle}
        onClick={() => {
          setChange(!change);
          clickHandle();
        }}
      >
     {">>"}
      </button>
    </div>
  );
}
export default Navbar;
