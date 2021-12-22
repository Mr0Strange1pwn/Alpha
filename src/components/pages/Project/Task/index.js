import React, { useState, useEffect } from "react";
import Modal from "../../../common/Model";
import Header from "../../Header/Header";
import "./task.css";
import Alert from "../../../common/Alert";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Categories from "../Category/categories";
import Categorytype from "../Category/categorytype";
import { useSelector, useDispatch } from "react-redux";
import {
  getTask,
  addTask,
  deleteTask,
  updateTask,
} from "../../../../redux/actions/projectActions";
import {
  getDesignitations,
  getRoles,
} from "../../../../redux/actions/employeeAction";

const Task = () => {
  const [InputData, setInputData] = useState({});
  const [editData, setEditData] = useState({});
  const [Items, setItems] = useState([]);
  const [range, setRange] = useState(false);
  const { designations, roles } = useSelector((store) => store.emp);
  const [employee, setEmployee] = useState([]);
  const [isEditItem, setIsEditItem] = useState();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [addNewTask, setNewTask] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [ids, setID] = useState();
  const dispatch = useDispatch();
  const { project, tasks } = useSelector((store) => store.project);

  useEffect(() => {
    let id = project.id;
    dispatch(getTask(id));
  }, [project]);

  useEffect(() => {
    dispatch(getDesignitations());
    dispatch(getRoles());
  }, []);

  useEffect(() => {
    console.log("projectsstask", tasks);
    if (tasks.length > 0) {
      let tasksArr = [];

      tasks.map((task) => {
        tasksArr.push({
          id: task.id,
          name: task.task_name,
          assignTO: task.employees,
          department: task.role == null ? "" : task.role,
          category: "",
          project: task.project,
        });
      });
      setItems(tasksArr);
    } else {
      setItems([]);
    }
  }, [tasks]);

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

  const history = useHistory();
  const addItems = (e) => {
    e.preventDefault();
    if (!addNewTask) {
      alert("please Fill Data");
    } else {
      let formData = new FormData();
      let id = project.id;
      let req = {
        task_name: addNewTask,
        project: id,
      };

      Object.keys(req).map((key) => {
        console.log("key", key);
        formData.append(key, req[key]);
      });

      dispatch(addTask(formData));
      dispatch(getTask(id));
      setNewTask("");
    }
  };
  const delAlert = (id, e) => {
    e.preventDefault();
    setModalOpen(true);
    setID(id);
  };
  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    setModalOpen(false);
  };
  const handleSave = () => {
    let data = {
      taskid: editData.id,
      task_name: InputData,
      project: editData.project,
      employees: [0],
    };
    dispatch(updateTask(data));
    dispatch(getTask(project.id));
    setIsOpenEdit(false);
  };
  console.log("InputData", editData);
  const editItems = (id, e) => {
    e.preventDefault();
    setIsOpenEdit(true);
    let newEditItem = tasks.find((elem) => {
      return elem.id === id;
    });
    console.log("newEditItem", newEditItem);
    setInputData(newEditItem);
    setEditData(newEditItem);
    setIsEditItem(id);
  };

  const handleModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (name === "allSelect") {
      let tempUser = employee.map((result) => {
        return { ...result, isChecked: checked };
      });
      setEmployee(tempUser);
    } else {
      let tempUser = employee.map((result) =>
        result.employee === name ? { ...result, isChecked: checked } : result
      );
      setEmployee(tempUser);
    }
  };

  return (
    <div className="task-header">
      <Header headerName="Create Task" />
      <Alert
        message="delete the Task"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setOpenModal={setModalOpen}
        handleDelete={(id) => handleDelete(id)}
        id={ids}
      />
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="cardnewone">
          <h3>Select Employee</h3>
          <button
            className="cardnewoneImagebutton"
            onClick={() => setRange(!range)}
          >
            <img src="images/Filter-popup.png" alt="logo" />
          </button>
        </div>
       

        <div className="cardforproject">
          <div className="container">
            <div className="row" style={hidme}>
              <div className="col-sm-6">
                <label
                  style={{
                    color: "darkBlue",
                    fontWeight: "600",
                    marginBottom: "20px",
                  }}
                >
                  Department
                </label>
              </div>
              <div className="col-sm-6">
                <label style={{ color: "darkBlue", fontWeight: "600" }}>
                  Category
                </label>
              </div>
            </div>
            <div className="row" style={hidme}>
              <div className="col-sm-6" style={{ color: "black" }}>
                <Categories values={roles} />
              </div>
              <div className="col-sm-6" style={{ color: "black" }}>
                <Categorytype values={designations} />
              </div>
              <div style={{ marginTop: "10px" }}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <span
                  style={{
                    color: "green",
                    fontWeight: "600",
                    marginLeft: "15px",
                  }}
                >
                  Select All
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="labuttonewupper" style={hidme}>
          <button
            type="button"
            className="labfour "
            style={{
              backgroundColor: "#25344b",
              color: "white",
              padding: "8px",
              width: "100px",
              marginRight: "8px",
            }}
            type="submit"
          >
            Save
          </button>
          <span> </span>
          <button
            type="button"
            className="btn float-left"
            style={{
              backgroundColor: " #717171",
              color: "white",
              padding: "8px",
              width: "100px",
            }}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
        
        <div>
          <div style={{ ...sohme, marginLeft: "6%", marginBottom: "30px" }}>
            <input
              // checked={!designations.some((result) => result?.isChecked !== true)}
              name="allSelect"
              onChange={handleChange}
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <span
              style={{ color: "green", fontWeight: "600", marginLeft: "15px" }}
            >
              Select All
            </span>
          </div>
          <div className="row" style={{ ...sohme, marginLeft: "5%" }}>
            {designations.map((result) => {
              return (
                <div
                  className="row"
                  style={{ position: "absolute", display: "contents" }}
                >
                  <div className="col-sm-4" style={{ padding: "4px" }}>
                    {" "}
                    <div style={{ display: "flex" }}>
                      <input
                        type="checkbox"
                        name={result.designation_name}
                        className="form-check-input"
                        // checked={result?.isChecked || false}
                        onChange={handleChange}
                        id="exampleCheck1"
                        value={result.designation_name}
                      />
                      <span
                        style={{
                          color: "black",
                          fontWeight: "600",
                          marginLeft: "15px",
                        }}
                      >
                        {result.designation_name}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="labuttonew" style={sohme}>
          <button
            type="button"
            className="btn btn-outline-success float-right labfour"
            style={{
              backgroundColor: "green",
              color: "white",
              padding: "8px",
              width: "100px",
              marginRight: "8px",
            }}
            // className="btn btn-info "
          >
            Save
          </button>
          <span> </span>
          <button
            type="button"
            className="btn float-left"
            style={{
              backgroundColor: " #717171",
              color: "white",
              padding: "8px",
              width: "100px",
            }}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Modal open={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
        <div style={{ marginTop: "4%" }}>
          <div style={{ textAlignLast: "center" }}>
            <h4 style={{ fontWeight: "700" }}>Edit Task</h4>
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
                value={InputData.task_name}
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
      <div class="task-container">
        <div className="project-card">
          <div>
            <form>
              <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <label class="form-check-label reg-lable" for="exampleCheck1">
                    Name
                  </label>
                  <div class="create-task-form" style={{ display: "flex" }}>
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
                      className="btn changebtn"
                      onClick={addItems}
                      type="submit"
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
                <table class="mile-header">
                  <tr>
                    <th>Task Name </th>
                    <th>Assinged To</th>
                    <th>Department</th>
                    <th>Category</th>
                    <th>Action</th>
                  </tr>

                  {Items.map((elem, i) => {
                    return (
                      <tr>
                        <td>{elem.name}</td>
                        <td>{elem.assignTO}</td>
                        <td>{elem.department}</td>
                        <td>{elem.category}</td>
                        <td style={{ width: "197px" }}>
                          <button onClick={(e) => delAlert(elem.id, e)}>
                            <img src="images/Del.png" alt="logo" />
                          </button>
                          <button
                            onClick={(e) => {
                              editItems(elem.id, e);
                            }}
                          >
                            <img src="images/Edit.png" alt="logo" />
                          </button>
                          <button onClick={(e) => handleModal(e)}>
                            <img src="images/assigntask.png" alt="logo" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
            </form>
            <div className="d-grid gap-2 d-md-block">
              <div className="addrole_Button">
                {/* <button
              className="btn  float-left"
              type="submit"
              style={{ backgroundColor: "#25344b" }}
              onClick={() => {}}
            >
              Create
            </button> */}
                <button
                  className="btn  float-left"
                  type="submit"
                  onClick={() => history.goBack()}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Task;
