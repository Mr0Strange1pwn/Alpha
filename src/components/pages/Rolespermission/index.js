import React, { useState, useEffect } from "react";
import "./Rolespermission.css";
import Header from "../Header/Header";
import { useHistory } from "react-router-dom";
import Alert from "../../common/Alert";
import {
  roleLIst,
  deleteRole,
  getRoleById,
} from "../../../redux/actions/roleAction";
import { useSelector, useDispatch } from "react-redux";
import { CSVLink } from "react-csv";
import RoleFilter from "./RoleFilter";

const Rolespermission = () => {
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
  const [filteredData, setFilteredData] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const routeChange = () => {
    let path = `./AddRole`;
    history.push(path);
  };

  useEffect(() => {
    roleData();
  }, []);

  const roleData = () => {
    dispatch(roleLIst());
  };

  // code for delete
  const delAlert = (id) => {
    setModalOpen(true);
    setID(id);
  };

  const handleDelete = (id) => {
    dispatch(deleteRole(id));
    setModalOpen(false);
  };

  const editRole = (id) => {
    dispatch(getRoleById(id));
    routeChange();
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchHandler();
    } else {
      roleData();
    }
  }, [searchQuery]);

  const searchHandler = () => {
    let filterDAta = student.filter((data) =>
      data.roleName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filterDAta.length > 0) {
      setFilteredData(filterDAta);
    }
    setSearch(true);
  };

  const applyshortRoleName = () => {
    if (searchQuery.length > 0) {
      let stu = filteredData;
      stu.sort((a, b) =>
        a.RoleName.toLowerCase() > b.RoleName.toLowerCase() ? 1 : -1
      );
    } else {
      let stu = student;
      stu.sort((a, b) =>
        a.RoleName.toLowerCase() > b.RoleName.toLowerCase() ? -1 : 1
      );
    }
  };

  const applyshortUserCount = () => {
    if (searchQuery.length > 0) {
      let stu = filteredData;
      stu.sort((a, b) => (a.UserCount > b.UserCount ? 1 : -1));
    } else {
      let stu = student;
      stu.sort((a, b) => (a.UserCount > b.UserCount ? 1 : -1));
    }
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(student.length / itemsPerPage); i++) {
    pages.push(i);
  }
  const handleLoadMoreMethod = () => {
    setItemPerPage(itemsPerPage + 5);
  };

  const handleLoadMoreMethoddec = () => {
    if (itemsPerPage > 5) {
      setItemPerPage(itemsPerPage - 5);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  //  1  X 15 = 15 and 2 X 10 = 30
  const indexOfFistItem = indexOfLastItem - itemsPerPage;
  //   30 -15 = 15 and 15 -15 = 0
  let currentItem =
    student.length > 0 ? student.slice(indexOfFistItem, indexOfLastItem) : [];

  useEffect(() => {
    if (filteredData.length > 0) {
      currentItem = filteredData.slice(indexOfFistItem, indexOfLastItem);
    } else {
      if (student.length > 0) {
        currentItem = student.slice(indexOfFistItem, indexOfLastItem);
      }
    }
  }, [filteredData]);

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
          className={currentPage === number ? "active" : null}
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

  return (
    <div>
      <Alert
        message="delete the Role and Permission"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setOpenModal={setModalOpen}
        handleDelete={(id) => handleDelete(id)}
        id={ids}
      />
      <RoleFilter
        open={isOpenFilter}
        onClose={() => setIsOpenFilter(false)}
        data={student}
      />
      <Header headerName="Role and Permissions" />
      <div className="main">
        <div style={{ marginTop: "4%" }}>
          <div className="row">
            <div className="col-sm-6" style={{ marginTop: "5px" }}>
              <div className="col-sm-5">
                <div className="input-group">
                  <input
                    className="form-control  border"
                    type="search"
                    id="example-search-input"
                    placeholder="Search here.."
                    onChange={(value) => setSearchQuery(value.target.value)}
                    style={{
                      backgroundImage:
                        search === false ? "url(images/Search.png)" : "",
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
            <div className="col-sm-6">
              <div className="pos">
                <button
                  className="btn float-right"
                  type="submit"
                  style={{ textDecoration: "none!important" }}
                >
                  <CSVLink
                    data={student.length > 0 ? currentItem : []}
                    filename={"my-saved.csv"}
                    className="btn"
                  >
                    Export
                  </CSVLink>
                </button>
                <button
                  className="btn btn-outline-success float-right"
                  type="submit"
                  onClick={() => setIsOpenFilter(!isOpenFilter)}
                >
                  <img
                    className="filter_image"
                    src="images/Filter.png"
                    alt="logo"
                  />
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

        <table className="role-header" id="table-to-xls">
          <tr>
            {/* <th>
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />{" "}
              Select ALL
            </th> */}
            <th>
              ID <img src="images/Sort.png" alt="logo" />
            </th>
            <th>
              Role Name{" "}
              <img
                onClick={applyshortRoleName}
                src="images/Sort.png"
                alt="logo"
              />
            </th>
            <th>
              User Count{" "}
              <img
                onClick={applyshortUserCount}
                src="images/Sort.png"
                alt="logo"
              />
            </th>
            <th>Action</th>
          </tr>
          {searchQuery.length > 0
            ? filteredData.map((students, i) => {
                return (
                  <tr>
                    <td key={students.id}>{students.id}</td>
                    <td>{students.roleName}</td>
                    <td>{students.user_count}</td>
                    <td>
                      <button onClick={() => editRole(students.id)}>
                        <img src="images/Edit.png" alt="logo" />
                      </button>
                      <button onClick={() => delAlert(students.id)}>
                        <img src="images/Del.png" alt="logo" />
                      </button>
                    </td>
                  </tr>
                );
              })
            : currentItem.map((students, i) => {
                return (
                  <tr>
                    <td>
                      {/* <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      /> */}
                    </td>
                    <td>{i + 1}</td>
                    <td>{students.roleName}</td>
                    <td>{students.user_count}</td>
                    <td>
                      <button onClick={() => editRole(students.id)}>
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
              <span>
                <h6>Showing&nbsp;&nbsp;&nbsp;</h6>
              </span>
              <input
                value={itemsPerPage}
                onChange={handleLoadMoreMethoddec}
                className="payrollInputStylenew"
              />
              <div className="load">
                <button
                  onClick={handleLoadMoreMethod}
                  className="loadmorebuttonone"
                >
                  <img src="images/up.png" className="loadmoreone" alt="logo" />{" "}
                </button>
                <button
                  onClick={handleLoadMoreMethoddec}
                  className="loadmorebuttontwo"
                >
                  <img
                    src="images/down.png"
                    className="loadmoretwo"
                    alt="logo"
                  />
                </button>
              </div>
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
                disabled={
                  currentPage === pages[pages.length - 1] ? true : false
                }
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
