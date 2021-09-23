import React, { useState, useEffect } from "react";
import "./Employee.css";
import { Link, useHistory, useParams  } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";

const Employee = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false)

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
    if (window.confirm("Are you sure want to delete this employee?")) {
      handleDelete(id)
    } else {
     
    }
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
    
    // alert("Are u sure want to delete this employee?")
    await axios.delete(`http://localhost:3003/posts/${id}`);
    var newstudent = student.filter((item) => {
      return item.id !== id;
    });
    setStudent(newstudent);
  };

  return (
    <div className="header">
      <Header headerName="Employee List" />
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
                  className="btn btn-outline-success float-right"
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
                  filter
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

        <div class="emp-container">
          <div class="row" style={{marginLeft:"5px"}}>
            <div class="col">
              <p>
                ID &nbsp;
                <img
                  className="filter_image"
                  src="images/Sort.png"
                  alt="logo"
                />
              </p>
            </div>
            <div class="col">
              <p>
                Name &nbsp;
                <img
                  className="filter_image"
                  src="images/Sort.png"
                  alt="logo"
                />
              </p>
            </div>
            <div class="col">
              <p>
                Email &nbsp;
                <img
                  className="filter_image"
                  src="images/Sort.png"
                  alt="logo"
                />
              </p>
            </div>
            <div class="col">
              <p style={{marginLeft:"35%"}}>
               Phone No 
              </p>
            </div>
            <div class="col">
              <p>
               DOB 
              </p>
            </div>
            <div class="col">
              <p>
               Role &nbsp;
                <img
                  className="filter_image"
                  src="images/Sort.png"
                  alt="logo"
                />
              </p>
            </div>
            <div class="col">
              <p>Actions</p>
            </div>
          </div>
        </div>

        {student.map((students, i) => {
          return (
            <div class="empcontainer">
              <div class="row" key={i}>
                <div class="col">
                  <p>{i + 1}</p>
                </div>
                <div class="col">
                  <p>{students.username}</p>
                </div>
                <div class="col">
                  <p style={{color:"#f07238"}}>{students.useremail}</p>
                </div>
                <div class="col">
                  {/* <p>{students.userpassword}</p> */}
                  <p>"8989898989"</p>
                </div>
                <div class="col">
                  {/* <p>{students.userpassword}</p> */}
                  <p>10/01/1990</p>
                </div>
                <div class="col">
                  {/* <p>{students.userpassword}</p> */}
                  <p>Developer</p>
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
      </div>
    </div>
  );
};

export default Employee;
