import React, { useState, useEffect } from "react";
import "./settings.css";
import Header from "../Header/Header";
import Modal from "./../../common/Model";
import Alert from "./../../common/Alert";
import {
  getDesignation,
  deleteDesignation,
  addDesignation,
  updateDesignation,
} from "../../../redux/actions/settingAction";
import {
  getJobType,
  deleteJobType,
  addJobType,
  updateJobType,
} from "../../../redux/actions/jobtypeAction";
import { useSelector, useDispatch } from "react-redux";

const Setting = () => {
  const [projectInfo, setProjectInfo] = useState(false);
  const [task, setTask] = useState(false);
  const [InputData, setInputData] = useState("");
  const [InputDataTwo, setInputDataTwo] = useState("");
  const [isEditItem, setIsEditItem] = useState();
  const [isEditItemTwo, setIsEditItemTwo] = useState();
  const [addNewTask, setNewTask] = useState("");
  const [addNewTaskTwo, setNewTaskTwo] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpenTwo, setModalOpenTwo] = useState(false);
  const [ids, setID] = useState();
  const [idsNew, setIDNew] = useState();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenEditTwo, setIsOpenEditTwo] = useState(false);
  const designation = useSelector((store) => store.setting.designation);
  const jobTypeList = useSelector((store) => store.jobtype.jobTypes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDesignation());
    dispatch(getJobType());
  }, []);

  const addItems = (e) => {
    e.preventDefault();
    if (!addNewTask) {
      alert("please Fill Data");
    } else {
      let data = {
        designation_name: addNewTask,
      };
      dispatch(addDesignation(data));
      dispatch(getDesignation());
    }
  };
  const addItemsNew = (e) => {
    e.preventDefault();
    dispatch(getJobType());
    if (!addNewTaskTwo) {
      alert("please Fill Data");
    } else {
      let data = {
        Type_name: addNewTaskTwo,
      };
      dispatch(addJobType(data));
      dispatch(getJobType());
    }
  };
  const delAlert = (id, e) => {
    e.preventDefault();
    setModalOpen(true);
    setID(id);
  };
  const delAlertNew = (id, e) => {
    e.preventDefault();
    setModalOpenTwo(true);
    setIDNew(id);
  };
  const handleDelete = (id) => {
    dispatch(deleteDesignation(id));
    setModalOpen(false);
  };

  const handleDeleteNew = (id) => {
    dispatch(deleteJobType(id));
    setModalOpenTwo(false);
  };

  const handleSave = () => {
    let data = {
      id: isEditItem,
      designation_name: InputData,
    };
    dispatch(updateDesignation(data));
    dispatch(getDesignation());
    setIsOpenEdit(false);
  };
  const handleSaveTwo = () => {
    let data = {
      id: isEditItemTwo,
      Type_name: InputDataTwo,
    };
    dispatch(updateJobType(data));
    dispatch(getJobType());
    setIsOpenEditTwo(false);
  };
  const editItems = (id, e) => {
    e.preventDefault();
    setIsOpenEdit(true);
    let newEditItem = designation.find((elem) => {
      return elem.id === id;
    });
    setInputData(newEditItem.designation_name);
    setIsEditItem(id);
  };
  const editItemsTwo = (id, e) => {
    e.preventDefault();
    setIsOpenEditTwo(true);
    let newEditItem = jobTypeList.find((elem) => {
      return elem.id === id;
    });
    setInputDataTwo(newEditItem.Type_name);
    setIsEditItemTwo(id);
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
        message="delete the Designation"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setOpenModal={setModalOpen}
        handleDelete={(id) => handleDelete(id)}
        id={ids}
      />
      <Alert
        message="delete the Job Type"
        open={modalOpenTwo}
        onClose={() => setModalOpen(false)}
        setOpenModal={setModalOpenTwo}
        handleDelete={(id) => handleDeleteNew(id)}
        id={idsNew}
      />
      <Modal open={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
        <div style={{ marginTop: "4%" }}>
          <div style={{ textAlignLast: "center" }}>
            <h4 style={{ fontWeight: "700" }}>Edit Designation</h4>
          </div>
          <div style={{ margin: "auto", width: "70%" }}>
            <div className="row">
              <label className="form-check-label reg-lable" for="exampleCheck1">
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
                onClick={() => handleSave()}
              >
                Save
              </button>
              <span> </span>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: " #717171", color: "white" }}
                onClick={() => setIsOpenEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal open={isOpenEditTwo} onClose={() => setIsOpenEditTwo(false)}>
        <div style={{ marginTop: "4%" }}>
          <div style={{ textAlignLast: "center" }}>
            <h4 style={{ fontWeight: "700" }}>Edit JobType</h4>
          </div>
          <div style={{ margin: "auto", width: "70%" }}>
            <div className="row">
              <label className="form-check-label reg-lable" for="exampleCheck1">
                Name
              </label>
              <input
                type="text"
                id="fname"
                name="name"
                placeholder="Enter Name"
                value={InputDataTwo}
                onChange={(e) => setInputDataTwo(e.target.value)}
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
                onClick={() => handleSaveTwo()}
              >
                Save
              </button>
              <span> </span>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: " #717171", color: "white" }}
                onClick={() => setIsOpenEditTwo(false)}
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
                <img
                  src="images/designation.png"
                  alt="Project-info-icon"
                  className="des-img"
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
                  Designation
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
                  style={{ marginRight: "10px" }}
                  alt="Project-info-icon"
                  className="arrow-img"
                />
              </div>
            </div>
          </div>
          {projectInfo === true ? (
            <div class="smain-container">
              <div className="project-card">
                <div>
                  <form>
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <label
                          className="form-check-label reg-lable"
                          for="exampleCheck1"
                        >
                          Add Designation
                        </label>
                        <div
                          className="add-des-form"
                          style={{ display: "flex" }}
                        >
                          <input
                            style={{ backgroundColor: "white" }}
                            type="text"
                            id="fname"
                            name="firstname"
                            placeholder="Add designation"
                            value={addNewTask}
                            onChange={(e) => setNewTask(e.target.value)}
                          />
                          <button
                            className="btn changebtn"
                            onClick={addItems}
                            style={{
                              backgroundImage: "url(images/plusiconimage.png)",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "left",
                              backgroundOrigin: "content-box",
                              backgroundColor: "#25344b",
                            }}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="ShowItems">
                        {designation.length > 0 ? (
                          <div className="labaddtwo">
                            <label style={{ fontWeight: "700" }}>
                              Designation
                            </label>
                          </div>
                        ) : null}

                        {designation.map((elem) => {
                          return (
                            <div className="doccontainernew">
                              <table className="task-des" key={elem.id}>
                                <tr>
                                  <td>
                                    <p
                                      style={{
                                        color: "black",
                                        textAlign: "justify",
                                      }}
                                    >
                                      {elem.designation_name}
                                    </p>
                                  </td>

                                  <td>
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
                                  </td>
                                </tr>
                              </table>
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
          <div className="setting-container">
            <div className="row">
              <div className="col" style={{ display: "flex" }}>
                <img
                  src="images/jobtype.png"
                  alt="Project-info-icon"
                  class="des-img"
                />
                <label
                  className="form-check-label reg-lable"
                  for="exampleCheck1"
                  style={{ marginLeft: "10px", color: "white" }}
                >
                  Job Type
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
                  style={{ marginRight: "10px" }}
                  alt="Project-info-icon"
                  className="arrow-img"
                />
              </div>
            </div>
          </div>
          {task === true ? (
            <div className="smain-container">
              <div className="project-card">
                <div>
                  <form>
                    <div className="row">
                      <div className="col-sm-12 col-md-12 col-lg-6">
                        <label
                          className="form-check-label reg-lable"
                          for="exampleCheck1"
                        >
                          Add Job Type
                        </label>
                        <div className="job-form" style={{ display: "flex" }}>
                          <input
                            style={{ backgroundColor: "white" }}
                            type="text"
                            id="fname"
                            name="firstname"
                            placeholder="Add job type"
                            value={addNewTaskTwo}
                            onChange={(e) => setNewTaskTwo(e.target.value)}
                          />
                          <button
                            className="btn changebtn"
                            onClick={addItemsNew}
                            style={{
                              backgroundImage: "url(images/plusiconimage.png)",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "left",
                              backgroundOrigin: "content-box",
                              backgroundColor: "#25344b",
                            }}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="ShowItems">
                        {jobTypeList.length > 0 ? (
                          <div className="labaddtwo">
                            <label style={{ fontWeight: "700" }}>
                              Job Type
                            </label>
                          </div>
                        ) : null}

                        {jobTypeList.map((elem) => {
                          return (
                            <div className="doccontainernew">
                              <table className="task-des" key={elem.id}>
                                <tr>
                                  <td>
                                    <p
                                      style={{
                                        color: "black",
                                        textAlign: "justify",
                                      }}
                                    >
                                      {elem.Type_name}
                                    </p>
                                  </td>

                                  <td>
                                    <button
                                      className="action_image"
                                      onClick={(e) => delAlertNew(elem.id, e)}
                                    >
                                      <img src="images/Del.png" alt="logo" />
                                    </button>
                                    <button
                                      className="action_image"
                                      onClick={(e) => {
                                        editItemsTwo(elem.id, e);
                                      }}
                                    >
                                      <img src="images/Edit.png" alt="logo" />
                                    </button>
                                  </td>
                                </tr>
                              </table>
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
