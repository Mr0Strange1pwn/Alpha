import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="sidebar" style={btnStyle}>
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
        <div style={{ marginLeft: "15px",marginTop:"10%" }} >
          <Link to="/">
            <img
              className="image__logo"
              src={
                pathname == "/"
                  ? "images/Dashboard-h.png"
                  : "images/Dashboard.png"
              }
              alt="logo"
            />
            <a
              className="nav-link"
              style={{ color: pathname == "/" ? "#f07238" : "white" }}
              href="/dashboard"
            >
              Dashboard
            </a>
          </Link>
          <Link to="/Employee" className="navBar-link">
            <img
              className="image__logo"
              src={
                pathname == "/Employee"
                  ? "images/Employees-h.png"
                  : "images/Employee.png"
              }
              alt="logo"
            />{" "}
            <a
              className="nav-link"
              style={{ color: pathname == "/Employee" ? "#f07238" : "white" }}
              href=""
            >
              Employees
            </a>
          </Link>
          <Link to="/Rolespermission" className="navBar-link">
            <img
              className="image__logo"
              src={
                pathname == "/Rolespermission"
                  ? "images/Role-H.png"
                  : "images/Role.png"
              }
              alt="logo"
            />{" "}
            <a
              className="nav-link"
              style={{
                color: pathname == "/Rolespermission" ? "#f07238" : "white",
              }}
              href=""
            >
              Roles and Permission
            </a>
          </Link>
          <Link to="/projects" className="navBar-link">
            <img
              className="image__logo"
              src={
                pathname == "/projects"
                  ? "images/Project-h.png"
                  : "images/Projects.png"
              }
              alt="logo"
            />{" "}
            <a
              className="nav-link"
              style={{ color: pathname == "/projects" ? "#f07238" : "white" }}
              href=""
            >
              Projects
            </a>
          </Link>
          <Link to="/settings" className="navBar-link">
            <img
              className="image__logo"
              src={
                pathname == "/settings"
                  ? "images/Set-h.png"
                  : "images/Setting.png"
              }
              alt="logo"
            />{" "}
            <a
              className="nav-link"
              style={{ color: pathname == "/settings" ? "#f07238" : "white" }}
              href=""
            >
              Settings
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
