import React, { useState, useEffect } from "react";
import "./addRole.css";
import { useHistory } from "react-router-dom";
import AddRolePermission from "../../common/AddRolePermission";
import Header from "../Header/Header";
import { AddRoleAPI,saveRoleUpdate } from "../../../redux/actions/roleAction";
import { useSelector, useDispatch } from "react-redux";

function AddRole() {
  const roleInfo = useSelector((store) => store.role.userInfo);
  const [roleid, setRoleID] = useState();
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
    roleName: "",
  });
  const History = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (roleInfo !== undefined && roleInfo.id) {
      setValue({
        roleName: roleInfo.roleName,
        assignTask: roleInfo.assignTask,
        createEmployee: roleInfo.createEmployee,
        createProject: roleInfo.createProject,
        createProjectBoard: roleInfo.createProjectBoard,
        createRole: roleInfo.createRole,
        createTask: roleInfo.createTask,
        manageEmployee: roleInfo.manageEmployee,
        manageRole: roleInfo.manageRole,
        reports: roleInfo.reports,
      });
    }
  }, [roleInfo]);

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...selectedValue, [name]: value });
  };
  const handleSubmit = () => {
    if (roleInfo.id) {
      let updatedData = {
        roleid:roleInfo.id,
        assignTask: selectedValue.assignTask,
        createEmployee: selectedValue.createEmployee,
        createProject: selectedValue.createProject,
        createProjectBoard: selectedValue.createProjectBoard,
        createRole: selectedValue.createRole,
        createTask: selectedValue.createTask,
        manageEmployee:selectedValue.manageEmployee,
        manageRole:selectedValue.manageRole,
        reports:selectedValue.reports,
        roleName: selectedValue.roleName,
      };
       dispatch(saveRoleUpdate(updatedData,History))
    } else {
       dispatch(AddRoleAPI(selectedValue,History));
    }
  };
  const handleCancel = () => {
    History.push("/Rolespermission");
  }
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
            value={selectedValue.roleName}
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
                value={selectedValue.createRole}
                onChange={handleChange}
              />
              <AddRolePermission
                name="manageRole"
                title="Manage Role"
                value={selectedValue.manageRole}
                onChange={handleChange}
              />
              <AddRolePermission
                name="createEmployee"
                title="Create Employee"
                value={selectedValue.createEmployee}
                onChange={handleChange}
              />
              <AddRolePermission
                name="manageEmployee"
                title="Manage Employee"
                value={selectedValue.manageEmployee}
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
                value={selectedValue.createProject}
                onChange={handleChange}
              />
              <AddRolePermission
                name="createTask"
                title="Create Task"
                value={selectedValue.createTask}
                onChange={handleChange}
              />
              <AddRolePermission
                name="assignTask"
                title="Assign Task"
                value={selectedValue.assignTask}
                onChange={handleChange}
              />
              <AddRolePermission
                name="createProjectBoard"
                title="Create Project Board"
                value={selectedValue.createProjectBoard}
                onChange={handleChange}
              />
              <AddRolePermission
                name="reports"
                title="Reports"
                value={selectedValue.reports}
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
          <button  onClick={handleCancel} className="btn  float-left" type="submit">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddRole;
