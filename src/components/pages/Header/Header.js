import React from 'react'

const Header = (props) => {
    return (
        <div style={{backgroundColor:"#f1f1f1",paddingLeft:"5%", paddingTop:"6px", height:"40px"}}>
           <h5>{props.headerName}</h5> 
        </div>
    )
}
export default  Header;