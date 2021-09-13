import React from "react"
import { Route, Switch } from "react-router-dom";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/Signup/index";
import Navbar from "./components/pages/navbar";
import Error from './components/pages/error';
import Forgetpassword from "./components/pages/forgotpassword";
import { useSelector } from 'react-redux'

import Home from './components/pages/Home'



const Routes = () => {
    const { isLoggedIn } = useSelector(store => store.auth)
    return (
        <>
            {/* <Navbar /> */}
            {isLoggedIn ? <Switch>
                <Route exact path="/">
                    <Home />
                </Route>


            </Switch> :
                <Switch>
                    <Route exact path="/">
                        <Login />
                    </Route>
                    <Route exact path="/signUp">
                        <SignUp />
                    </Route>
                    <Route path="/forgetpassword">
                        <Forgetpassword />
                    </Route>
                    {/* <Route exact path ="/Post/:category" component={Post} />
    <Route component={Error}/ > */}

                </Switch>}
        </>
    )
}

export default Routes