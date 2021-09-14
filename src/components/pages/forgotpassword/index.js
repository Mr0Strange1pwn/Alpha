import React, { useState } from "react";
import "./forgetpassword.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { Post } from "../../../Utils/JSONUtils";
import logo from "../../../images/logo.png";

function Forgetpassword() {
  const [useremail, setUserEmail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const { push } = useHistory();

  async function loginuser() {
    console.warn(useremail, userpassword);
    Post("http://localhost:3003/posts", {
      useremail,
      userpassword,
    })
      .then(() => {
        setUserEmail("");
        setUserpassword("");
        push("/signUp");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <div
        className="forget"
        style={{ backgroundImage: "url(/images/Login-bg.jpg)" }}
      >
        <div className="forget__container">
          <img className="login__logo" src={logo} alt="logo" />
          <h4>FORGET PASSWORD?</h4>
          <form>
            <div className="forget_text-box">
              <p>
                Enter the email address you used when you joined <br />
                and we'll send you instructions to reset your password{" "}
              </p>
            </div>
            <div
              style={{
                display: "flex",
                borderBottom: "2px solid",
                margin: "15pxx 0",
                paddingBottom: "5%",
              }}
            >
              <img src="images/Email-icon.png" style={{ marginRight: "2px" }} />
              <input
                style={{
                  width: "100%",
                  border: "none",
                  marginLeft:"5%"
                }}
                className="email_type"
                vlaue={useremail}
                onChange={(event) => setUserEmail(event.target.value)}
                placeholder="Email"
                type="email"
              />
            </div>
          </form>

          <button
            onClick={loginuser}
            type="button"
            class="btn btn-primary btn-lg"
            style={{ backgroundColor: "#3b1d8f", color: "white",marginTop:"10%" }}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Forgetpassword;
