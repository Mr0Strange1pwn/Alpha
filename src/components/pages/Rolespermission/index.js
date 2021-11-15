import React, { useState, useEffect } from "react";
import "./Rolespermission.css";
import axios from "axios";
import Header from "../Header/Header";
import AddRole from "./addRole";
import { Link, useParams, useHistory } from "react-router-dom";
import Alert from "../../common/Alert";
import { roleLIst } from "../../../redux/actions/roleAction";
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import Modal from "./../../common/Model";

const Rolespermission = () => {
  const { id } = useParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [ids, setID] = useState();
  const student = useSelector((store) => store.role.userInfo); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [filteredData, setFilteredData] = useState([])
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    roleData()
  }, [])

  const roleData = () => {
    dispatch(roleLIst());

  }

 const applyshortRoleName = ()=>{
   if(searchQuery.length > 0 ){
    let stu =  filteredData
    console.log("stu ",stu)
  
   stu.sort((a, b) => (a.RoleName.toLowerCase() > b.RoleName.toLowerCase()) ? 1 : -1)
   console.log("stu filtered ",stu)
   }else{
    let stu =  student
    console.log("stu ",stu)
  
   stu.sort((a, b) => (a.RoleName.toLowerCase() > b.RoleName.toLowerCase()) ? -1 : 1)
   console.log("stu filtered ",stu)
   }
 
 }
 
 const applyshortUserCount = ()=>{
 if(searchQuery.length > 0 ){
  let stu =  filteredData
  console.log("stu ",stu)

  stu.sort((a, b) => (a.UserCount > b.UserCount) ? 1 : -1)
 console.log("stu filtered ",stu)
 }else{
  let stu =  student
  console.log("stu ",stu)

  stu.sort((a, b) => (a.UserCount > b.UserCount) ? 1 : -1)
 console.log("stu filtered ",stu)
 }
}

  const pages = [];
  for (let i = 1; i <= Math.ceil(student.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const handleLoadMoreMethod = () => {
    setItemPerPage(itemsPerPage + 5);
  }

  const handleLoadMoreMethoddec = () => {
    if (itemsPerPage > 5) {
      setItemPerPage(itemsPerPage - 5);
    }

  }
  const indexOfLastItem = currentPage * itemsPerPage;
  //  1  X 15 = 15 and 2 X 10 = 30
  const indexOfFistItem = indexOfLastItem - itemsPerPage;
  //   30 -15 = 15 and 15 -15 = 0
  let currentItem = student.length > 0 ? student.slice(indexOfFistItem, indexOfLastItem) : []

  useEffect(() => {
    if (filteredData.length > 0) {
      currentItem = filteredData.slice(indexOfFistItem, indexOfLastItem)
    } else {
      if (student.length > 0) {
        currentItem = student.slice(indexOfFistItem, indexOfLastItem)
      }
    }
  }, [filteredData])

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
      data.RoleName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filterDAta.length > 0) {
      console.log("filterDAta", filterDAta);
      // setStudent(filterDAta);
      setFilteredData(filterDAta)
    }
    console.log(filterDAta);
    setSearch(true);
  };
  // async function getAllStudent() {
  //   try {
  //     const student = await axios.get("http://localhost:3003/posts");
  //     setStudent(student.data);
  //   } catch (error) {
  //     console.log("something is wrong");
  //   }
  // }
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

    // setStudent(newstudent);
  };


  return (
    <div >
      <Alert message="delete the Role and Permission" open={modalOpen} onClose={() => setModalOpen(false)} setOpenModal={setModalOpen} handleDelete={(id) => handleDelete(id)} id={ids} />
      <Modal open={isOpenFilter} onClose={() => setIsOpenFilter(false)}>
        <div style={{ marginTop: "4%" }}>
          <div style={{ textAlignLast: "center" }}>
            <h4 style={{ fontWeight: "700" }}>Edit Designation</h4>
          </div>
          <div style={{ margin: "auto", width: "70%" }}>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Role Name
              </label>

              <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="manager"
              >
                <option selected>Choose Role Name</option>
                <option value="1">Manager</option>
                <option value="2">Assistant Manager</option>
                <option value="3">Developer</option>
                <option value="2">Tester</option>
                <option value="3">Designer</option>
              </select>
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Screenshot Recurrence(in Min)
              </label>
              <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="screenshot"
                // value={details.screenshot}
                // onChange={e => handleValueChange(e)}
              >
                <option selected>Choose ScreenShot</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>

            <div
              className="modalButton"
              style={{ marginTop: "5%", marginBottom: "5%" }}
            >
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#003366", color: "white" }}
                type="submit"
              >
                Save
              </button>
              <span> </span>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: " #717171", color: "white" }}
                type="submit"
                onClick={() => setIsOpenFilter(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
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
                  className="btn float-right"
                  type="submit"
                  style={{textDecoration:"none!important"}}
                >
                <CSVLink data={student.length > 0 ? currentItem: []} filename={"my-saved.csv"}  className="btn">Export</CSVLink>
                </button>
                <button
                  className="btn btn-outline-success float-right"
                  type="submit"
                  onClick={() =>setIsOpenFilter(!isOpenFilter)}
                >
                  <Link >
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

        <table class="role-header"  id="table-to-xls">
          <tr>
            <th>
              ID <img src="images/Sort.png" alt="logo" />
            </th>
            <th>
              Role Name <img onClick={applyshortRoleName} src="images/Sort.png" alt="logo" />
            </th>
            <th>
              User Count <img onClick={applyshortUserCount} src="images/Sort.png" alt="logo" />
            </th>
            <th>Action</th>
          </tr>
          {searchQuery.length > 0 ? filteredData.map((students, i) => {
            return (
              <tr>
                <td class="geeks">{students.Id}</td>
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
          }) : currentItem.map((students, i) => {
            return (
              <tr>
                <td class="geeks">{students.Id}</td>
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
              <h6 style={{ display: "flex" }}>of {student.length}</h6>

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
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}

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
