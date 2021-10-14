import React from 'react'
import "./modal.css"
const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '60%',
    transform: 'translate(-50% ,-50%)',
    background: 'white',
    // padding: '50px',
    zIndex: 1000,
    width: "40%",
	
    borderRadius : "30px"
}
const OVERLAY_STYlES = {
    position:'fixed',
    top:0,
    left:0,
    right:0,
    bottom:0,
    background: 'rgba(0, 0, 0, .7)',
    zIndex:  1000

}

export default function Modal({open ,onClose,children}) {
    if (!open) return null
    return (
        <>
        <div  style={OVERLAY_STYlES} /> 
        <div className="modal-main" style={MODAL_STYLES}>
            {children}
        </div>
        </>
    )
}