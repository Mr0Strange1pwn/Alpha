import React from 'react'

const Adduser = (props) => {
  return (

    <div class="row">
      <div class="col-3"><h6>{props.title}</h6></div>
      <div class="col-3">
        <input
          type="radio"
          id={props.title}
          name={props.title}
          value="1"
          checked
        />
        <label for="huey">View Only</label>
      </div>
      <div class="col-3">
        {" "}
        <input
          type="radio"
          id={props.title}
          name={props.title}
          value="2"
          checked
        />
        <label for="huey">No Access</label>
      </div>
      <div class="col-3">
        {" "}
        <input
          type="radio"
          id={props.title}
          name={props.title}
          value="3"
          checked
        />
        <label for="huey">All Access</label>
      </div>
    </div>

  )
}
export default Adduser;