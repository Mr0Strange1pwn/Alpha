import React, { useState, useEffect } from "react";
import "./Employee.css";
import { Link, useHistory } from "react-router-dom";
import Header from "../Header/Header";
import Alert from "../../common/Alert";
import {
  empLIst,
  deleteEmployee,
  EMP_SAVE,
  getEmployeeAllDetails,
  getPayroll,
  getJobDetails,
  getEmployes
} from "../../../redux/actions/employeeAction";
import { CSVLink } from "react-csv";
import { useSelector, useDispatch } from "react-redux";
import EmployeeFilter from "./EmployeeFilter";

const Employee = () => {
  const [FilteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [ids, setID] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const emp = useSelector((store) => store.emp.userInfo);
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  useEffect(() => {
    dispatch(empLIst());
    // dispatch(getEmployes())
  }, []);

  const routeChange = () => {
    let path = `./AddPeople`;
    history.push(path);
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchHandler();
    } else {
      setFilteredEmployees([]);
      setSearch(false);
    }
  }, [searchQuery]);

  const delAlert = (id) => {
    setModalOpen(true);
    setID(id);
  };

  const searchHandler = () => {
    let filterDAta = emp.filter((data) => {
      return data.name.includes(searchQuery);
    });

    if (filterDAta.length > 0) {
      setFilteredEmployees(filterDAta);
    }
    setSearch(true);
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(emp.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  //  1  X 15 = 15 and 2 X 10 = 30
  const indexOfFistItem = indexOfLastItem - itemsPerPage;
  //   30 -15 = 15 and 15 -15 = 0
  const currentItem =
    emp.length > 0 ? emp.slice(indexOfFistItem, indexOfLastItem) : [];
  

  const currentData = () => {
    console.log(" dddddddddddddddddddd",currentItem)
  let exportData =  currentItem.map((data) => {
      return {
        ...data,
        designation_name: data.designation_name.designation_name,
        roleId: data.roleId?.roleName,
      };
    });
    return exportData
  };
 
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

  const handleLoadMoreMethod = () => {
    setItemPerPage(itemsPerPage + 5);
  };

  const handleLoadMoreMethoddec = () => {
    if (itemsPerPage > 5) {
      setItemPerPage(itemsPerPage - 5);
    }
  };
  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
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

  const handleDelete = async (id) => {
    dispatch(deleteEmployee(id));
    setModalOpen(false);
  };

  const handleEdit = (employeelist) => {
    dispatch(getEmployeeAllDetails(employeelist.id));
    dispatch({ type: EMP_SAVE, payload: employeelist });
    dispatch(getPayroll(employeelist.id));
    dispatch(getJobDetails(employeelist.id));
    routeChange();
  };

  const addEmployee = () => {
    dispatch({ type: EMP_SAVE, payload: {} });
    routeChange();
  };

  const TableRow = ({ employeelist, i }) => {
    return (
      <tr>
        <td>{i + 1}</td>
        <td>{employeelist.name}</td>
        <td>
          <Link to={`/screenshorts/${employeelist.name}/${employeelist.id}`} className="user-email">
            {employeelist.email}
          </Link>
        </td>
        <td>{employeelist.mobile_number}</td>
        <td>{employeelist.date_of_birth}</td>
        {employeelist.roleId !== null ? (
          <td>{employeelist.roleId.roleName}</td>
        ) : (
          ""
        )}

        <td>
          <button>
            <img
              src="images/Edit.png"
              alt="logo"
              onClick={() => handleEdit(employeelist)}
            />
          </button>
          <button onClick={() => delAlert(employeelist.id)}>
            <img src="images/Del.png" alt="logo" />
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="header">
      <Alert
        message="delete the Employee"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setOpenModal={setModalOpen}
        handleDelete={(id) => handleDelete(id)}
        id={ids}
      />
      <EmployeeFilter
        open={isOpenFilter}
        onClose={() => setIsOpenFilter(false)}
        // data={student}
      />
      <Header headerName="Employee List" />
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
                    //value={searchQuery}
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
            <div class="col-sm-6">
              <div className="pos">
                <button className="btn  float-right" type="submit">
                  <CSVLink
                    data={emp.length > 0 ?  currentData() : []}
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
                  onClick={addEmployee}
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        </div>
        <table class="employee-header">
          <tr>
            <th>
              ID <img src="images/Sort.png" alt="logo" />
            </th>
            <th>
              Name <img src="images/Sort.png" alt="logo" />
            </th>
            <th>
              Email <img src="images/Sort.png" alt="logo" />
            </th>
            <th>Phone No </th>
            <th>DOB</th>
            <th>
              Role <img src="images/Sort.png" alt="logo" />
            </th>
            <th>Action</th>
          </tr>

          {FilteredEmployees.length > 0
            ? FilteredEmployees.map((employeelist, i) => (
                <TableRow employeelist={employeelist} i={i} />
              ))
            : currentItem.map((employeelist, i) => (
                <TableRow employeelist={employeelist} i={i} />
              ))}
        </table>

        <nav aria-label="Page navigation example">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="divboxnew">
              <span>
                <h6>Showing&nbsp;&nbsp;&nbsp;</h6>
              </span>
              <input value={itemsPerPage} onChange={handleLoadMoreMethoddec} className="payrollInputStylenew" />
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
              <h6 style={{ display: "flex" }}>of {emp.length}</h6>
            </div>
          </div>

          <ul className="pageNumbers">
            <li>
              <button
                onClick={handlePrevbtn}
                disabled={currentPage === pages[0] ? true : false}
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

export default Employee;
