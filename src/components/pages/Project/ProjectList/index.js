import React, { useState, useEffect } from "react";
import "./ProjectList.css";
import { Link, useHistory, useParams  } from "react-router-dom";
import axios from "axios";
import Header from "./../../Header/Header";
import Alert from "../../../common/Alert"


const ProjectList = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false)
 const [modalOpen, setModalOpen] = useState(false);
 const [startDate, setStartDate] = useState(new Date());
 const [isOpen, setIsOpen] = useState(false);

 const [ids,setID]=useState()
  const history = useHistory();
  const routeChange = () =>{ 
    let path = `./ProjectList`; 
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
      const student = await axios.get("http://localhost:3003/projects");
      setStudent(student.data);
    } catch (error) {
      console.log("something is wrong");
    }
  }

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3003/projects/${id}`);
    var newstudent = student.filter((item) => {
      return item.id !== id;
    });
    setStudent(newstudent);
     setModalOpen(false)
    
  };




  return (
    <div className="header">
      <Alert message="Project" open={modalOpen} onClose={() => setModalOpen(false)} setOpenModal={setModalOpen} handleDelete={(id)=>handleDelete(id)} id={ids}/>
      <Header headerName="Project List" />
           <div className="main">
        <div style={{marginTop:"4%"}}>
          <div class="row">
            <div class="col-sm-6" style={{marginTop: "5px"}}>
              <div class="col-sm-5">
              <div class="input-group">
                <input
                  class="form-control  border"
                  type="search"
                  id="example-search-input"
                  placeholder="Search here.."
                  //value={searchQuery}
                  onChange={(value) => setSearchQuery(value.target.value)}
                  style={{
                   
                    backgroundImage:search==false? "url(images/Search.png)":"",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right",
                    backgroundOrigin:"content-box",
                    padding: "5px",
                   backgroundColor:"#f1f1f1"
                  }}
                />
                </div>
              </div>
            </div>
            <div class="col-sm-6" >
              <div className="pos">
                <button
                  className="btn  float-right"
                  type="submit"
                >
                  <Link to="/">
                    <img
                      className="export_image"
                      src="images/Export.png"
                      alt="logo"
                    />
                  </Link>
                  Export
                </button>
                <button
                  className="btn btn-outline-success float-right"
                  type="submit"
                >
                  <Link to="/">
                    <img
                      className="filter_image"
                      src="images/Filter.png"
                      alt="logo"
                    />
                  </Link>
                  Filter
                </button>
                <button
                  className="btn btn-outline-success float-right"
                  style={{ backgroundColor: "#003366", color: "white" }}
                  type="submit"
                  onClick={routeChange}
                >
                  Add Project
                </button>
              </div>
            </div>
          </div>
        </div>
        <table class="project-headers">
            <tr>
                <th>S No  <img  src="images/Sort.png"  alt="logo" /></th>
                <th>Project Name <img  src="images/Sort.png"  alt="logo" /></th>
                <th>Project Type <img  src="images/Sort.png"  alt="logo" /></th>
                <th>Assigned To </th>
                <th>Added On</th>
                <th>Action</th>
            </tr>

        {student.map((students, i) => {
          return (
            <tr>
                <td class="geeks">{i + 1}</td>
                <td>{students.projectname}</td>
                <td><a href="#" class="user-email">{students.projecttype}</a></td>
                <td>{students.assignedto}</td>
                <td>{students.addedOn}</td>
                {/* <td>Developer</td> */}
                <td><button> <img
                      src="images/Edit.png"
                      alt="logo"
                    /></button><button   onClick={() => delAlert(students.id)}><img src="images/Del.png" alt="logo" /></button>
                
                </td>
            </tr>

          );
        })}
       </table>
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
      </div>

    </div>
  );
};

export default ProjectList;

