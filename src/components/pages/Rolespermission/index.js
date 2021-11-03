import React, { useState, useEffect } from "react";
import "./Rolespermission.css";
import axios from "axios";
import Header from "../Header/Header";
import AddRole from "./addRole";
import { Link, useParams, useHistory } from "react-router-dom";
import Alert from "../../common/Alert";
import { roleLIst } from "../../../redux/actions/roleAction";
import { useSelector, useDispatch } from "react-redux";


const Rolespermission = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [ids, setID] = useState();

  const role = useSelector((store) => store);
  const dispatch = useDispatch();
console.log("role",role.role.userInfo)
console.log("student",student)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

useEffect(() => {
  roleData()

  
},[])

const roleData = () => {
  dispatch(roleLIst());
  setStudent(role.role.userInfo)
}
  const pages = [];
  for (let i = 1; i <= Math.ceil(student.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const handleLoadMoreMethod = () =>{
    setItemPerPage(itemsPerPage +5);
   }
   
   const handleLoadMoreMethoddec = () =>{
     if(itemsPerPage>5){
      setItemPerPage(itemsPerPage -5);
     }
   
   }
  const indexOfLastItem = currentPage * itemsPerPage;
  //  1  X 15 = 15 and 2 X 10 = 30
  const indexOfFistItem = indexOfLastItem - itemsPerPage;
  //   30 -15 = 15 and 15 -15 = 0
    const currentItem = student.slice(indexOfFistItem, indexOfLastItem);

  const handleNewClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleNewClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }
  //  className={currentPage == number ? "active" : null}
  
  useEffect(() => {
    getAllStudent();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchHandler();
    } else {
      roleData();
    }
  }, [searchQuery]);

  const history = useHistory();
  const routeChange = () => {
    let path = `./AddRole`;
    history.push(path);
  };
  const searchHandler = () => {
    let filterDAta = student.filter((data) =>
      data.RoleName.includes(searchQuery)
    );
    if (filterDAta.length > 0) {
      console.log("filterDAta", filterDAta);
      setStudent(filterDAta);
    }
    console.log(filterDAta);
    setSearch(true);
  };
  async function getAllStudent() {
    try {
      const student = await axios.get("http://localhost:3003/posts");
      setStudent(student.data);
    } catch (error) {
      console.log("something is wrong");
    }
  }
  const delAlert = (id) => {
    setModalOpen(true);
    setID(id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3003/posts/${id}`);
    var newstudent = student.filter((item) => {
      return item.id !== id;
    });
    setModalOpen(false);
    setStudent(newstudent);
  };

  return (
    <div >
      <Alert message="delete the Role and Permission" open={modalOpen} onClose={() => setModalOpen(false)} setOpenModal={setModalOpen} handleDelete={(id)=>handleDelete(id)} id={ids}/>
      <Header headerName="Role and Permissions" />
        <div className="main">
          <div style={{ marginTop: "4%" }}>
            <div class="row">
              <div class="col-sm-6" style={{ marginTop: "5px" }}>
                <div class="col-sm-5">
                  <div class="input-group">
                    <input
                      class="form-control  border"
                      type="search"
                      id="example-search-input"
                      placeholder="Search here.."
                      onChange={(value) => setSearchQuery(value.target.value)}
                      style={{
                        backgroundImage:
                          search == false ? "url(images/Search.png)" : "",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right",
                        backgroundOrigin: "content-box",
                        padding: "5px",
                        backgroundColor: "#f1f1f1",
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
                    Filter
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
            <table class="role-header">
              <tr>
                <th>
                  ID <img src="images/Sort.png" alt="logo" />
                </th>
                <th>
                  Role Name <img src="images/Sort.png" alt="logo" />
                </th>
                <th>
                  User Count <img src="images/Sort.png" alt="logo" />
                </th>
                <th>Action</th>
              </tr>
          {currentItem.map((students, i) => {
            return (
                  <tr>
                    <td class="geeks">{i + 1}</td>
                    <td>{students.RoleName}</td>
                    <td>{students.UserCount}</td>
                    <td >
                      <button>
                        {" "}
                        <img src="images/Edit.png" alt="logo" />
                      </button>
                      <button onClick={() => delAlert(students.id)}>
                        <img src="images/Del.png" alt="logo" />
                      </button>
                    </td>
                  </tr>
                
            );
          })}
          </table>
          <nav aria-label="Page navigation example">
          <div className="col-sm-12 col-md-6 col-lg-6">
            
            <div className="divboxnew">
              <span><h6>Showing&nbsp;&nbsp;&nbsp;</h6></span>
              <input
                   value={itemsPerPage}
                   className="payrollInputStylenew"
                 />
                 <div className="load"><button onClick={handleLoadMoreMethod} className="loadmorebuttonone" ><img src="images/up.png" className="loadmoreone" alt="logo" /> </button>
                 <button onClick={handleLoadMoreMethoddec} className="loadmorebuttontwo" ><img src="images/down.png" className="loadmoretwo" alt="logo" /></button></div>
                 <h6 style={{display:"flex"}}>of {student.length}</h6>

            </div>
            </div>
            
          <ul className="pageNumbers">
            <li>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage == pages[0] ? true : false}
              >
                Previous
              </button>
            </li>
            {/* {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn} */}

            <li>
              <button
                onClick={handleNextbtn}
                disabled={currentPage == pages[pages.length - 1] ? true : false}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        </div>
   
    </div>
  );
};

export default Rolespermission;
