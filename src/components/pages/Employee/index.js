import React, { useState, useEffect } from "react";
import "./Employee.css";
import { Link, useHistory, useParams  } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import AlertModel from "../../common/AlertModel.js"

const Employee = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false)
 const [modalOpen, setModalOpen] = useState(false);
 const [ids,setID]=useState()
  const history = useHistory();
  const routeChange = () =>{ 
    let path = `./AddPeople`; 
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
      <Header headerName="Employee List" />
      {modalOpen ? <AlertModel setOpenModal={setModalOpen} handleDelete={(id)=>handleDelete(id)} id={ids}/>:      <div className="main">
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
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>

        <div >
        <table class="employee-header">
            <tr>
                <th>ID  <img  src="images/Sort.png"  alt="logo" /></th>
                <th>Name <img  src="images/Sort.png"  alt="logo" /></th>
                <th>Email <img  src="images/Sort.png"  alt="logo" /></th>
                <th>Phone No </th>
                <th>DOB</th>
                <th>Role <img  src="images/Sort.png"  alt="logo" /></th>
                <th>Action</th>
            </tr>
        </table>
        </div>

        {student.map((students, i) => {
          return (
<div>
<table class="employee-detail">
            <tr>
                <td class="geeks">{i + 1}</td>
                <td>{students.username}</td>
                <td><a href="#" class="user-email">{students.useremail}</a></td>
                <td>8989898989</td>
                <td>10/01/1990</td>
                <td>Developer</td>
                <td><button> <img
                      src="images/Edit.png"
                      alt="logo"
                    /></button><button   onClick={() => delAlert(students.id)}><img src="images/Del.png" alt="logo" /></button>
                
                </td>
            </tr></table>
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

export default Employee;
