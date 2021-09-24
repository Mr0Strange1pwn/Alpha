import React, { useState } from "react";
import "./addRole.css";
import AddRolePermission from "../../common/AddRolePermission";
import Header from "../Header/Header";
function AddRole() {
  const [roleName, setRoleName] = useState();
  const [selectedValue, setValue] = useState({
    "Create Role": "",
    "Manage Role": "",
    "Create Employee": "",
    "Manage Employee": "",
    "Create Project": "",
    "Create Task": "",
    "Create Project Board": "",
    "Assign Task": "",
    Reports: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...selectedValue, [name]: value });
  };
  const handleSubmit = () => {
    console.log("roleName", roleName);
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
            id="exampleFormControlInput1"
            onChange={(event) => setRoleName(event.target.value)}
            placeholder="Enter role name"
          />
        </div>
        <div className="mb-12">
          <label for="exampleFormControlInput1" className="form-label">
            Set Permissions
          </label>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">User Management</h5>
              <AddRolePermission title="Create Role" onChange={handleChange} />
              <AddRolePermission title="Manage Role" onChange={handleChange} />
              <AddRolePermission
                title="Create Employee"
                onChange={handleChange}
              />
              <AddRolePermission
                title="Manage Employee"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-12">
          <label for="exampleFormControlInput1" className="form-label"></label>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Task Management</h5>

              <AddRolePermission
                title="Create Project"
                onChange={handleChange}
              />
              <AddRolePermission title="Create Task" onChange={handleChange} />
              <AddRolePermission title="Assign Task" onChange={handleChange} />
              <AddRolePermission title="Create Project Board" />
              <AddRolePermission title="Reports" onChange={handleChange} />
            </div>
          </div>
        
        </div>
      
        <div className="addrole_Button">
          <button
            className="btn  float-left"
            type="submit"
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
