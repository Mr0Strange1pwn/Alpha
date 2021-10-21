import React, { useState, useEffect } from "react";
import "./ProjectList.css";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Header from "./../../Header/Header";
import Alert from "../../../common/Alert";
import Modal from "../../../common/Model";
import DatePicker from "react-datepicker";

const ExampleCustomInput = ({ value, onClick }) => {
  return (
    <div>
      <input
        type="text"
        id="lname"
        className="example-custom-input"
        onClick={(e) => onClick(e.preventDefault())}
        value={value}
        style={{
          backgroundImage: "url(images/calendar.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          backgroundOrigin: "content-box",
          padding: "10px",
        }}
      />
    </div>
  );
};

const ProjectList = () => {
  const { id } = useParams();
  const [student, setStudent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const [ids, setID] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 1; i <= Math.ceil(student.length / itemsPerPage); i++) {
    pages.push(i);
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


  const history = useHistory();
  const routeChange = () => {
    let path = `./ProjectList`;
    history.push(path);
  };
  useEffect(() => {
    getAllStudent();
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      searchHandler();
    } else {
      getAllStudent();
      setSearch(false);
    }
  }, [searchQuery]);

  const delAlert = (id) => {
    setModalOpen(true);
    setID(id);
  };

  const searchHandler = () => {
    let filterDAta = student.filter((data) =>
      //  console.log("data",data)
      data.projectname.includes(searchQuery)
    );
    if (filterDAta.length > 0) {
      console.log("filterDAta", filterDAta);
      setStudent(filterDAta);
    }
    setSearch(true);
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
    setModalOpen(false);
  };

  const editItems = (id, e) => {
    e.preventDefault();
    setIsOpenEdit(true);
    // let newEditItem = data.find((elem) => {
    //   return elem.id === id;
    // });
    // console.log(newEditItem);
    // setItem(newEditItem);
    // setIsEditItem(id);
    // setToggleSubmit(false);
  };

  return (
    <div className="header">
      <Alert
        message="Project"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setOpenModal={setModalOpen}
        handleDelete={(id) => handleDelete(id)}
        id={ids}
      />
      <Header headerName="Project List" />

      <Modal open={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
        <div style={{ marginTop: "5%" }}>
          <div style={{ textAlignLast: "center" }}>
            <h4 style={{ fontWeight: "700" }}>Edit Project</h4>
          </div>
          <div style={{ margin: "auto", width: "70%" }}>
            <div className="row">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Project Name
              </label>
              <input
                type="text"
                id="fname"
                name="name"
                placeholder="Enter Name"
                // value={item.name}
                // onChange={(e) => handleChange(e)}
                // onChange={(e) => setInputData(e.target.value)}
              />
            </div>
            <div className="row">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Project Type
              </label>

              <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="status"
                // value={item.status}
                // onChange={e => handleChange(e)}
              >
                <option selected>Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="row">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Assigned To
              </label>
              <input
                type="text"
                id="fname"
                name="amount"
                placeholder="Assignee name"
                // value={item.amount}
                // onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="row">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Assigned on
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                customInput={<ExampleCustomInput />}
              />
            </div>
            <div
              className="modalButton"
              style={{ marginTop: "5%", marginBottom: "10%" }}
            >
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: "#003366", color: "white" }}
                type="submit"
                // onClick={() => handleEdit()}
              >
                Save
              </button>
              <span> </span>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: " #717171", color: "white" }}
                type="submit"
                onClick={() => setIsOpenEdit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
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
                <button className="btn  float-right" type="submit">
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
                  Create Project
                </button>
              </div>
            </div>
          </div>
        </div>
        <table class="project-headers">
          <tr>
            <th>
              S No <img src="images/Sort.png" alt="logo" />
            </th>
            <th>
              Project Name <img src="images/Sort.png" alt="logo" />
            </th>
            <th>
              Project Type <img src="images/Sort.png" alt="logo" />
            </th>
            <th>Assigned To </th>
            <th>Added On</th>
            <th>Action</th>
          </tr>

          {currentItem.map((students, i) => {
            return (
              <tr>
                <td class="geeks">{i + 1}</td>
                <td>{students.projectname}</td>
                <td>
                  <a href="#" class="user-email">
                    {students.projecttype}
                  </a>
                </td>
                <td>{students.assignedto}</td>
                <td>{students.addedOn}</td>
                {/* <td>Developer</td> */}
                <td>
                  <button
                    // onClick={(e) => {
                    //   editItems(students.id, e);
                    // }}
                  >
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

export default ProjectList;
