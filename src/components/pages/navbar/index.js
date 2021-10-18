import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}


function Navbar() {
  const [change, setChange] = useState(false);
  const { toggle } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {}, [change]);

  const clickHandle = () => {
    toggle ? dispatch({ type: "OFF" }) : dispatch({ type: "ON" });
  };
  const btnStyle = {
    width: "20%",
  };
  const hideme = {
    display: "flex",
  };
  const hidemedown = {
    display: "flex",
  };
  if((windowDimensions.width>=768)  && (windowDimensions.width<=1023)){
    btnStyle.width = "9%";
    hidemedown.display = "none";
  }else if(windowDimensions.width<700){
    btnStyle.width = "15%";
  }
  if (change) {
    btnStyle.width = "5%";
  }

  
  if (change) {
    hideme.display = "none";
  }
  const location = useLocation();
  const pathname = location.pathname;
console.log("windowDimensions",windowDimensions)
  return (
    <div className="sidebar" style={btnStyle}>
      <nav class="nav flex-column">
        <div class="logo-main">
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
        <div class="nav-main-div" style={{ marginLeft: "15px",marginTop:"10%" }} >
          <Link to="/" className="navBar-link">
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
                  ? "images/Employees-h.png" : pathname == "/AddPeople" ? "images/Employees-h.png"
                  : "images/Employee.png"
              }
              alt="logo"
            />{" "}
            <a
              className="nav-link"
              style={{ color: pathname == "/Employee" ? "#f07238" : pathname == "/AddPeople" ?  "#f07238":"white" }}
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
                  ? "images/Role-H.png" :pathname == "/AddRole"? "images/Role-H.png"
                  : "images/Role.png"
              }
              alt="logo"
            />{" "}
            <a
              className="nav-link"
              style={{
                color: pathname == "/Rolespermission" ? "#f07238" : pathname == "/AddRole"? "#f07238" : "white",
              }}
              href=""
            >
              Roles and Permission
            </a>
          </Link>
          <Link to="/Project" className="navBar-link">
            <img
              className="image__logo"
              src={
                pathname == "/Project"
                  ?  "images/Project-h.png" : pathname == "/Task" ? "images/Project-h.png"
                  : "images/Projects.png"
              }
              alt="logo"
            />{" "}
            <a
              className="nav-link"
              style={{ color: pathname == "/Project" ? "#f07238" : pathname == "/Task" ? "#f07238" :"white" }}
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
        style={hidemedown}
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
