import React from 'react'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '60%',
    transform: 'translate(-50% ,-50%)',
    background: 'white',
    zIndex: 1000,
    width: "40%",
	height: "40%",
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

const clbtnStyle = {
  backgroundColor: "transparent",
  border: "none",
  cursor:" pointer",
  padding: "10px"
}
const footerbtnStyle = {
  width: "150px",
  height: "45px",
  margin: "10px",
  border: "none",
  color:" white",
  borderRadius:" 8px",
  fontSize: "20px",
  cursor: "pointer"
}

export default function Alert({open ,onClose,children, setOpenModal,id,handleDelete,message}) {
     if (!open) return null
    return (
        <>
        <div style={OVERLAY_STYlES} /> 
        <div style={MODAL_STYLES}>
        <div style={{ display:" flex", justifyContent:" flex-end"}}>
   
          <button
          style={clbtnStyle}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <img
                height="25px"
                width="25px"
                src="images/close.png"
                alt="Project-info-icon"
              />
          </button>
        </div>
        <div style={{marginTop:"8%"}}>
          <h3 style={{textAlign: "center",fontSize:"1.80rem"}}>Are you sure you want to delete the {message}?</h3>
        </div>
        <div style={{textAlignLast: "center"}}>
          <button
            style={{...footerbtnStyle,backgroundColor:"#f07238"}}
            onClick={() => {
              setOpenModal(false);
            }}
           
          >
           No
          </button>
          <button  style={{...footerbtnStyle,backgroundColor:"#25344b"}} onClick={() => {
            handleDelete(id)
            }}>Yes </button>
        </div>
            {children}
        </div>
        </>
    )
}