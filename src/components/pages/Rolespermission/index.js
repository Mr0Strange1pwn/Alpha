import React, { useState, useEffect } from "react";
import "./Rolespermission.css";
import axios from "axios";
import Header from "../Header/Header";
import AddRole from "./addRole";
import { Link ,useParams, useHistory } from "react-router-dom";

const Rolespermission = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false)
  
  useEffect(() => {
    getAllStudent();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchHandler()
    } else {
      getAllStudent()
    }
  }, [searchQuery])

  const history = useHistory();
  const routeChange = () =>{ 
    let path = `./AddRole`; 
    history.push(path);
  }
  const searchHandler = () => {
    let filterDAta = student.filter((data) =>
       data.useremail.includes(searchQuery)
    );
    if (filterDAta.length > 0) {
      console.log("filterDAta",filterDAta)
      setStudent(filterDAta);
    }
    console.log(filterDAta)
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
  const delAlert=(id)=> {
    if (window.confirm("Are you sure want to delete this employee?")) {
      handleDelete(id)
    } else {
     
    }
  }

  const handleDelete = async (id) => {
    
    await axios.delete(`http://localhost:3003/posts/${id}`);
    var newstudent = student.filter((item) => {
      return item.id !== id;
    });
    setStudent(newstudent);
  };

  return (
    <div className="role-header">
      <Header headerName="Role and Permissions" />
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
            <div class="col-sm-6">
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
                  Add Role
                </button>
              </div>
            </div>
          </div>
        </div>
     

        <div class="role-container">
          <div class="row">
            <div class="col">
              <p>
                ID &nbsp;{" "}
                <img
                  className="filter_image"
                  src="images/Sort.png"
                  alt="logo"
                />
              </p>
            </div>
            <div class="col">
              <p>
                Role Name &nbsp;
                <img
                  className="filter_image"
                  src="images/Sort.png"
                  alt="logo"
                />
              </p>
            </div>
            <div class="col">
              <p>
                User Count &nbsp;
                <img
                  className="filter_image"
                  src="images/Sort.png"
                  alt="logo"
                />
              </p>
            </div>
            <div class="col">
              <p style={{marginLeft: "30%"}}>Actions</p>
            </div>
          </div>
        </div>
        {student.map((students, i) => {
          return (
            <div class="newcontainer">
              <div className="row role-row" key={i}>
                <div class="col">
                  <p style={{marginRight:"20%"}}>{i + 1}</p>
                </div>
                <div class="col">
                  <p>{students.username}</p>
                </div>
                <div class="col">
                  <p>{students.userpassword}</p>
                </div>
                <div class="col " >
                  <div>
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

export default Rolespermission;
