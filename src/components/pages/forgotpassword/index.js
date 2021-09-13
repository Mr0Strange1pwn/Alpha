import React, { useState } from 'react';
import './forgetpassword.css';
import { FaRegCheckCircle } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
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
            <div className="forget">
                <div className="forget__container">
                    <img className="login__logo" src={logo} alt="logo" />
                    <h5>FORGET PASSWORD?</h5>
                    <form>

                        <div className="forget_text-box">
                            <p>Enter the email address you used when you joined <br />and we'll send you instructions to reset your password </p>
                        </div>
                        <input className="email_type" vlaue={useremail} onChange={event => setUserEmail(event.target.value)} placeholder="Email" type="email" />
                    </form>

                    <button onClick={loginuser} type="button" class="btn btn-primary btn-lg">SUBMIT</button>
                </div>

            </div>
        </div>
    )
}

export default Forgetpassword;

