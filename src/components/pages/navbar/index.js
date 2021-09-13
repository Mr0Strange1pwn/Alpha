



import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

        return (
            <div>
            <nav className="nav">
                <Link to="/signUp"><a className="nav-link" href="" >Link</a></Link>
                <Link to="/Post/mobile"><a className="nav-link" href="" >Linknew</a></Link>
                <a className="nav-link" href="" >Link</a>
            </nav>
            </div>
            
    )
    
}

export default Navbar

