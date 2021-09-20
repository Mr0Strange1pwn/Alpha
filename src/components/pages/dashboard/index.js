import React from "react";
import "./dashboard.css";
function Dashboard() {
  return (
    <div className="conatiner">
      <div class="mb-12">
        <label for="exampleFormControlInput1" class="form-label">
          Role Name
        </label>
        <input
          type="email"
          class="form-control role"
          id="exampleFormControlInput1"
        />
      </div>
      <div class="mb-12">
        <label for="exampleFormControlInput1" class="form-label">
          Set Permissions
        </label>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">User Management</h5>
          
          </div>
        </div>
      </div>

      <div class="mb-12">
        <label for="exampleFormControlInput1" class="form-label"></label>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Task Management</h5>
            <div class="row">
              <div class="col-3"><h6>Create Project</h6></div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey4"
                  name="drone4"
                  value="huey4"
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
                  value="huey4"
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
                  value="huey4"
                  checked
                />
                <label for="huey">All Access</label>
              </div>
            </div>

            <div class="row">
              <div class="col-3"><h6>Create Task</h6></div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey5"
                  name="drone5"
                  value="huey5"
                  checked
                />
                <label for="huey">View Only</label>
              </div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey5"
                  name="drone5"
                  value="huey5"
                  checked
                />
                <label for="huey">No Access</label>
              </div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey5"
                  name="drone5"
                  value="huey5"
                  checked
                />
                <label for="huey">All Access</label>
              </div>
            </div>

            <div class="row">
              <div class="col-3"><h6>Assign Task</h6></div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey6"
                  name="drone6"
                  value="huey6"
                  checked
                />
                <label for="huey">View Only</label>
              </div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey6"
                  name="drone6"
                  value="huey6"
                  checked
                />
                <label for="huey">No Access</label>
              </div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey6"
                  name="drone6"
                  value="huey6"
                  checked
                />
                <label for="huey">All Access</label>
              </div>
            </div>

            <div class="row">
              <div class="col-3"><h6>Create Project Board</h6></div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey7"
                  name="drone7"
                  value="huey7"
                  checked
                />
                <label for="huey">View Only</label>
              </div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey7"
                  name="drone7"
                  value="huey7"
                  checked
                />
                <label for="huey">No Access</label>
              </div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey7"
                  name="drone7"
                  value="huey7"
                  checked
                />
                <label for="huey">All Acsess</label>
              </div>
            </div>
            <div class="row">
              <div class="col-3"><h6>Reports</h6></div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey8"
                  name="drone8"
                  value="huey8"
                  checked
                />
                <label for="huey">View Only</label>
              </div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey8"
                  name="drone8"
                  value="huey8"
                  checked
                />
                <label for="huey">No Access</label>
              </div>
              <div class="col-3">
                {" "}
                <input
                  type="radio"
                  id="huey8"
                  name="drone8"
                  value="huey8"
                  checked
                />
                <label for="huey">All Access</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-grid gap-2 d-md-block" style={{ marginTop: "5%" }}>
        <button class="btn btn-secondary " type="button">
          Button
        </button>
        <button
          class="btn btn-secondary"
          type="button"
          style={{ marginLeft: "5px" }}
        >
          Button
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
