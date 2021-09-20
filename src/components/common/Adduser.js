import React from 'react'

const Adduser =(props) => {
    return (
        <div>
                  <div class="mb-12">
        <label for="exampleFormControlInput1" class="form-label"></label>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Task Management</h5>
            <div class="row">
              <div class="col-3"><h6>{props.title}</h6></div>
              <div class="col-3">
                <input
                 type="radio"
                  id={props.id}
                  name={props.name}
                  value="1"
                  checked
                />
                <label for="huey">View Only</label>
              </div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey4"
                  name="drone4"
                  value="2"
                  checked
                />
                <label for="huey">No Access</label>
              </div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey4"
                  name="drone4"
                  value="3"
                  checked
                />
                <label for="huey">All Access</label>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}
export default  Adduser;