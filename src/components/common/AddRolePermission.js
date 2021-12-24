import React, { useState } from "react";
import "./addRole.css";

const AddRolePermission = (props) => {
  return (
    <div class="row">
      <div className="col-sm-12 col-md-3 col-lg-3">
        <h6>{props.title}</h6>
      </div>
      <div class="col-sm-12 col-md-3 col-lg-3">
        <input
          type="radio"
          id={props.title}
          name={props.name}
          value="1"
          checked={props.value === "1"}
          onChange={props.onChange}
        />
        <label for="huey" className="radio_lable">
          View Only
        </label>
      </div>
      <div className="col-sm-12 col-md-3 col-lg-3">
        <input
          type="radio"
          id={props.title}
          name={props.name}
          value="2"
          checked={props.value === "2"}
          onChange={props.onChange}
        />
        <label for="huey" className="radio_lable">
          No Access
        </label>
      </div>
      <div className="col-sm-12 col-md-3 col-lg-3">
        <input
          type="radio"
          id={props.title}
          name={props.name}
          value="3"
          checked={props.value === "3"}
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
