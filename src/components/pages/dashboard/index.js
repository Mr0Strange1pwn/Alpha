import React , { useState, useEffect} from 'react'
import ScreenShots from './ScreenShorts'
import Home from './Home'
import './dashboard.css'
import { useDispatch } from 'react-redux'
import { getSS } from '../../../redux/actions/screenshortsAction'
import { getProjects } from "../../../redux/actions/projectActions";


import { FaHome } from 'react-icons/fa'
import { GoScreenFull } from 'react-icons/go'
import Header from "../Header/Header";

export default function Dashboard() {
  const dispatch = useDispatch()
  const [page , setPage] = useState("home")

  useEffect(() => {
    dispatch(getSS())
    dispatch(getProjects())
  },[])

  return (
      <div>
        <Header headerName="Dashboard" />
            <div className='header-actions'>
              <div className={`header-tab ${page === "home" && "header-tab-active" }`} onClick={()=> setPage("home")}>
                <FaHome className="header-tab-icon" />
              <h5 className="header-tab-text" >Home</h5> 
              </div>
              <div className={`header-tab ${page !== "home" && "header-tab-active" }`} onClick={()=> setPage("screenshots")}>
                <GoScreenFull className="header-tab-icon" />
              <h5 className="header-tab-text" >Screen Shorts</h5>
              </div>   
            </div>
            <div className="deshboard-component">
                {page === "home" ? <Home /> : <ScreenShots />}
            </div>
        </div>
  )
}
