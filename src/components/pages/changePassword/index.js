import React, { useState, useEffect } from "react";
import "./changePassword.css";
import { useHistory } from "react-router-dom"
import { change } from "../../../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import {
  passwordValidator,
} from "../../../Utils/fieldValidator";

function ChangePassword() {
  const [values, setValues] = useState({
    password: "",
    newpassword: "",
    currentpassword: "",
    showPassword: false,
    newshowPassword: false,
    showCurrentPassword: false,
  });
  const History = useHistory()
  const auth = useSelector((store) => store);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(false);
  const [ispasswordValid, setisPasswordValid] = useState(true);
  const [logintoken, setToken] =useState("sumit29998@gmail.com")
  

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userData"))
    setToken(data.token)
  }, [])

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleClickShowCurrentPassword = () => {
    setValues({ ...values, showCurrentPassword: !values.showCurrentPassword });
  };
  const newhandleClickShowPassword = () => {
    setValues({ ...values, newshowPassword: !values.newshowPassword });
  };

  const handlePasswordChange = (prop) => (event) => {
    setisPasswordValid(passwordValidator(event.target.value));
    setValues({ ...values, [prop]: event.target.value });
  };

  const newhandlePasswordChange = (prop) => (event) => {
    setisPasswordValid(passwordValidator(event.target.value));
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleLogin = () => {
    const changeData = {
      currentpassword:values.currentpassword,
      new_password: values.newpassword,
      confirmpassword: values.password
    }
    if (!values.password.length > 0) {
      setErrors(true);
    }

    if (values.password.length > 0 && ispasswordValid) {
      dispatch(change(changeData,logintoken,History));
    }
  };

  return (
    <div>
      <div
        className="Change_Passowrd"
        style={{ backgroundImage: "url(/images/Login-bg.jpg)" }}
      >
        <div className="changePassword__container">
          <img className="logo" src="images/logo.png" alt="logo" />
          <h4>CHANGE PASSWORD</h4>
          <form style={{ marginTop: "8%" }}>
            <label className="form-check-label" for="exampleCheck1">
              Current Password
            </label>
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid",
                margin: "15px 0",
                paddingBottom: "8px",
              }}
            >
              <input
                className="input_field"
                style={{
                  width: "100%",
                  border: "none",
                }}
                type={values.showCurrentPassword ? "text" : "password"}
                onChange={handlePasswordChange("currentpassword")}
                value={values.currentpassword}
                placeholder="Current Password"
              />

              <button onClick={() => handleClickShowCurrentPassword()} type="button" style={{ border: "none", backgroundColor: "transparent" }}>
                <img
                  src={
                    values.showCurrentPassword === true
                      ? "images/Eye.png"
                      : "images/Eye-blue.png"
                  }
                  style={{ marginRight: "2px" }}
                  alt="logo"
                />
              </button>
            </div>
            {errors ? (
              !values.currentpassword ? (
                <p style={{ color: "red" }}>Password is required</p>
              ) : null
            ) : null}

            {/* New Passwor */}

            <label className="form-check-label" for="exampleCheck1">
              New Password
            </label>
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid",
                margin: "15px 0",
                paddingBottom: "8px",
              }}
            >
              <input
                className="input_field"
                style={{
                  width: "100%",
                  border: "none",
                }}
                type={values.newshowPassword ? "text" : "password"}
                onChange={newhandlePasswordChange("newpassword")}
                value={values.newpassword}
                // onChange={(event) => setUserpassword(event.target.value)}
                placeholder="New Password"
              />

              <button
                onClick={() => newhandleClickShowPassword()}
                type="button"
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <img
                  src={
                    values.newshowPassword === true
                      ? "images/Eye.png"
                      : "images/Eye-blue.png"
                  }
                  style={{ marginRight: "2px" }}
                />
              </button>
            </div>
            {errors ? (
              !values.newpassword ? (
                <p style={{ color: "red" }}>Password is required</p>
              ) : null
            ) : null}

            {/* {!ispasswordValid ? <p style={{ color: "red" }}>password must contain atlest 1 chapital letter and spacial characters </p> : null} */}

            {/* New Password */}
            <label className="form-check-label" for="exampleCheck1">
              Confirm Password
            </label>
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid",
                margin: "15px 0",
                paddingBottom: "8px",
              }}
            >
              <input
                className="input_field"
                style={{
                  width: "100%",
                  border: "none",
                }}
                type={values.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={values.password}
                // onChange={(event) => setUserpassword(event.target.value)}
                placeholder="Confirm Password"
              />

              <button
                onClick={() => handleClickShowPassword()}
                type="button"
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <img
                  src={
                    values.showPassword === true
                      ? "images/Eye.png"
                      : "images/Eye-blue.png"
                  }
                  style={{ marginRight: "2px" }}
                />
              </button>
            </div>
            {errors ? (
              !values.password ? (
                <p style={{ color: "red" }}>Password is required</p>
              ) : null
            ) : null}
            {!ispasswordValid ? (
              <p style={{ color: "red" }}>
                Password should contain at least 1 Uppercase,1 Special
                Character,1 Digit, and min 8 Characters.{" "}
              </p>
            ) : null}
          </form>

          <div className="update-password-btn">
<button
            onClick={handleLogin}
            type="button"
            className="btn btn-lg"
            style={{
              backgroundColor: "#003366",
              color: "white",
              fontWeight: "600",
            }}
          >
            UPDATE PASSWORD
          </button>
</div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
