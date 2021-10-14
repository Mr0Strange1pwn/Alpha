import React, { useState,useEffect } from "react";
import Modal from "../../../common/Model";
import Header from "../../Header/Header";
import './task.css'
import Alert from "../../../common/Alert"
import { useHistory} from "react-router-dom"
import axios from "axios";
import Categories from "../Category/categories";
import Categorytype from "../Category/categorytype";
import Tickphoto from "../../../NewImages/Tick.png";


const Task = () => {
  const [InputData, setInputData] = useState("");
  const [Items, setItems] = useState([]);
  const [range, setRange] = useState(false);
  const [employee, setEmployee] = useState([]);
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
  const backphoto= {
    backgroundImage: "url(" + Tickphoto + ")",
   }
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
  async function getAllEmployee() {
    try {
      const employee = await axios.get("http://localhost:3003/profile");
      setEmployee(employee.data);
    } catch (error) {
      console.log("something is wrong dude");
    }
  }
useEffect(() => {
    getAllEmployee();
  }, []);

 
  const handleChange = (e) =>{
     const {name, checked}= e.target;
     if(name === "allSelect"){
      let tempUser = employee.map((result) => {
        return { ...result, isChecked: checked };
      });
      setEmployee(tempUser);

     }else{
      let tempUser = employee.map((result) =>
        result.employee === name ? { ...result, isChecked: checked } : result
      );
      setEmployee(tempUser);
     }
  };

  return (
    <div className="task-header">
       <Header headerName="Create Task"/>
       <Alert message="Task" open={modalOpen} onClose={() => setModalOpen(false)} setOpenModal={setModalOpen} handleDelete={(id)=>handleDelete(id)} id={ids}/>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="cardnewone">
        <h3>Select Employee</h3>
        <button className="cardnewoneImagebutton"
            onClick={() => 
              setRange(!range)
            }><img src="images/Filter-popup.png" alt="logo" /></button></div>
             <div className="cardforproject">

               <div className="container">
                      <div className="row" style={hidme}>
                        <div className="col-sm-6"><label style={{color:'darkBlue',fontWeight:'600',marginBottom:'20px'}}>Department</label></div>
                        <div className="col-sm-6"><label style={{color:'darkBlue',fontWeight:'600'}}>Category</label></div>
                      </div>
                      <div className="row" style={hidme}>
                        <div className="col-sm-6" style={{color:'black'}}><Categories/></div>
                        <div className="col-sm-6"style={{color:'black'}}><Categorytype /></div>
                        <div style={{marginTop:'10px'}}><input  
                          type="checkbox" className="form-check-input" id="exampleCheck1" />
                   <span style={{color:'green',fontWeight:'600',marginLeft:'15px'}}>Select All</span></div>
                      </div>
               </div>

               </div>
               <div className="labuttonewupper" style={hidme}>
    <button type="button" className="labfour " 
     style={{ backgroundColor: "#25344b", color: "white" ,padding:'8px', width:'100px',marginRight:'8px'}}
     type="submit"  >Save</button><span>  </span>
		<button type="button"className="btn float-left"
    style={{backgroundColor:" #717171", color:"white",padding:'8px', width:'100px'}}
     type="submit"  onClick={()=> setIsOpen(false)} >Cancel</button>
    </div>
			
               
               <div>
                 <div style={{marginBottom:"30px"}}  style={{...sohme, marginLeft:"6%"}}> <input  
                   checked={!employee.some((result) => result?.isChecked !== true)}
                   name="allSelect"
                   onChange={handleChange}
                   type="checkbox" className="form-check-input" id="exampleCheck1" />
                   <span style={{color:'green',fontWeight:'600',marginLeft:'15px'}}>Select All</span></div>
                   <div className="row"  style={{...sohme, marginLeft:"5%"}}>
               {employee.map( (result) => {
                   
                   return(
                   
                   <div className="row" style={{position:"absolute",display:'contents'}}>
                            <div className="col-sm-4" style={{padding:"4px"}}> <div style={{display:'flex'}}>
                            <input 
                            type="checkbox" 
                            name={result.employee}
                            className="form-check-input"
                            checked={result?.isChecked || false}
                            onChange={handleChange}  id="exampleCheck1"  value={result.employee} /><span style={{color:'black',fontWeight:'600',marginLeft:'15px' }}>{result.employee}</span></div></div></div>

                            )
                             } )
                             }
                             </div>
             
               </div>
               <div className="labuttonew" style={sohme}>
    <button type="button" className="labfour" className="btn btn-outline-success float-right"
     style={{ backgroundColor: "green", color: "white" ,padding:'8px', width:'100px',marginRight:'8px'}}
     type="submit"  className ="btn btn-info">Save</button><span>  </span>
		<button type="button"className="btn float-left"
    style={{backgroundColor:" #717171", color:"white",padding:'8px', width:'100px'}}
     type="submit"  onClick={()=> setIsOpen(false)} >Cancel</button>
    </div>
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
                      Cancel
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
                <div className="col-md-12">
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
                        <table class="tasks-table" key={elem.id}>
                          <tr>
                          <td>
                            <span
                              style={{
                                color: "black",
                                textAlign: "justify",
                              }}
                            >
                              {elem.name}
                            </span>
                          </td>

                          <td>
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
                          </td></tr>
                        </table>
                      
                      </div>
                      
                    );
                  })}

 
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
        </div>

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
