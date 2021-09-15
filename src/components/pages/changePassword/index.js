import React, { useState } from "react";
import "./changePassword.css";
import { useHistory } from "react-router-dom";
import { Post } from "../../../Utils/JSONUtils";
import logo from "../../../images/logo.png";
import passIcon from "../../../images/Eye-blue.png";
import showpassIcon from "../../../images/Eye.png";
import { logIn } from "../../../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import {
  emailValidator,
  passwordValidator,
} from "../../../Utils/fieldValidator";

function ChangePassword() {
  const [values, setValues] = useState({
    password: "",
    newpassword: "",
    oldpassword: "",
    showPassword: false,
    newshowPassword: false,
  });
  const { push } = useHistory();
  const auth = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log("store", auth);
  const [errors, setErrors] = useState(false);
  const [userEmail, setuserEmail] = useState("");
  const [isEmailvalid, setIsEmailvalid] = useState(true);
  const [ispasswordValid, setisPasswordValid] = useState(true);

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
    if (!values.password.length > 0) {
      setErrors(true);
    }

    if (values.password.length > 0 && ispasswordValid) {
      dispatch(logIn({ password: values.password }));
    }
  };

  return (
    <div>
      <div
        className="Change_Passowrd"
        style={{ backgroundImage: "url(/images/Login-bg.jpg)" }}
      >
        <div className="changePassword__container">
          <img className="logo" src={logo} alt="logo" />
          <h4>CHANGE PASSWORD</h4>
          <form>
            <label class="form-check-label" for="exampleCheck1">
              Old Password
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
                type={"password"}
                onChange={handlePasswordChange("oldpassword")}
                value={values.oldpassword}
                // onChange={(event) => setUserpassword(event.target.value)}
                placeholder="Password"
              />

              {/* <button onClick={() => handleClickShowPassword()} type="button" style={{ border: "none", backgroundColor: "transparent" }}>
                <img
                  src={
                    values.showPassword == true
                      ? "images/Eye.png"
                      : "images/Eye-blue.png"
                  }
                  style={{ marginRight: "2px" }}
                />
              </button> */}
            </div>
            {errors ? (
              !values.oldpassword ? (
                <p style={{ color: "red" }}>password field is required</p>
              ) : null
            ) : null}

            {/* New Passwor */}

            <label class="form-check-label" for="exampleCheck1">
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
                placeholder="Password"
              />

              <button
                onClick={() => newhandleClickShowPassword()}
                type="button"
                style={{ border: "none", backgroundColor: "transparent" }}
              >
                <img
                  src={
                    values.newshowPassword == true
                      ? "images/Eye.png"
                      : "images/Eye-blue.png"
                  }
                  style={{ marginRight: "2px" }}
                />
              </button>
            </div>
            {errors ? (
              !values.newpassword ? (
                <p style={{ color: "red" }}>password field is required</p>
              ) : null
            ) : null}

            {/* {!ispasswordValid ? <p style={{ color: "red" }}>password must contain atlest 1 chapital letter and spacial characters </p> : null} */}

            {/* New Password */}
            <label class="form-check-label" for="exampleCheck1">
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
                  style={{ marginRight: "2px" }}
                />
              </button>
            </div>
            {errors ? (
              !values.password ? (
                <p style={{ color: "red" }}>password field is required</p>
              ) : null
            ) : null}
            {!ispasswordValid ? (
              <p style={{ color: "red" }}>
                password must contain atlest 1 chapital letter and spacial
                characters{" "}
              </p>
            ) : null}
          </form>

          <button
            onClick={() => handleLogin()}
            type="button"
            class="btn btn-lg"
            style={{ backgroundColor: "#3b1d8f", color: "white" }}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
