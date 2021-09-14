import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from "../../../redux/actions/authAction"


export default function Home() {
    const { isLoggedIn, userInfo } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    return (
        <div>
            <h1>Home</h1>
            <p> user INFO {` email :  ${userInfo.userEmail} ,, pass : ${userInfo.password}`} </p>

            <button onClick={() => dispatch(logOut())} >LoGOUT</button>
        </div>
    )
}
