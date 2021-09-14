import React, { useState } from "react";
import "./signUp.css";
import { useHistory } from "react-router-dom";
import { Post } from "../../../Utils/JSONUtils";

function SignUp() {
  const [useremail, setUserEmail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [ispasswordValid, setisPasswordValid] = useState([]);

  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handlePasswordChange = (prop) => (event) => {
    passwordValidator(event.target.value);
    setValues({ ...values, [prop]: event.target.value });
  };

  const { push } = useHistory();

  const passwordValidator = (val) => {
    setisPasswordValid();

    // Validate small letters
    let smallLetter = [];
    console.log("pss", val);
    var lowerCaseLetters = /[a-z]/g;
    if (!val.match(lowerCaseLetters)) {
      smallLetter.push("Password must contain a lower case");
    }

    // Validate capital letters
    var capitalLetter = [];
    var upperCaseLetters = /[A-Z]/g;
    if (!val.match(upperCaseLetters)) {
      capitalLetter.push("Password must contain a capital letter");
    }

    // Validate numbers
    var number = [];
    var numbers = /[0-9]/g;
    if (!val.match(numbers)) {
      number.push("Password must contain a number");
    }

    // Validate length
    var Length = [];
    if (!val.length >= 8) {
      Length.push("Password must consist of 8 letters");
    }

    var myInput = [];
    var SC = /[!@#$%^&*]/g;
    if (!val.match(SC)) {
      myInput.push("Password must contain a spacial character !@#$%^&* ");
    }

    let Errors = [smallLetter, Length, capitalLetter, number, myInput];
    console.log("Errs", Errors);
    setisPasswordValid(Errors);
  };

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
        className="signup"
        style={{ backgroundImage: "url(/images/Login-bg.jpg)" }}
      >
        <div className="signup__container">
          <h5>RESET PASSWORD</h5>
          <form>
            <h6>New Password</h6>
            <input
              vlaue={userpassword}
              onChange={(event) => setUserpassword(event.target.value)}
              placeholder=""
              type="password"
            />

            <h6>Confirm Password</h6>
            <input
              // vlaue = {userpassword}
              // onChange ={ event => setUserpassword(event.target.value)}
              // placeholder="" type="password"
              className="input_field"
              style={{ width: "100%", border: "none" }}
              type={values.showPassword ? "text" : "password"}
              onChange={handlePasswordChange("password")}
              value={values.password}
              // onChange={(event) => setUserpassword(event.target.value)}
              placeholder="Password"
            />

            {ispasswordValid.length > 0
              ? ispasswordValid.reduce((...Errors) => (
                  <p style={{ color: "orange", fontWeight: "400" }}>
                    {Errors}{" "}
                  </p>
                ))
              : null}
          </form>

          <button
            onClick={loginuser}
            type="button"
            className="btn btn-primary btn-lg"
          >
            RESET PASSWORD
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
