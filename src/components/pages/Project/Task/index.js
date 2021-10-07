import React, { useState } from "react";
import Modal from "../../../common/Model";
import Header from "../../Header/Header";
import './task.css'
import Alert from "../../../common/Alert"
import { useHistory} from "react-router-dom"

const Task = () => {
  const [InputData, setInputData] = useState("");
  const [Items, setItems] = useState([]);
  const [range, setRange] = useState(false);
  const [isEditItem, setIsEditItem] = useState();
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [addNewTask, setNewTask] =useState("")
  const [modalOpen, setModalOpen] = useState(false);
  const [ids,setID]=useState()
  // const addItems = (e) => {
  //   e.preventDefault();
  //   if (!InputData) {
  //     alert("please Fill Data");
  //   } else if (InputData && !toggleSubmit) {
  //     setItems(
  //       Items.map((elem) => {
  //         if (elem.id === isEditItem) {
  //           return { ...elem, name: InputData };
  //         }
  //         return elem;
  //       })
  //     );
  //     setInputData("");
  //      setIsEditItem(null);
  //      setToggleSubmit(true);
  //   } else {
  //     const allInputData = {
  //       id: new Date().getTime().toString(),
  //       name: InputData,
  //     };
  //     setItems([...Items, allInputData]);
  //     setInputData("");
  //   }
  // };
  const history =useHistory()
  const routeBack = () => {
    let path = './Project'
    history.push(path)
  }
  const addItems = (e) => {
    e.preventDefault();
    if (!addNewTask) {
      alert("please Fill Data");
    }  else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: addNewTask,
      };
      setItems([...Items, allInputData]);
      setNewTask("");
    }
  };
  const delAlert=(id,e)=> {
    e.preventDefault()
    setModalOpen(true)
      setID(id)
  }
  const handleDelete = (index) => {
    const updateditems = Items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateditems);
    setModalOpen(false)
  };
  const handleSave = () =>{
       setItems(
        Items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: InputData };
          }
          return elem;
        })
      );
      setIsOpenEdit(false)
  }
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

  const handleModal = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <div className="task-header">
       <Header headerName="Create Project"/>
       <Alert open={modalOpen} onClose={() => setModalOpen(false)} setOpenModal={setModalOpen} handleDelete={(id)=>handleDelete(id)} id={ids}/>
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

      <Modal open={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
                      <div style={{ marginTop: "4%" }}>
                <div style={{ textAlignLast: "center" }}>
                  <h4 style={{ fontWeight: "700"}}>Edit Task</h4>
                </div>
                <div style={{ margin: "auto", width: "70%" }}>
                  <div className="row">
                    <label
                      class="form-check-label reg-lable"
                      for="exampleCheck1"
                    >
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
                    style={{ marginTop: "5%", marginBottom:"5%" }}
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
                      Back
                    </button>
                  </div>
                </div>
              </div>
      </Modal>
      <div class="task-container">
        <div className="project-card">
          <div >
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
                      placeholder="Enter Project name"
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
                  {Items.length > 0 ?<div className="labaddtwo">
                    <label style={{ fontWeight: "700" }}>Tasks</label>
                  </div>:null}
                  
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
                               <img src="images/assigntask.png" alt="logo" />
                            </button>
                            <button
                              className="action_image"
                              // onClick={() => {
                              //   deleteItems(elem.id);
                              // }}
                              onClick={(e) => delAlert(elem.id,e)}
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
                                src="images/Edit.png"
                                alt="logo"
                              />
                            </button>
                          </div>
                        </div>
                      
                      </div>
                      
                    );
                  })}

  {Items.length > 0 ?
  <div className="addTask_Button">
          <button
            className="btn  float-left"
            type="submit"
            style={{backgroundColor:"#003366"}}
          >
            Save
          </button>
          <button
            className="btn  float-left"
            type="submit"
            onClick={routeBack}
          >
            Back
          </button>
        </div>:null}

                </div>
              </div>
            </form>
          </div>
        </div>
    </div>
    </div>
  );
};
export default Task;
