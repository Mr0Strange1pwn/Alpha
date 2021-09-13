import React, { useState } from "react";
import "./Login.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { Post } from "../../../Utils/JSONUtils";
import logo from "../../../images/logo.png";
import { logIn } from "../../../redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";

function Login() {
  const [useremail, setUserEmail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const { push } = useHistory();
  const auth = useSelector((store) => store);
  const dispatch = useDispatch();
  console.log("store", auth);

  return (
    <div>
      <div
        className="login"
        style={{ backgroundImage: "url(/images/Login-bg.jpg)" }}
      >
        <div className="login__container">
          <img className="login__logo" src={logo} alt="logo" />
          <h5>Login</h5>
          <form>
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid",
                margin: "8px 0",
                paddingBottom: "2px",
              }}
            >
              <img src="images/Email-icon.png" style={{ marginRight: "2px" }} />
              <input
                className="email_type"
                style={{
                  width: "100%",
                  border: "none",
                }}
                vlaue={useremail}
                onChange={(event) => setUserEmail(event.target.value)}
                placeholder="Email"
                type="email"
              />
            </div>
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid",
                margin: "8px 0",
                paddingBottom: "2px",
              }}
            >
              <img
                src="images/Password-icon.png"
                style={{ marginRight: "2px" }}
              />
              <input
                className="Password_type"
                style={{
                  width: "100%",
                  border: "none",
                }}
                type="password"
                vlaue={userpassword}
                onChange={(event) => setUserpassword(event.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="text-box">
              <h7 className="login__forgetone">
                <Link to="/signUp">
                  <FaRegCheckCircle /> Remember me
                </Link>
              </h7>
              <h7 className="login__forgettwo">
                <Link to="/signUp">Forget Password?</Link>
              </h7>
            </div>
          </form>

          <button
            onClick={() => dispatch(logIn({ useremail, userpassword }))}
            type="button"
            class="btn btn-primary btn-lg"
          >
            LOGIN
          </button>

          <div>
            <p>
              Don't have an account?{" "}
              <b>
                <Link to="/signUp">Signup here</Link>
              </b>
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
