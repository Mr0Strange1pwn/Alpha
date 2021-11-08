import React, { useState } from "react";
import "./addRole.css";
import AddRolePermission from "../../common/AddRolePermission";
import Header from "../Header/Header";
import { AddRoleAPI } from "../../../redux/actions/roleAction";
import { useSelector, useDispatch } from "react-redux";

function AddRole() {
  const [roleName, setRoleName] = useState();
  const [selectedValue, setValue] = useState({
  roleName: "",
  createRole: "",
  manageRole: "",
  createEmployee: "",
  manageEmployee: "",
  createProject: "",
  createTask: "",
  assignTask: "",
  createProjectBoard: "",
  reports: ""
  });
  const dispatch = useDispatch();
  const auth = useSelector((store) => store);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...selectedValue, [name]: value });
  };
  const handleSubmit = () => {
    console.log("roleName", selectedValue);
    dispatch(AddRoleAPI(selectedValue));

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
            class="form-control role"
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
              <AddRolePermission name="createRole" title="Create Role" onChange={handleChange} />
              <AddRolePermission name="manageRole" title="Manage Role" onChange={handleChange} />
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
              <AddRolePermission name="createTask" title="Create Task" onChange={handleChange} />
              <AddRolePermission name="assignTask" title="Assign Task" onChange={handleChange} />
              <AddRolePermission  name="createProjectBoard" title="Create Project Board" />
              <AddRolePermission  name="reports" title="Reports" onChange={handleChange} />
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
          <button
            className="btn  float-left"
            type="submit"
          >
            Cancel
          </button>
        </div>
       
      </div>
    </div>
  );
}

export default AddRole;
