import React from "react";
import "./AlertModel.css";

function AlertModel({ setOpenModal,id,handleDelete }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Are you sure you want to delete this Employee?</h1>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
           No
          </button>
          <button  onClick={() => {
            handleDelete(id)
            }}>Yes </button>
        </div>
      </div>
    </div>
  );
}

export default AlertModel;