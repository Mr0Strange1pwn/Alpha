import React from "react";
import "./dashboard.css";
import Adduser from '../../common/Adduser'

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
            <Adduser title="Create Project" />
            <Adduser title="Create Task" />
            <Adduser title="Assign Task" />
          </div>
        </div>
      </div>

      <div class="mb-12">
        <label for="exampleFormControlInput1" class="form-label"></label>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Task Management</h5>

            <Adduser title="Create Project" />
            <Adduser title="Create Task" />
            <Adduser title="Assign Task" />
            <Adduser title="Create Project Board" />
            <Adduser title="Reports" />


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
