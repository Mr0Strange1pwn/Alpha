import React, { useState } from 'react';
import './signUp.css';
import { FaRegCheckCircle } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { Post } from "../../../Utils/JSONUtils";
import logo from "../../../images/logo.png";




function SignUp() {


    const [useremail, setUserEmail] = useState("");
    const [userpassword, setUserpassword] = useState("");
    const { push } = useHistory();

    async function loginuser() {

        console.warn(useremail, userpassword);
        Post("http://localhost:3003/posts", {
            useremail,
            userpassword
        }).then(() => {
            setUserEmail("");
            setUserpassword("");
            push("/signUp");
        }).catch((err) => {
            console.log(err)
        })

    }

    return (
        <div>
            <div className="signup">
                <div className="signup__container">
                    <img className="signup__logo" src={logo} alt="logo" />
                    <h5>RESET PASSWORD</h5>
                    <form>
                        <h6>New Password</h6>
                        <input vlaue={useremail} onChange={event => setUserEmail(event.target.value)} placeholder="" type="email" />
                        <h6>Confirm Password</h6>
                        <input type="password" vlaue={userpassword} onChange={event => setUserpassword(event.target.value)} placeholder="" />

                        <p>Password must consists of 8 letters including 1 Upper case Alphabet and 1 Symbol</p>


                    </form>

                    <button onClick={loginuser} type="button" class="btn btn-primary btn-lg">RESET PASSWORD</button>

                </div>

            </div>
        </div>
    )
}

export default SignUp;

