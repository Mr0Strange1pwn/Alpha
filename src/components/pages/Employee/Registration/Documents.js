import React, { useState, useEffect, useContext } from "react";
import "./Documents.css";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../Header/Header";
import AlertModel from "../../../common/AlertModel.js";
import { Multistepcontext } from "../../../../StepContext";
import Modal from "./Modal";
import ImgUpload from "./../../../NewImages/upload-graphics.png";

const Documents = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [changenew, setChangenew] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [people, setPeople] = useState([]);
  const [change, setChange] = useState(true);
  const [isOpen , setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [ids, setID] = useState();
  const history = useHistory();
  const routeChange = () => {
    let path = `./Registration`;
    history.push(path);
  };
  useEffect(() => {
    getAllStudent();
  }, []);

  const { userData, backpackClick, setUserData, setFinalData, setCurrentStep } =
    useContext(Multistepcontext);

  const hideme = {
    display: "flex",
  };

  if (changenew) {
    hideme.display = "none";
  }

  const showme = {
    opacity: "0.1",
  };

  if (changenew) {
    showme.opacity = "0.8";
  }


  const delAlert=(id)=> {
    setModalOpen(true)
      setID(id)
  }

  async function getAllStudent() {
    try {
      const student = await axios.get("http://localhost:3003/posts");
      setStudent(student.data);
    } catch (error) {
      console.log("something is wrong");
    }
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3003/posts/${id}`);
    var newstudent = student.filter((item) => {
      return item.id !== id;
    });
    setStudent(newstudent);
     setModalOpen(false)
    
  };




  return (
    <div className="header">
      
      <Modal open={isOpen} onClose={()=> setIsOpen(false)}>
         <div className="cardnew"><h4>Upload File</h4></div>
             <div className="card">
			<div className="card3">
			<img src={ImgUpload} alt="logo" width="300px" height="220px" />
			<div className="labone"><label id="l1" >Drag and drop your file here</label></div>
			<div className="labtwo"><label id="l2" >or</label><br/></div>
		  <div className="givespace" ><button className="labthree">Browse File</button></div>
             </div>
             </div>
		<div className="Instyle" ><label id="l2" >File Name</label><br/><input type="text" placeholder="Enter File Name" /></div>
		<div className="labutton">
    <button type="button" className="labfour" className="btn btn-outline-success float-right"
     style={{ backgroundColor: "#003366", color: "white" }}
     type="submit"  className ="btn btn-info">Upload</button><span>  </span>
		<button type="button"className="btn float-left"
    style={{backgroundColor:" #717171", color:"white"}}
     type="submit"  onClick={()=> setIsOpen(false)} >Cancel</button>
    </div>
	
         </Modal>
      {modalOpen ? (
        <AlertModel
          setOpenModal={setModalOpen}
          handleDelete={(id) => handleDelete(id)}
          id={ids}
        />
      ) : (
        <div className="main">
          <div style={{ marginTop: "4%" }}>
            <div class="row ">
              <div class="col-sm-6"></div>
              <div class="col-sm-6">
                <div className="pos">
                  <button
                    className="btn btn-outline-success float-right"
                    style={{ backgroundColor: "#003366", color: "white" }}
                    type="submit"
                    //   onClick={routeChange}
                    // onClick={() => setChangenew(!changenew)}
                    onClick={()=>setIsOpen(true)}
                  >
                    Upload Files
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <div class="doc-container"> */}
            {/* <div class="row" >
              <div class="col">
                <p>File Name</p>
              </div>
              <div class="col">
                <p>File</p>
              </div>

              <div class="col">
                <p style={{ textAlignLast:" right",paddingRight:" 10%"}}>Actions</p>
              </div>
            </div> */}
          {/* </div> */}
          <table class="document-header">
       
       
       <tr>
           <th>File Name </th>
           <th>File </th>
           <th>Action</th>
       </tr>

          {student.map((items, i) => {
            return (
              // <div class="doccontainer">
              //   <div class="row role-row" key={i}>
              //     <div class="col">
              //       <p>File-{items.id}.pdf</p>
              //     </div>
              //     <div class="col">
              //       <p
              //         style={{ color: "#f07238", textDecoration: "underline" }}
              //       >
              //         Link
              //       </p>
              //     </div>

              //     <div class="col">
              //       <button
              //         className="dustbin_image"
              //         onClick={() => delAlert(items.id)}
              //       >
              //         <img src="images/Del.png" alt="logo" />
              //       </button>
              //       <Link to={`/view/${items.id}`}>
              //         <img
              //           className="dustbin_image"
              //           src="images/Edit.png"
              //           alt="logo"
              //         />
              //       </Link>
              //     </div>
              //   </div>
              // </div>
              <tr>
                <td class="geeks">File-{items.id}.pdf</td>
                <td> Link</td>
                <td><button> <img
                      src="images/Edit.png"
                      alt="logo"
                    /></button><button  onClick={() => delAlert(items.id)}><img src="images/Del.png" alt="logo" /></button>
                
                </td>
            </tr>
            );
          })}
          </table>
          <div className="d-grid gap-2 d-md-block">
            <div className="addrole_Button">
              <button className="btn  float-left" type="submit" onClick={()=>{setCurrentStep(1);backpackClick(1)}}>
               Back
              </button>
              <button
                onClick={() => {
                  setCurrentStep(3);
                  backpackClick(3);
                }}
                className="btn  float-left"
                type="submit"
                style={{backgroundColor:"#25344b"}}
              >
                Next
              </button>
            </div>
          </div>
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-end">
              <li class="page-item disabled">
                <a
                  class="page-link text-decoration-underline border-0"
                  href="#"
                  tabindex="-1"
                  aria-disabled="true"
                >
                  Previous
                </a>
              </li>
              <li class="page-item">
                <a class="page-link  border-0" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link  border-0" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link  border-0" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a
                  class="page-link text-decoration-underline border-0"
                  href="#"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Documents;
