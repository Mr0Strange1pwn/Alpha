import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import proimage from "./../../../NewImages/ProImageiconone.png";
import proimagePlus from "./../../../NewImages/plusiconimage.png";
import Modal from "../../../common/Model";

const Task = () => {
  const [task, setTask] = useState(false);
  const [InputData, setInputData] = useState("");
  const [Items, setItems] = useState([]);
  const [range, setRange] = useState(false);
  const [isEditItem, setIsEditItem] = useState();
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleTask = () => {
    setTask(!task);
  };

  const addItems = (e) => {
    e.preventDefault();
    if (!InputData) {
      alert("please Fill Data");
    } else if (InputData && !toggleSubmit) {
      setItems(
        Items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: InputData };
          }
          return elem;
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleSubmit(true);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: InputData,
      };
      setItems([...Items, allInputData]);
      setInputData("");
    }
  };
  const deleteItems = (index) => {
    const updateditems = Items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateditems);
  };

  const editItems = (id, e) => {
    e.preventDefault();
    let newEditItem = Items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setInputData(newEditItem.name);
    setIsEditItem(id);
    setToggleSubmit(false);
  };
  const handleModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };
  return (
    <div>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <button
          type="button"
          className="btn"
          style={{ backgroundColor: " #717171", color: "white" }}
          type="submit"
          onClick={() => setIsOpen(false)}
        >
          Back
        </button>
      </Modal>
      <div class="project-container">
        <div class="row">
          <div className="col" style={{ display: "flex" }}>
            <img
              src="images/Tasks.png"
              alt="Project-info-icon"
              style={{ padding: "8px" }}
            />
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
                task == true ? "images/downicon.png" : "images/forwardicon.png"
              }
              onClick={handleTask}
              style={{ marginRight: "10px", padding: "8px" }}
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
                  <label class="form-check-label reg-lable" for="exampleCheck1">
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
                              onClick={(e) => handleModal(e)}
                            >
                              <img src={proimage} alt="logo" />
                            </button>
                            <button
                              className="action_image"
                              onClick={() => {
                                deleteItems(elem.id);
                              }}
                            >
                              <img src="images/Del.png" alt="logo" />
                            </button>
                            <button
                              className="action_image"
                              onClick={(e) => {
                                editItems(elem.id, e);
                              }}
                            >
                              <img
                                className="action_image"
                                src="images/Edit.png"
                                alt="logo"
                              />
                              {/* <img src={proimage} alt="logo" /> */}
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
  );
};
export default Task;
