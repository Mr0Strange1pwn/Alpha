import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./navbar.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { logOut } from "../../../redux/actions/authAction";
import Alert from "../../common/Alert";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function Navbar() {
  const [change, setChange] = useState(false);
  const { toggle } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const [modalOpen, setModalOpen] = useState(false);
  const History = useHistory();

  const delAlert = () => {
    setModalOpen(true);
  };
  const handleDelete = async () => {
    dispatch(logOut());
    setModalOpen(false);
    History.push("/");
  };
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
  if (windowDimensions.width >= 768 && windowDimensions.width <= 1023) {
    btnStyle.width = "7%";
    hidemedown.display = "none";
  } else if (windowDimensions.width < 700) {
    btnStyle.width = "13%";
  }
  if (change) {
    btnStyle.width = "5%";
  }

  if (change) {
    hideme.display = "none";
  }
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="sidebar" style={btnStyle}>
      <Alert
        message="Logout"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setOpenModal={setModalOpen}
        handleDelete={handleDelete}
      />
      <nav class="nav flex-column">
        <div class="logo-main">
          <img className="login__logo" src="images/clocklogo.jpg" alt="logo" />{" "}
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
        <div class="nav-main-div" style={{ marginTop: "10%" }}>
          <Link to="/" className="navBar-link">
            <img
              className="image__logo"
              src={
                pathname === "/"
                  ? "images/Dashboard-h.png"
                  : "images/Dashboard.png"
              }
              alt="logo"
            />
            <a
              className="nav-link"
              style={{ color: pathname === "/" ? "#f07238" : "white" }}
              href="/dashboard"
            >
              Dashboard
            </a>
          </Link>
          <Link to="/Employee" className="navBar-link">
            <img
              className="image__logo"
              src={
                pathname === "/Employee"
                  ? "images/Employees-h.png"
                  : pathname === "/AddPeople"
                  ? "images/Employees-h.png"
                  : "images/Employee.png"
              }
              alt="logo"
            />{" "}
            <a
              className="nav-link"
              style={{
                color:
                  pathname === "/Employee"
                    ? "#f07238"
                    : pathname === "/AddPeople"
                    ? "#f07238"
                    : "white",
              }}
              href=""
            >
              Employees
            </a>
          </Link>
          <Link to="/Rolespermission" className="navBar-link">
            <img
              className="image__logo"
              src={
                pathname === "/Rolespermission"
                  ? "images/Role-H.png"
                  : pathname === "/AddRole"
                  ? "images/Role-H.png"
                  : "images/Role.png"
              }
              alt="logo"
            />{" "}
            <a
              className="nav-link"
              style={{
                color:
                  pathname === "/Rolespermission"
                    ? "#f07238"
                    : pathname === "/AddRole"
                    ? "#f07238"
                    : "white",
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
                pathname === "/Project"
                  ? "images/Project-h.png"
                  : pathname === "/Task"
                  ? "images/Project-h.png"
                  : "images/Projects.png"
              }
              alt="logo"
            />{" "}
            <a
              className="nav-link"
              style={{
                color:
                  pathname === "/Project"
                    ? "#f07238"
                    : pathname === "/Task"
                    ? "#f07238"
                    : "white",
              }}
              href=""
            >
              Projects
            </a>
          </Link>
          <Link to="/settings" className="navBar-link">
            <img
              className="image__logo"
              src={
                pathname === "/settings"
                  ? "images/Set-h.png"
                  : "images/Setting.png"
              }
              alt="logo"
            />{" "}
            <a
              className="nav-link"
              style={{ color: pathname === "/settings" ? "#f07238" : "white" }}
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
      <div>
        <div class="logout-btn" style={{ display: "flex" }}>
          <img
            className="image__logo"
            src={"images/logout-icon.png"}
            alt="logo"
            onClick={() => delAlert()}
          />

          <a
            className="nav-link"
            style={{ color: "#fff" }}
            onClick={() => delAlert()}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
