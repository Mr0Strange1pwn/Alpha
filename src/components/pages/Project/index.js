import React, { useState, useEffect } from "react";
import "./createprojet.css";
import Header from "../Header/Header";
import Task from "./Task";
import MileStone from "./MileStone";
import { useHistory } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { addProject , updateProject } from '../../../redux/actions/projectActions'
import { roleLIst } from "../../../redux/actions/roleAction";

const CreateProject = () => {
  const dispatch = useDispatch()
  const [projectInfo, setProjectInfo] = useState(true);
  const [Items, setItems] = useState([]);
  const [showError, SetError] = useState(false);
  const [mileStone, setMileStone] = useState(false);
  const [task, setTask] = useState(false);
  const [projectDetails, setDetails] = useState({
    name: "",
    projectType: "",
    description: "",
    assignedTo: "",
    category: "",
    weekelyhour: "",
    perhourcost: "",
  });
  const roles = useSelector((store) => store.role.userInfo);
  const { project } = useSelector((store) => store.project)
  const history = useHistory();
  const handleChange = (e) => {
    setDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };
  const handleProject = () => {
    setProjectInfo(!projectInfo);
    // setTask(false);
  };

  useEffect(() => {
    dispatch(roleLIst())
  },[])
console.log("roles",roles)
  useEffect(() => {
    console.log("project",project)
    if(project.id){
      if(project.project_type === "billable"){
        if(project.project_category === "retainer"){
          setDetails({
            name: project.name,
            projectType: project.project_type,
            description: project.project_description,
            assignedTo: project.assigned_to,
            category: project.project_category,
            weekelyhour: project.weekly_hours,
            perhourcost: project.per_hour_cost,
          })
        }else{
          setDetails({
            name: project.name,
            projectType: project.project_type,
            description: project.project_description,
            assignedTo: project.assigned_to,
            category: project.project_category,
            weekelyhour: "",
            perhourcost: "",
          })
        }
      }else{
        setDetails({
          name: project.name,
          projectType: project.project_type,
          description: project.project_description,
          assignedTo: project.assigned_to,
          category: "",
          weekelyhour: "",
          perhourcost: "",
        })
      }
     
    }
  },[project])

  const handleMileStone = () => {
    setMileStone(!mileStone);
    setProjectInfo(false);
  };

  const handleTask = () => {
    setTask(!task);
    setProjectInfo(false);
    let path = `./Task`;
    history.push(path);
  };

  const handleAddProject =(req )=>{
    let formData = new FormData();
    Object.keys(req).map(key=>{
      console.log("key",key)
      formData.append(key, req[key])
     })
     if(project && project.id){
      formData.append("id", project.id)
      dispatch(updateProject(formData, history))
     }else{
      dispatch(addProject(formData, history))
     }
    
  }

  const handleCreate = () => {
    SetError(true);
    if (
      projectDetails.name &&
      projectDetails.projectType &&
      projectDetails.description &&
      projectDetails.assignedTo
    ) {
      console.log("projectDeatils", projectDetails);
      if(projectDetails.projectType === "non_billable"){
        let req = {
          "project_name": projectDetails.name,
          "project_type": projectDetails.projectType,
          "project_description": projectDetails.description,
          "assigned_to": projectDetails.assignedTo,
        }
        console.log(" req", req)
        handleAddProject(req)
      }else {
        if( projectDetails.category === "retainer"){
          let req = {
            "project_name": projectDetails.name,
            "project_type": projectDetails.projectType,
            "project_description": projectDetails.description,
            "assigned_to": projectDetails.assignedTo,
            "project_category": projectDetails.category,
            "per_hour_cost": projectDetails.perhourcost,
            "weekly_hours": projectDetails.weekelyhour
          }
          console.log(" req", req)
          handleAddProject(req)
        }else{
          let req = {
            "project_name": projectDetails.name,
            "project_type": projectDetails.projectType,
            "project_description": projectDetails.description,
            "assigned_to": projectDetails.assignedTo,
            "project_category": projectDetails.category,
          
          }
          console.log(" req", req)
          handleAddProject(req)
        }
       
      }
    }
  };
  return (
    <div className="project-header">
      <Header headerName="Create Project" />
      <div className="main">
        <div>
          <div className="project-container">
            <div className="row">
              <div className="col" style={{ display: "flex" }}>
                <img
                  src="images/Project-info-icon.png"
                  alt="Project-info-icon"
                  style={{ padding: "8px", marginLeft: "1%" }}
                />
                <label
                  className="form-check-label reg-lable"
                  for="exampleCheck1"
                  style={{
                    marginLeft: "10px",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  Project Information
                </label>
              </div>
              <div className="col" style={{ display: "contents" }}>
                <img
                  src={
                    projectInfo === true
                      ? "images/downicon.png"
                      : "images/forwardicon.png"
                  }
                  onClick={handleProject}
                  style={{ marginRight: "2%", padding: "10px" }}
                  alt="Project-info-icon"
                />
              </div>
            </div>
          </div>
          {projectInfo === true ? (
            <div className="project-card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col">
                      <label
                        className="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Project Name
                      </label>
                      <input
                        style={{
                          backgroundColor: "white",
                          border: showError
                            ? projectDetails.name.length === 0
                              ? " 1px solid red"
                              : null
                            : null,
                        }}
                        type="text"
                        className="form-control"
                        placeholder="Enter Project Name"
                        name="name"
                        value={projectDetails.name}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>

                    <div className="col">
                      <label
                        className="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Project Type
                      </label>
                      <select
                        style={{
                          backgroundColor: "white",
                          border: showError
                            ? projectDetails.projectType === ""
                              ? " 1px solid red"
                              : null
                            : null,
                        }}
                        className="form-select"
                        id="inputGroupSelect03"
                        aria-label="Example select with button addon"
                        name="projectType"
                        value={projectDetails.projectType}
                        onChange={(e) => handleChange(e)}
                      >
                        <option selected>Select Project Type</option>
                        <option value="billable">Billable</option>
                        <option value="non_billable">Non Billable</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="form-group">
                      <label
                        className="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Project Description
                      </label>
                      <textarea
                        style={{
                          border: showError
                            ? projectDetails.description === ""
                              ? " 1px solid red"
                              : null
                            : null,
                        }}
                        className="form-control"
                        rows="3"
                        name="description"
                        value={projectDetails.description}
                        onChange={(e) => handleChange(e)}
                        placeholder="Project description"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        className="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Assigned To
                      </label>

                      <select
                        style={{
                          backgroundColor: "white",
                          border: showError
                            ? projectDetails.assignedTo === ""
                              ? " 1px solid red"
                              : null
                            : null,
                        }}
                        className="form-select"
                        id="inputGroupSelect03"
                        aria-label="Example select with button addon"
                        name="assignedTo"
                        value={projectDetails.assignedTo}
                        onChange={(e) => handleChange(e)}
                      >
                        <option selected>Choose Assignee</option>
                        {roles.length> 0 ? roles.map(role => <option value={role.id}>{role.roleName}</option> ) : "" }
                        {/* <option value="1">Developer</option>
                        <option value="2">Tester</option>
                        <option value="3">Designer</option> */}
                      </select>
                    </div>

                    {projectDetails.projectType === "billable" ? (
                      <div className="col-md-6">
                        <label
                          className="form-check-label reg-lable"
                          for="exampleCheck1"
                        >
                          Project Category
                        </label>

                        <select
                          style={{
                            backgroundColor: "white",
                            border: showError
                              ? projectDetails.category === ""
                                ? " 1px solid red"
                                : null
                              : null,
                          }}
                          className="form-select"
                          id="inputGroupSelect03"
                          aria-label="Example select with button addon"
                          name="category"
                          value={projectDetails.category}
                          onChange={(e) => handleChange(e)}
                        >
                          <option selected>Choose Project Category</option>
                          <option value="retainer">Retainer</option>
                          <option value="non_retainer">Non Retainer</option>
                        </select>
                      </div>
                    ) : null}
                  </div>

                  {projectDetails.projectType === "billable" ? (
                    projectDetails.category === "retainer" ? (
                      <div className="row">
                        <div className="col-md-6">
                          <label
                            className="form-check-label reg-lable"
                            for="exampleCheck1"
                          >
                            Per Hour Cost
                          </label>
                          {/* <div style={{display:"flex"}}> */}
                          <input
                            style={{
                              backgroundColor: "white",
                              border: showError
                                ? projectDetails.perhourcost === ""
                                  ? " 1px solid red"
                                  : null
                                : null,
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Per hour cost in INR"
                            name="perhourcost"
                            value={projectDetails.perhourcost}
                            onChange={(e) => handleChange(e)}
                          />
                          {/* <span class="input-group-text border-start-0"style={{backgroundColor:" white"}}>INR</span> */}
                          {/* </div> */}
                        </div>
                        <div className="col-md-6">
                          <label
                            className="form-check-label reg-lable"
                            for="exampleCheck1"
                          >
                            Weekly Hour
                          </label>

                          <input
                            style={{
                              backgroundColor: "white",
                              border: showError
                                ? projectDetails.weekelyhour === ""
                                  ? " 1px solid red"
                                  : null
                                : null,
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Enter hour"
                            name="weekelyhour"
                            value={projectDetails.weekelyhour}
                            onChange={(e) => handleChange(e)}
                          />
                        </div>
                      </div>
                    ) : null
                  ) : null}
                </form>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div>
          {/* {projectDetails.category === "non_retainer" ? (
            <div className="project-container">
              <div className="row">
                <div className="col" style={{ display: "flex" }}>
                  <img
                    src="images/mstone.png"
                    alt="Project-info-icon"
                    style={{ padding: "3px", marginLeft: "1%" }}
                  />
                  <label
                    className="form-check-label reg-lable"
                    for="exampleCheck1"
                    style={{
                      marginLeft: "10px",
                      color: "white",
                      marginRight: "10px",
                    }}
                  >
                    Project Milestone
                  </label>
                </div>
                <div className="col" style={{ display: "contents" }}>
                  <img
                    src={
                      mileStone == true
                        ? "images/downicon.png"
                        : "images/forwardicon.png"
                    }
                    onClick={handleMileStone}
                    style={{ marginRight: "2%", padding: "10px" }}
                    alt="Project-info-icon"
                  />
                </div>
              </div>
            </div>
          ) : null}

          {mileStone === true ? <MileStone /> : null} */}

          {/* {projectDetails.projectType === "non_billable" ? (
            <div className="project-container">
              <div className="row">
                <div className="col" style={{ display: "flex" }}>
                  <img
                    src="images/Tasks.png"
                    alt="Project-info-icon"
                    style={{ padding: "8px", marginLeft: "1%" }}
                  />
                  <label
                    className="form-check-label reg-lable"
                    for="exampleCheck1"
                    style={{
                      marginLeft: "10px",
                      color: "white",
                      marginRight: "10px",
                    }}
                  >
                    Task
                  </label>
                </div>
                <div className="col" style={{ display: "contents" }}>
                  <img
                    src={
                      task === true
                        ? "images/downicon.png"
                        : "images/forwardicon.png"
                    }
                    onClick={handleTask}
                    style={{ marginRight: "2%", padding: "10px" }}
                    alt="Project-info-icon"
                  />
                </div>
              </div>
            </div>
          ) : null} */}

          {/* {task==true?<Task task={true}/>:null} */}
        </div>
        <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
            <button
              className="btn  float-left"
              type="submit"
              style={{ backgroundColor: "#25344b" }}
              onClick={() => handleCreate()}
            >
             { projectDetails.projectType === "non_billable" ? "Next" : projectDetails.category === "non_retainer" ? "Next" : " Create"}
            </button>
            <button className="btn  float-left" onClick={()=> history.goBack()}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
