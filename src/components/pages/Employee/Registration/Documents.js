import React, { useState, useEffect, useContext } from "react";
import "./Documents.css";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../Header/Header";
import { Multistepcontext } from "../../../../StepContext";
import Modal from "../../../common/Model";
import Alert from "../../../common/Alert";
import { useSelector, useDispatch } from "react-redux";
import {
  uploadDocument,
  getDocumentsById,
  deleteDocuments,
} from "../../../../redux/actions/employeeAction";

const Documents = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState(false);
  const [changenew, setChangenew] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [people, setPeople] = useState([]);
  const [change, setChange] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [ids, setID] = useState();
  const history = useHistory();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemPerPage] = useState(5);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  const { designations, roles, employeeInfo, employeeDocuments } = useSelector(
    (store) => store.emp
  );

  const changeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file.name) {
      let formData = new FormData();
      formData.append("user_profile_id", employeeInfo.id);
      formData.append("document_file", file, file.name);
      formData.append("name", file.name);
      for (var pair of formData.entries()) {
      }
      dispatch(uploadDocument(formData));
      setIsOpen(false);
    }
  };

  const pages = [];
  for (
    let i = 1;
    i <= Math.ceil(employeeDocuments.length / itemsPerPage);
    i++
  ) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  //  1  X 15 = 15 and 2 X 10 = 30
  const indexOfFistItem = indexOfLastItem - itemsPerPage;
  //   30 -15 = 15 and 15 -15 = 0
  const currentItem =
    employeeDocuments.length > 0
      ? employeeDocuments.slice(indexOfFistItem, indexOfLastItem)
      : [];

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

  useEffect(() => {
    dispatch(getDocumentsById(employeeInfo.id));
  }, [employeeInfo]);

  const { userData, backpackClick, setUserData, setFinalData, setCurrentStep } =
    useContext(Multistepcontext);

  const hideme = {
    display: "flex",
  };

  if (changenew) {
    hideme.display = "none";
  }

  const showme = {
    opacity: "0.1",
  };

  if (changenew) {
    showme.opacity = "0.8";
  }

  const delAlert = (id) => {
    setModalOpen(true);
    setID(id);
  };

  const handleDelete = async (id) => {
    dispatch(deleteDocuments(id));
    setModalOpen(false);
  };

  return (
    <div className="header">
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="cardnew">
          <h4>Upload File</h4>
        </div>
        <div className="card">
          <div className="card3">
            <img
              src="images/upload-graphics.png"
              alt="logo"
              width="300px"
              height="220px"
            />
            <div className="labone">
              <label id="l1">Upload your file here</label>
            </div>
            <div className="labtwo">
              <label id="l2">or</label>
              <br />
            </div>
            <div className="givespace">
              <button className="labthree">
                {" "}
                <label className="image-upload" htmlFor="imageinput">
                  Browse File
                </label>
              </button>
            </div>
          </div>
        </div>
        <div className="Instyle">
          <label id="l2">File Name</label>
          <br />
          <input
            type="text"
            id="fname"
            name="name"
            value={file.name}
            placeholder="Enter File Name"
          />
          <input
            type="file"
            name="image-upload"
            id="imageinput"
            onChange={changeHandler}
          />
        </div>
        <div className="labutton">
          <button
            type="button"
            className="labfour"
            className="btn btn-outline-success float-right"
            style={{ backgroundColor: "#003366", color: "white" }}
            type="submit"
            className="btn btn-info"
            onClick={handleUpload}
          >
            Upload
          </button>
          <span> </span>
          <button
            type="button"
            className="btn float-left"
            style={{ backgroundColor: " #717171", color: "white" }}
            type="submit"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Alert
        message="delete the Document"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setOpenModal={setModalOpen}
        handleDelete={(id) => handleDelete(id)}
        id={ids}
      />

      <div className="main">
        <div style={{ marginTop: "4%" }}>
          <div class="row ">
            <div class="col-sm-6"></div>
            <div class="col-sm-6">
              <div className="pos">
                <button
                  className="btn btn-outline-success float-right"
                  style={{ backgroundColor: "#003366", color: "white" }}
                  type="submit"
                  //   onClick={routeChange}
                  // onClick={() => setChangenew(!changenew)}
                  onClick={() => setIsOpen(true)}
                >
                  Upload Files
                </button>
              </div>
            </div>
          </div>
        </div>

        <table class="document-header">
          <tr>
            <th>File Name </th>
            <th>File </th>
            <th>Action</th>
          </tr>

          {currentItem.map((items, i) => {
            return (
              <tr>
                <td class="geeks">{items.name}</td>
                <td>
                  {" "}
                  <a target="_blank" href={items.document_url}>
                    Link
                  </a>
                </td>
                <td>
                  <button onClick={() => delAlert(items.id)}>
                    <img src="images/Del.png" alt="logo" />
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
        <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
            <button
              className="btn  float-left"
              type="submit"
              onClick={() => {
                setCurrentStep(1);
                backpackClick(1);
              }}
            >
              Back
            </button>
            <button
              onClick={() => {
                setCurrentStep(3);
                backpackClick(3);
              }}
              className="btn  float-left"
              type="submit"
              style={{ backgroundColor: "#25344b" }}
            >
              Next
            </button>
          </div>
        </div>
        <nav aria-label="Page navigation example" style={{ display: "unset" }}>
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

export default Documents;
