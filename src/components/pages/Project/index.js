import React, { useState, useEffect } from "react";
import "./createprojet.css";
import Header from "../Header/Header";
import { Link, useParams, useHistory } from "react-router-dom";
import proimage from "./../../NewImages/ProImageiconone.png";
import proimagePlus from "./../../NewImages/plusiconimage.png";

const CreateProject = () => {
  const [projectInfo, setProjectInfo] = useState(false);
  const [task, setTask] = useState(false);
  const [InputData, setInputData] = useState("");
  const [Items, setItems] = useState([]);
  const handleProject = () => {
    setProjectInfo(!projectInfo);
    setTask(false);
  };
  const handleTask = () => {
    setTask(!task);
    setProjectInfo(false);
  };
  const addItems = (e) => {
    e.preventDefault();
    if (!InputData) {
    } else {
      setItems([...Items, InputData]);
      setInputData("");
    }
  };

  const deleteItems = (id) => {
    console.log(id);
    const updateditems = Items.filter((elem, i) => {
      return i !== id;
    });
    setItems(updateditems);
  };

  return (
    <div className="project-header">
      <Header headerName="Create Project" />
      <div className="main">
        <div>
          <div class="project-container">
            <div class="row">
              <div className="col" style={{ display: "flex" }}>
                <img
                  src="images/Project-info-icon.png"
                  alt="Project-info-icon"
                  style={{padding: "8px"}}
                />
                <label
                  class="form-check-label reg-lable"
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
                    projectInfo == true
                      ? "images/downicon.png"
                      : "images/forwardicon.png"
                  }
                  onClick={handleProject}
                  style={{ marginRight: "10px",padding: "8px" }}
                  alt="Project-info-icon"
                />
              </div>
            </div>
          </div>
          {projectInfo == true ? (
            <div className="project-card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col">
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Name"
                        style={{ backgroundColor: "white" }}
                      />
                    </div>

                    <div className="col">
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Project Type
                      </label>
                      <select
                        class="form-select"
                        id="inputGroupSelect03"
                        aria-label="Example select with button addon"
                        style={{ backgroundColor: "white" }}
                      >
                        <option selected>Select Project Type</option>
                        <option value="1">React js</option>
                        <option value="2">React Native</option>
                        <option value="3">Angular</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div class="form-group">
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Project Description
                      </label>
                      <textarea class="form-control" rows="3"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Assigned To
                      </label>

                      <select
                        class="form-select"
                        id="inputGroupSelect03"
                        aria-label="Example select with button addon"
                        style={{ backgroundColor: "white" }}
                      >
                        <option selected>Choose Assignee</option>
                        <option value="1">Developer</option>
                        <option value="2">Tester</option>
                        <option value="3">Designer</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <div class="project-container">
            <div class="row">
              <div className="col" style={{ display: "flex" }}>
                <img src="images/Tasks.png" alt="Project-info-icon"  style={{padding: "8px" }} />
                <label
                  class="form-check-label reg-lable"
                  for="exampleCheck1"
                  style={{ marginLeft: "10px", color: "white" }}
                >
                  Tasks
                </label>
              </div>
              <div className="col" style={{ display: "contents" }}>
                <img
                  src={
                    task == true
                      ? "images/downicon.png"
                      : "images/forwardicon.png"
                  }
                  onClick={handleTask}
                  style={{ marginRight: "10px",padding: "8px" }}
                  alt="Project-info-icon"
                />
              </div>
            </div>
          </div>
          {task == true ? (
            <div className="project-card">
              <div className="card-body">
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Name
                      </label>
                      <div style={{ display: "flex" }}>
                        <input
                          style={{ backgroundColor: "white" }}
                          type="text"
                          id="fname"
                          name="firstname"
                          placeholder="Name"
                          value={InputData}
                          onChange={(e) => setInputData(e.target.value)}
                        />
                        <button
                          className="btn"
                          className="changebtn"
                          onClick={addItems}
                          type="submit"
                          style={{ backgroundColor: "#25344b" }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="ShowItems">
                      <div className="labaddtwo">
                        <label style={{ fontWeight: "700" }}>Tasks</label>
                      </div>
                      {Items.map((elem, i) => {
                        return (
                          <div class="doccontainernew">
                            <div class="row" key={i}>
                              <div class="col">
                                <p style={{ color: "black",textAlign: "justify" }}>{elem}</p>
                              </div>

                              <div class="col">
                                <button
                                  className="dustbin_image"
                                  onClick={() => deleteItems(i)}
                                >
                                  <img src={proimage} alt="logo" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
            <button
              className="btn  float-left"
              type="submit"
              style={{ backgroundColor: "#25344b" }}
            >
              Create
            </button>
            <button className="btn  float-left" type="submit">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
