import React, { useState, useEffect ,useContext } from "react";
import "./Documents.css";
import { Link, useHistory, useParams  } from "react-router-dom";
import axios from "axios";
import Header from "../../Header/Header";
import AlertModel from "../../../common/AlertModel.js"
import {Multistepcontext} from '../../../../StepContext';


const Documents = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false)
  const [changenew, setChangenew] = useState(false)
 const [modalOpen, setModalOpen] = useState(false);
 const [people,setPeople] = useState([]);
  const [change, setChange] = useState(true);
  const [name , setName] = useState("");
  const [file , setFile] = useState("");
 const [ids,setID]=useState()
  const history = useHistory();
  const routeChange = () =>{ 
    let path = `./Registration`; 
    history.push(path);
  }
  useEffect(() => {
    getAllStudent();
  }, []);


  const {userData ,backpackClick,setUserData ,setFinalData ,setCurrentStep} = useContext(Multistepcontext);

  const hideme = {
    display: 'flex'
   }

    if(changenew)
   {
    hideme.display ='none'
    }

  const showme = { 
    opacity:'0.1',
  }

      if(changenew)
     {
       showme.opacity ='0.8'
      }
  useEffect(() => {
    if (searchQuery.length > 0) {
      searchHandler()
    } else {
      getAllStudent()
      setSearch(false)
    }
  }, [searchQuery])

  const delAlert=(id)=> {
    setModalOpen(true)
      setID(id)
  }


  async function getStudent() {
    try {
      const student = await axios.get("http://localhost:3003/comments");
      setStudent(student.data);
    } catch (error) {
      console.log("something is wrong");
    }
  }

  useEffect(() => {
    getStudent();
  }, []);

  
      console.warn("newresult",people);
  
  async function getName(){
        try{
          const people = await axios.get("http://localhost:3003/comments")
          // console.log(student.data)
          setPeople(people.data);
        }catch (error) {
          console.log("something is wrong")
        }
     }
useEffect(async ()=>{
      getName();
        },[])

  const handleDelete = async (id) => {
          await axios.delete(`http://localhost:3003/comments/${id}`);
          var newemployee = people.filter((item) => {
            return item.id !== id;
          });
          setPeople(newemployee);
           setModalOpen(false)
          
        };
        async function addProducts(description)
        {
         
          const formData = new FormData();
           formData.append('description',description);
           formData.append('description',description);
        
           let result = await fetch("http://localhost:3003/comments",{
             method:'POST',
             body:formData
           });
           alert("Data has been send")
        
        }
  const searchHandler = () => {
    let filterDAta = student.filter((data) =>
  //  console.log("data",data)
       data.useremail.includes(searchQuery)
    );
    if (filterDAta.length > 0) {
      console.log("filterDAta",filterDAta)
      setStudent(filterDAta);
    }
    setSearch(true)
  };
  async function getAllStudent() {
    try {
      const student = await axios.get("http://localhost:3003/posts");
      setStudent(student.data);
    } catch (error) {
      console.log("something is wrong");
    }
  }

  // const handleDelete = async (id) => {
   
   
  //   await axios.delete(`http://localhost:3003/posts/${id}`);
  //   var newstudent = student.filter((item) => {
  //     return item.id !== id;
  //   });
  //   setStudent(newstudent);
  //    setModalOpen(false)
    
  // };

  return (
    <div className="header">
      {/* <Header headerName="Registration" /> */}
      {modalOpen ? <AlertModel setOpenModal={setModalOpen} handleDelete={(id)=>handleDelete(id)} id={ids} />:      <div className="main">
        <div style={{marginTop:"4%"}} >
          <div class="row ">
            <div class="col-sm-6" >
            
            </div>
            <div class="col-sm-6" >
              <div className="pos">
                <button
                  className="btn btn-outline-success float-right"
                  style={{ backgroundColor: "#003366", color: "white" }}
                  type="submit"
                //   onClick={routeChange}
                onClick={() =>setChangenew(!changenew)}
                >
                  Upload Files
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-container" >
          <div class="row" style={{marginLeft:"5px"}}>
            
            <div class="col">
              <p>
              File Name
              </p>
            </div>
            <div class="col">
              <p>
              File
              </p>
            </div>
           
            <div class="col">
              <p>Actions</p>
            </div>
          </div>
        </div>

        {/* <div className="card" style={hideme}>
		<h4>Upload File</h4>
		<div className="card2">
			<br/><div className="card3">
			<img src=""  className="graphic" src="images/upload-graphics.png" alt="logo" width="20px" height="20px" />
			<label id="l1" className="labone">Drag and drop your file here</label>
			<label id="l2" className="labtwo">or</label><br/>
			<input type="text" value="Browse file"  className="labthree" id="myfile" name="" /></div>
		</div>
		<div className="labutton">
    <button type="button" className="labfour" className="btn btn-outline-success float-right"
     style={{ backgroundColor: "#003366", color: "white" }}
     type="submit" onClick={() =>{addProducts();setChangenew(!changenew)}} className ="btn btn-info">Upload</button><span>  </span>
		<button type="button" className="btn btn-outline-success float-right"
     style={{ backgroundColor: "#003366", color: "white" }}
     type="submit" className="labfive" onClick={() =>setChangenew(!changenew)} className ="btn btn-info">Cancel</button>
    </div>
	</div> */}
        {student.map((items, i) => {
          return (
            <div class="doccontainer">
              <div class="row role-row" key={i}>
                <div class="col">
                  <p>{items.id}</p>
                </div>
                <div class="col">
                  <p style={{color:"#f07238",textDecoration:"underline"}}>{items.description}</p>
                </div>
                
              
                <div class="col" >
                  <button
                    className="dustbin_image"
                    // onClick={() => delAlert(students.id)}
                    onClick={() => delAlert(items.id)}
                  >
                    <img src="images/Del.png" alt="logo" />
                  </button>
                  <Link to={`/view/${items.id}`}>
                    <img
                      className="dustbin_image"
                      src="images/Edit.png"
                      alt="logo"
                    />
                  </Link>
                </div>
              </div>
             
            </div>
          );
        })}
 <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
            <button className="btn  float-left" type="submit">
              Save
            </button>
            <button onClick={()=>{setCurrentStep(3);backpackClick(3)}} className="btn  float-left" type="submit">
             Next
            </button>
          </div>
        </div>
<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-end">
    <li class="page-item disabled">
      <a class="page-link text-decoration-underline border-0" href="#" tabindex="-1" aria-disabled="true">Previous</a>
    </li>
    <li class="page-item"><a class="page-link  border-0" href="#">1</a></li>
    <li class="page-item"><a class="page-link  border-0" href="#">2</a></li>
    <li class="page-item"><a class="page-link  border-0" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link text-decoration-underline border-0" href="#">Next</a>
    </li>
  </ul>
</nav>
      </div>}

    </div>
  );
};

export default Documents;
