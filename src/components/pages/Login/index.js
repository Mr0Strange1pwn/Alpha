import React, { useState, useEffect } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { logIn } from "../../../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";

import {
  emailValidator,
  passwordValidator,
} from "../../../Utils/fieldValidator";

function Login() {
  const { push } = useHistory();
  const auth = useSelector((store) => store);
  const dispatch = useDispatch();

  console.log("store", auth.auth);
  const [errors, setErrors] = useState(false);
  const [userEmail, setuserEmail] = useState("");
  const [isEmailvalid, setIsEmailvalid] = useState(true);
  const [ispasswordValid, setisPasswordValid] = useState(true);
  const [rember, setRember] = useState(true);
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
    rember: true
  });

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userInfo"))
    if (data !== null) {
      setValues({ ...values, email: data.email, password: data.password, rember: data.rememberMe })
    }
  }, [])
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handlePasswordChange = (prop) => (event) => {
    setisPasswordValid(passwordValidator(event.target.value));
    setValues({ ...values, [prop]: event.target.value });
  };

  if (auth.auth.errorMessage.length > 0) {
    setTimeout(() => dispatch({ type: "SET_ERROR_MSG", payload: "" }), 5000)
  }

  const handleLogin = () => {
    //  if( auth.auth. === "Login Failed" ) {
    //   setErrors(true)
    // }
    const userInfo = {
      // email: userEmail,
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
      // userEmail.length > 0 &&
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
    // setuserEmail(value.target.value);
    setValues({ ...values, email: value.target.value })
  };
  return (
    <div>
      <div
        className="login"
        style={{ backgroundImage: "url(/images/Login-bg.jpg)" }}
      >
        <div className="login__container">
          <img className="login__logo" src="images/logo.png" alt="logo" />
          {/* <h5>Login</h5> */}
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
                // onChange={(event) => setUserEmail(event.target.value)}
                // onChange={(value) => onChangeData({ name: "userEmail", value })}
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
                // onChange={(event) => setUserpassword(event.target.value)}
                placeholder="Password"
              />

              <button
                onClick={() => handleClickShowPassword()}
                type="button"
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <img
                  src={
                    values.showPassword == true
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
            {
              auth.auth.errorMessage.length > 0 ? (
                <p style={{ color: "red" }}>{auth.auth.errorMessage}</p>
              ) : null
            }
            {!ispasswordValid ? (
              <p style={{ color: "red" }}>
                Password should contain at least 1 Uppercase,1 Special
                Character,1 Digit, and min 8 Characters.{" "}
              </p>
            ) : null}
            <div class="form-group form-check">
              <input
                checked={values.rember}
                class="form-check-input" type="checkbox"
                id="flexCheckChecked"
                value={values.rember}
                onChange={(value) => setValues({ ...values, rember: !values.rember })}
              />
              <label class="form-check-label" for="exampleCheck1" >
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
            class="btn btn-lg"
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
