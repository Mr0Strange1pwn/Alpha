import React, { useState } from "react";
import "./addRole.css";

const AddRolePermission = (props) => {
 
  return (
    <div class="row">
      <div className="col-3">
        <h6>{props.title}</h6>
      </div>
      <div class="col-3">
        <input
          type="radio"
          id={props.title}
          name={props.title}
          value="1"
          onChange={props.onChange}
        />
        <label for="huey" className="radio_lable">
          View Only
        </label>
      </div>
      <div className="col-3">
        <input
          type="radio"
          id={props.title}
          name={props.title}
          value="2"
          onChange={props.onChange}
        />
        <label for="huey" className="radio_lable">
          No Access
        </label>
      </div>
      <div className="col-3">
        <input
          type="radio"
          id={props.title}
          name={props.title}
          value="3"
          onChange={props.onChange}
        />
        <label for="huey" className="radio_lable">
          All Access
        </label>
      </div>
    </div>
  );
};
export default AddRolePermission;
