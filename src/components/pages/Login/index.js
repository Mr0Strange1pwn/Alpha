import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { logIn } from "../../../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";

import {
  emailValidator,
  passwordValidator,
} from "../../../Utils/fieldValidator";

function Login() {
  const auth = useSelector((store) => store);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(false);
  const [isEmailvalid, setIsEmailvalid] = useState(true);
  const [ispasswordValid, setisPasswordValid] = useState(true);
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
    rember: true,
  });

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userInfo"));
    if (data !== null) {
      setValues({
        ...values,
        email: data.email,
        password: data.password,
        rember: data.rememberMe,
      });
    }
  }, []);
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handlePasswordChange = (prop) => (event) => {
    setisPasswordValid(passwordValidator(event.target.value));
    setValues({ ...values, [prop]: event.target.value });
  };

  if (auth.auth.errorMessage.length > 0) {
    setTimeout(() => dispatch({ type: "SET_ERROR_MSG", payload: "" }), 5000);
  }

  const handleLogin = () => {
    const userInfo = {
      email: values.email,
      password: values.password,
      rememberMe: values.rember,
    };
    if (!values.email.length > 0) {
      setErrors(true);
    }
    if (!values.password.length > 0) {
      setErrors(true);
    }

    if (
      values.email.length > 0 &&
      values.password.length > 0 &&
      isEmailvalid &&
      ispasswordValid
    ) {
      dispatch(logIn(userInfo));
    }
  };

  const onChangeData = ({ name, value }) => {
    setIsEmailvalid(emailValidator(value.target.value));
    setValues({ ...values, email: value.target.value });
  };
  return (
    <div>
      <div
        className="login"
        style={{ backgroundImage: "url(/images/Login-bg.jpg)" }}
      >
        <div className="login__container">
          <img className="login__logo" src="images/logo.png" alt="logo" />
          <h4>LOGIN</h4>
          <form style={{ marginTop: "10%" }}>
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid",
                margin: "15px 0",
                paddingBottom: "8px",
              }}
            >
              <img src="images/Email-icon.png" style={{ marginRight: "2px" }} />
              <input
                className="input_field"
                style={{
                  width: "100%",
                  border: "none",
                }}
                value={values.email}
                onChange={(value) => onChangeData({ name: "email", value })}
                placeholder="Email"
                type="email"
              />
            </div>
            {errors ? (
              !values.email ? (
                <p style={{ color: "red" }}>Email is required</p>
              ) : null
            ) : null}
            {!isEmailvalid ? (
              <p style={{ color: "red" }}>Please enter a valid email.</p>
            ) : null}
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid",
                margin: "15px 0",
                paddingBottom: "8px",
              }}
            >
              <img
                src="images/Password-icon.png"
                style={{ marginRight: "2px" }}
              />
              <input
                className="input_field"
                style={{
                  width: "100%",
                  border: "none",
                }}
                type={values.showPassword ? "text" : "password"}
                onChange={handlePasswordChange("password")}
                value={values.password}
                placeholder="Password"
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
                  style={{ marginRight: "2px", height: "19px", width: "33px" }}
                />
              </button>
            </div>
            {errors ? (
              !values.password ? (
                <p style={{ color: "red" }}>Password is required</p>
              ) : null
            ) : null}
            {auth.auth.errorMessage.length > 0 ? (
              <p style={{ color: "red" }}>{auth.auth.errorMessage}</p>
            ) : null}
            {!ispasswordValid ? (
              <p style={{ color: "red" }}>
                Password should contain at least 1 Uppercase,1 Special
                Character,1 Digit, and min 8 Characters.{" "}
              </p>
            ) : null}
            <div className="form-group form-check">
              <input
                checked={values.rember}
                className="form-check-input"
                type="checkbox"
                id="flexCheckChecked"
                value={values.rember}
                onChange={(value) =>
                  setValues({ ...values, rember: !values.rember })
                }
              />
              <label className="form-check-label" for="exampleCheck1">
                Remember me
              </label>

              <h7 className="login__forgettwo">
                <Link className="linUrl" to="/forgetpassword">
                  Forgot Password?
                </Link>
              </h7>
            </div>
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
            LOGIN
          </button>
          {/* 
          <div className="signup_link">
            
            <label class="form-check-label" for="exampleCheck1">
              Don't have an account?{"   "}
            </label>
            <Link className="linUrl" to="/resetPassword">
              Signup here
            </Link>{" "}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Login;
