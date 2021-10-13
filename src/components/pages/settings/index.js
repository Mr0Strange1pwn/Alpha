import React, { useState} from "react";
import "./settings.css";
import Header from "../Header/Header";
import Modal from "./../../common/Model";
import Alert from "./../../common/Alert";

const Setting = () => {
  const [projectInfo, setProjectInfo] = useState(false);
  const [task, setTask] = useState(false);
  const [InputData, setInputData] = useState("");
  const [Items, setItems] = useState([]);
  const [range, setRange] = useState(false);
  const [isEditItem, setIsEditItem] = useState();
  const [addNewTask, setNewTask] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [jobmodalOpen, setJobModalOpen] = useState(false);
  const [ids, setID] = useState();
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const hidme = {
    display: "flex",
  };

  if (range) {
    hidme.display = "none";
  }
  const sohme = {
    display: "none",
  };

  if (range) {
    sohme.display = "flex";
  }

  const addItems = (e) => {
    e.preventDefault();
    if (!addNewTask) {
      alert("please Fill Data");
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: addNewTask,
      };
      setItems([...Items, allInputData]);
      setNewTask("");
    }
  };
  const delAlert = (id, e) => {
    e.preventDefault();
    setModalOpen(true);
    setID(id);
  };

  const delJobAlert = (id, e) => {
    e.preventDefault();
    setJobModalOpen(true);
    setID(id);
  };
  const handleDelete = (index) => {
    const updateditems = Items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateditems);
    setModalOpen(false);
  };

  const handleJobDelete = (index) => {
    const updateditems = Items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateditems);
    setJobModalOpen(false);
  };
  const handleSave = () => {
    setItems(
      Items.map((elem) => {
        if (elem.id === isEditItem) {
          return { ...elem, name: InputData };
        }
        return elem;
      })
    );
    setIsOpenEdit(false);
  };
  const editItems = (id, e) => {
    e.preventDefault();
    setIsOpenEdit(true);
    let newEditItem = Items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  const handleProject = () => {
    setProjectInfo(!projectInfo);
    setTask(false);
  };
  const handleTask = () => {
    setTask(!task);
    setProjectInfo(false);
  };

  return (
    <div className="project-header">
      <Header headerName="Settings" />
      <Alert
        message="Designation"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setOpenModal={setModalOpen}
        handleDelete={(id) => handleDelete(id)}
        id={ids}
      />
       <Alert
        message="Job Typen"
        open={jobmodalOpen}
        onClose={() => setJobModalOpen(false)}
        setOpenModal={setJobModalOpen}
        handleDelete={(id) => handleJobDelete(id)}
        id={ids}
      />
      <Modal open={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
        <div style={{ marginTop: "4%" }}>
          <div style={{ textAlignLast: "center" }}>
            <h4 style={{ fontWeight: "700" }}>Edit Designation</h4>
          </div>
          <div style={{ margin: "auto", width: "70%" }}>
            <div className="row">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Name
              </label>
              <input
                type="text"
                id="fname"
                name="name"
                placeholder="Enter Name"
                value={InputData}
                onChange={(e) => setInputData(e.target.value)}
              />
            </div>

            <div
              className="modalButton"
              style={{ marginTop: "5%", marginBottom: "5%" }}
            >
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#003366", color: "white" }}
                type="submit"
                onClick={() => handleSave()}
              >
                Save
              </button>
              <span> </span>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: " #717171", color: "white" }}
                type="submit"
                onClick={() => setIsOpenEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <div className="main">
        <div>
          <div className="setting-container">
            <div className="row">
              <div className="col" style={{ display: "flex" }}>
                <img src="images/designation.png" alt="Project-info-icon" />
                <label
                  class="form-check-label reg-lable"
                  for="exampleCheck1"
                  style={{
                    marginLeft: "10px",
                    color: "white",
                    marginRight: "10px",
                  }}
                >
                  Designation
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
                  style={{ marginRight: "10px" }}
                  alt="Project-info-icon"
                />
              </div>
            </div>
          </div>
          {projectInfo == true ? (
            <div class="smain-container">
              <div className="project-card">
                <div>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <label
                          class="form-check-label reg-lable"
                          for="exampleCheck1"
                        >
                          Add Designation
                        </label>
                        <div style={{ display: "flex" }}>
                          <input
                            style={{ backgroundColor: "white" }}
                            type="text"
                            id="fname"
                            name="firstname"
                            placeholder="Enter task name"
                            value={addNewTask}
                            onChange={(e) => setNewTask(e.target.value)}
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
                        {Items.length > 0 ? (
                          <div className="labaddtwo">
                            <label style={{ fontWeight: "700" }}>Tasks</label>
                          </div>
                        ) : null}

                        {Items.map((elem) => {
                          return (
                            <div class="doccontainernew">
                              <div class="row" key={elem.id}>
                                <div class="col">
                                  <p
                                    style={{
                                      color: "black",
                                      textAlign: "justify",
                                    }}
                                  >
                                    {elem.name}
                                  </p>
                                </div>

                                <div class="col">
                                  <button
                                    className="action_image"
                                    onClick={(e) => delAlert(elem.id, e)}
                                  >
                                    <img src="images/Del.png" alt="logo" />
                                  </button>
                                  <button
                                    className="action_image"
                                    onClick={(e) => {
                                      editItems(elem.id, e);
                                    }}
                                  >
                                    <img src="images/Edit.png" alt="logo" />
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
            </div>
          ) : (
            " "
          )}
        </div>

        <div>
          <div class="setting-container">
            <div class="row">
              <div className="col" style={{ display: "flex" }}>
                <img src="images/jobtype.png" alt="Project-info-icon" />
                <label
                  class="form-check-label reg-lable"
                  for="exampleCheck1"
                  style={{ marginLeft: "10px", color: "white" }}
                >
                  Job Type
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
                  style={{ marginRight: "10px" }}
                  alt="Project-info-icon"
                />
              </div>
            </div>
          </div>
          {task == true ? (
            <div class="smain-container">
              <div className="project-card">
                <div>
                  <form>
                    <div className="row">
                      <div className="col-md-6">
                        <label
                          class="form-check-label reg-lable"
                          for="exampleCheck1"
                        >
                          Add Job Type
                        </label>
                        <div style={{ display: "flex" }}>
                          <input
                            style={{ backgroundColor: "white" }}
                            type="text"
                            id="fname"
                            name="firstname"
                            placeholder="Enter task name"
                            value={addNewTask}
                            onChange={(e) => setNewTask(e.target.value)}
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
                        {Items.length > 0 ? (
                          <div className="labaddtwo">
                            <label style={{ fontWeight: "700" }}>Tasks</label>
                          </div>
                        ) : null}

                        {Items.map((elem) => {
                          return (
                            <div class="doccontainernew">
                              <div class="row" key={elem.id}>
                                <div class="col">
                                  <p
                                    style={{
                                      color: "black",
                                      textAlign: "justify",
                                    }}
                                  >
                                    {elem.name}
                                  </p>
                                </div>

                                <div class="col">
                                  <button
                                    className="action_image"
                                    // onClick={() => {
                                    //   deleteItems(elem.id);
                                    // }}
                                    onClick={(e) => delJobAlert(elem.id, e)}
                                  >
                                    <img src="images/Del.png" alt="logo" />
                                  </button>
                                  <button
                                    className="action_image"
                                    onClick={(e) => {
                                      editItems(elem.id, e);
                                    }}
                                  >
                                    <img src="images/Edit.png" alt="logo" />
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
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Setting;
