import React, { useState, useEffect } from "react";
import "./Documents.css";
import { Link, useHistory, useParams  } from "react-router-dom";
import axios from "axios";
import Header from "../../Header/Header";
import AlertModel from "../../../common/AlertModel.js"

const Documents = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false)
 const [modalOpen, setModalOpen] = useState(false);
 const [ids,setID]=useState()
  const history = useHistory();
  const routeChange = () =>{ 
    let path = `./Registration`; 
    history.push(path);
  }
  useEffect(() => {
    getAllStudent();
  }, []);

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
      <Header headerName="Registration" />
      {modalOpen ? <AlertModel setOpenModal={setModalOpen} handleDelete={(id)=>handleDelete(id)} id={ids}/>:      <div className="main">
        <div style={{marginTop:"4%"}}>
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
                >
                  Upload Files
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="doc-container">
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

        {student.map((students, i) => {
          return (
            <div class="doccontainer">
              <div class="row role-row" key={i}>
                <div class="col">
                  <p>{students.username}</p>
                </div>
                <div class="col">
                  <p style={{color:"#f07238",textDecoration:"underline"}}>{students.link}</p>
                </div>
                
              
                <div class="col" >
                  <button
                    className="dustbin_image"
                    onClick={() => delAlert(students.id)}
                  >
                    <img src="images/Del.png" alt="logo" />
                  </button>
                  <Link to={`/view/${students.id}`}>
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
