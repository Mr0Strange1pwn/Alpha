import React, { useState } from "react";
import "./resetPassword.css";
import { useHistory, useParams } from "react-router-dom";
import { reset } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";

import { passwordValidator } from "../../../Utils/fieldValidator";

function ResetPassword() {
  const [values, setValues] = useState({
    password: "",
    newpassword: "",
    showPassword: false,
    newshowPassword: false,
  });
  const { token } = useParams();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(false);
  const [ispasswordValid, setisPasswordValid] = useState(true);
  const History = useHistory()
 
  console.log("token",token)
  const routeChange = () => {
    History.push("/")
  }
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
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
    const resData = {
      new_password: values.password,
      confirm_password: values.newpassword,
    };
    
    if (!values.password.length > 0) {
      setErrors(true);
    }

    if (values.password.length > 0 && ispasswordValid) {
      if (values.password.length > 0) {
        if (values.password === values.newpassword) {
          dispatch(reset(resData,token,routeChange));
        } else {
          setErrors(true);
        }
      }
    }
  };

  return (
    <div>
      <div
        className="resetPassword"
        style={{ backgroundImage: "url(/images/Login-bg.jpg)" }}
      >
        <div className="resetPassword__container">
          <img
            className="resetPassword__logo"
            src="/images/clocklogo.jpg"
            alt="logo"
          />
          {/* <h5>Login</h5> */}
          <h4>RESET PASSWORD</h4>
          <form style={{ marginTop: "10%" }}>
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
                type={values.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={values.password}
                // onChange={(event) => setUserpassword(event.target.value)}
                placeholder="New Password"
              />

              <button
                onClick={() => handleClickShowPassword()}
                type="button"
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <img
                  src={
                    values.showPassword === true
                      ? "/images/Eye.png"
                      : "/images/Eye-blue.png"
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
                type={values.newshowPassword ? "text" : "password"}
                onChange={newhandlePasswordChange("newpassword")}
                value={values.newpassword}
                // onChange={(event) => setUserpassword(event.target.value)}
                placeholder="Confirm Password"
              />

              <button
                onClick={() => newhandleClickShowPassword()}
                type="button"
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <img
                  src={
                    values.newshowPassword === true
                      ? "/images/Eye.png"
                      : "/images/Eye-blue.png"
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
            {!ispasswordValid ? (
              <p style={{ color: "red" }}>
                Password should contain at least 1 Uppercase,1 Special
                Character,1 Digit, and min 8 Characters.{" "}
              </p>
            ) : null}
            {errors ? (
              values.password !== values.newpassword ? (
                <p style={{ color: "red" }}>Incorrect password</p>
              ) : null
            ) : null}
          </form>

          <button
            onClick={() => handleLogin()}
            type="button"
            className="btn btn-lg"
            style={{
              backgroundColor: "#003366",
              color: "white",
              fontWeight: "600",
            }}
          >
            RESET PASSWORD
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
