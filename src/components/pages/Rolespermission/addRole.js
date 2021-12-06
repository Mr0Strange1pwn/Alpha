import React, { useState } from "react";
import "./addRole.css";
import { useHistory } from "react-router-dom"
import AddRolePermission from "../../common/AddRolePermission";
import Header from "../Header/Header";
import { AddRoleAPI } from "../../../redux/actions/roleAction";
import { useSelector, useDispatch } from "react-redux";

function AddRole() {
  const role = useSelector((store) => store.role.userInfo);
  const [selectedValue, setValue] = useState({
    assignTask: "",
    createEmployee: "",
    createProject: "",
    createProjectBoard: "",
    createRole: "",
    createTask: "",
    manageEmployee: "",
    manageRole: "",
    reports: "",
    roleName: ""
  });
  const History = useHistory()
  const dispatch = useDispatch();
  
  console.log("role",role)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...selectedValue, [name]: value });
  };
  const handleSubmit = () => {
     dispatch(AddRoleAPI(selectedValue,History));
  };
  return (
    <div className="conatiner">
      <Header headerName="Add Role" />
      <div className="form">
        <div className="mb-8">
          <label for="exampleFormControlInput1" className="form-label">
            Role Name
          </label>
          <input
            type="text"
            className="form-control role"
            id="roleName"
            name="roleName"
            // onChange={(event) => setRoleName(event.target.value)}
            onChange={handleChange}
            placeholder="Enter role name"
          />
        </div>
        <div className="mb-12">
          <label for="exampleFormControlInput1" className="form-label">
            Set Permissions
          </label>
          <div className="add-management">
            <div className="card-body">
              <h5 className="card-title">User Management</h5>
              <AddRolePermission
                name="createRole"
                title="Create Role"
                onChange={handleChange}
              />
              <AddRolePermission
                name="manageRole"
                title="Manage Role"
                onChange={handleChange}
              />
              <AddRolePermission
                name="createEmployee"
                title="Create Employee"
                onChange={handleChange}
              />
              <AddRolePermission
                name="manageEmployee"
                title="Manage Employee"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-12">
          <label for="exampleFormControlInput1" className="form-label"></label>
          <div className="add-management">
            <div className="card-body">
              <h5 className="card-title">Task Management</h5>

              <AddRolePermission
                name="createProject"
                title="Create Project"
                onChange={handleChange}
              />
              <AddRolePermission
                name="createTask"
                title="Create Task"
                onChange={handleChange}
              />
              <AddRolePermission
                name="assignTask"
                title="Assign Task"
                onChange={handleChange}
              />
              <AddRolePermission
                name="createProjectBoard"
                title="Create Project Board"
                onChange={handleChange}
              />
              <AddRolePermission
                name="reports"
                title="Reports"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="addrole_Button">
          <button
            className="btn  float-left save-btn"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
          <button className="btn  float-left" type="submit">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRole;
