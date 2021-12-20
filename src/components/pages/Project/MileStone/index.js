import React, { useState, useEffect } from "react";
import "./milestone.css";
import { useParams, useHistory } from "react-router-dom";
import Modal from "../../../common/Model";
import DatePicker from "react-datepicker";
import Alert from "../../../common/Alert";
import { addProjectMilestone } from "../../../../redux/actions/projectActions";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

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

const MileStone = (props) => {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [ids, setID] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isEditItem, setIsEditItem] = useState();
  const [showError, SetError] = useState(false);
  const [item, setItem] = useState({
    id: "",
    name: "",
    status: "",
    amount: "",
  });
  const { project } = useSelector((store) => store.project);
  const history = useHistory();
  const handleRouteChange = () => {
    let path = `./Task`;
    history.push(path);
  };
  const handleChange = (e) => {
    console.log({ [e.target.name]: e.target.value });
    setItem({
      ...item,
      id: new Date().getTime().toString(),
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    SetError(true);
    if (item.name && item.status && item.amount) {
      // const newData = {
      //   id: new Date().getTime().toString(),
      //   item,
      // };
      setData([...data, item]);
      setIsOpen(false);
    }
  };
  const handleEdit = () => {
    let newArr = data;
    let index = data.findIndex((x) => x.id === isEditItem);

    newArr.splice(index, 1, item);
    console.log("item", newArr);
    setData(newArr);
    setIsOpenEdit(false);
  };
  const editItems = (id, e) => {
    e.preventDefault();
    setIsOpenEdit(true);
    let newEditItem = data.find((elem) => {
      return elem.id === id;
    });
    console.log(newEditItem);
    setItem(newEditItem);
    setIsEditItem(id);
    // setToggleSubmit(false);
  };


  useEffect(() => {
    if (searchQuery.length > 0) {
      searchHandler();
    } else {
      setSearch(false);
    }
  }, [searchQuery]);

  const searchHandler = () => {
    let filterDAta = data.filter((newdata) =>
      newdata.name.includes(searchQuery)
    );
    if (filterDAta.length > 0) {
      setData(filterDAta);
    }
    setSearch(true);
  };

  const handleDelete = (index) => {
    const updateditems = data.filter((elem) => {
      return index !== elem.id;
    });
    setData(updateditems);
    setModalOpen(false);
  };
  const delAlert = (id) => {
    setModalOpen(true);
    setID(id);
  };

  const handleCreate = () => {
    if (data.length > 0) {
      let val = data[0];
      if (val.name && val.status && val.amount && startDate) {
        let req = {
          name: val.name,
          status: val.status.toLowerCase(),
          amount: val.amount,
          release_date: moment(startDate).format("YYYY-MM-DD"),
          project_id: project.id,
        };
        console.log("data req", req);
        let formData = new FormData();
        Object.keys(req).map((key) => {
          console.log("key", key);
          formData.append(key, req[key]);
        });
        dispatch(addProjectMilestone(formData));
        history.push("/Project");
      }
    }
  };

  return (
    <div className="milestone-header">
      <Alert
        message="delete the Milestone"
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setOpenModal={setModalOpen}
        handleDelete={(id) => handleDelete(id)}
        id={ids}
      />

      <div style={{ marginTop: "5%" }}>
        <div style={{ display: "flex", marginBottom: "2%" }}>
          <img src="images/milestone.png" alt="Project-info-icon" />
          <h4 style={{ alignSelf: "center", paddingLeft: "10px" }}>
            {" "}
            Milestone
          </h4>
        </div>

        <div className="row">
          <div class="col-sm-6">
            <div class="col-sm-5">
              <div class="input-group">
                <input
                  class="form-control  border"
                  type="search"
                  id="example-search-input"
                  placeholder="Search here.."
                  value={searchQuery}
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
            <div style={{ textAlign: "-webkit-right" }}>
              <button
                className="btn btn-outline-success float-right"
                style={{ backgroundColor: "#003366", color: "white" }}
                type="submit"
                onClick={() => setIsOpen(true)}
              >
                Add Milestone
              </button>
            </div>
          </div>
        </div>

        <div>
          <Modal open={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
            <div style={{ marginTop: "5%" }}>
              <div style={{ textAlignLast: "center" }}>
                <h4 style={{ fontWeight: "700" }}>Edit Milestone</h4>
              </div>
              <div style={{ margin: "auto", width: "70%" }}>
                <div className="row">
                  <label class="form-check-label reg-lable" for="exampleCheck1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="name"
                    placeholder="Enter Name"
                    value={item.name}
                    onChange={(e) => handleChange(e)}
                    // onChange={(e) => setInputData(e.target.value)}
                  />
                </div>
                <div className="row">
                  <label class="form-check-label reg-lable" for="exampleCheck1">
                    Status
                  </label>

                  <select
                    class="form-select"
                    id="inputGroupSelect03"
                    aria-label="Example select with button addon"
                    name="status"
                    value={item.status}
                    onChange={(e) => handleChange(e)}
                  >
                    <option selected>Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div className="row">
                  <label class="form-check-label reg-lable" for="exampleCheck1">
                    Amount
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="amount"
                    placeholder="Enter Amount"
                    value={item.amount}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="row">
                  <label class="form-check-label reg-lable" for="exampleCheck1">
                    Release Date
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
                    onClick={() => handleEdit()}
                  >
                    Save
                  </button>
                  <span> </span>
                  <button
                    type="button"
                    className="btn"
                    style={{ backgroundColor: " #717171", color: "white" }}
                    onClick={() => setIsOpenEdit(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Modal>

          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
            <div style={{ marginTop: "5%" }}>
              <div style={{ textAlignLast: "center" }}>
                <h4 style={{ fontWeight: "700" }}>Add Milestone</h4>
              </div>
              <div style={{ margin: "auto", width: "70%" }}>
                <div className="row">
                  <label class="form-check-label reg-lable" for="exampleCheck1">
                    Name
                  </label>
                  <input
                    style={{
                      border: showError
                        ? item.name.length === 0
                          ? " 1px solid red"
                          : null
                        : null,
                    }}
                    type="text"
                    id="fname"
                    name="name"
                    placeholder="Enter Name"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="row">
                  <label class="form-check-label reg-lable" for="exampleCheck1">
                    Status
                  </label>

                  <select
                    style={{
                      border: showError
                        ? item.status.length === 0
                          ? " 1px solid red"
                          : null
                        : null,
                    }}
                    class="form-select"
                    id="inputGroupSelect03"
                    aria-label="Example select with button addon"
                    name="status"
                    onChange={(e) => handleChange(e)}
                  >
                    <option selected>Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="row">
                  <label class="form-check-label reg-lable" for="exampleCheck1">
                    Amount
                  </label>
                  <input
                    style={{
                      border: showError
                        ? item.amount.length === 0
                          ? " 1px solid red"
                          : null
                        : null,
                    }}
                    type="text"
                    id="fname"
                    name="amount"
                    placeholder="Enter Amount"
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="row">
                  <label class="form-check-label reg-lable" for="exampleCheck1">
                    Release Date
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
                  style={{ marginTop: "5%", marginBottom: "5%" }}
                >
                  <button
                    type="button"
                    className="btn"
                    style={{ backgroundColor: "#003366", color: "white" }}
                    onClick={() => handleSave()}
                  >
                    Save
                  </button>
                  <span> </span>
                  <button
                    type="button"
                    className="btn"
                    style={{ backgroundColor: " #717171", color: "white" }}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </div>

        <table class="mile-header">
          <tr>
            <th>
              Name <img src="images/Sort.png" alt="logo" />
            </th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

          {data.map((students, i) => {
            return (
              <tr>
                <td>{students.name}</td>
                <td>{students.amount}</td>
                <td>{students.status}</td>
                <td style={{ width: "197px" }}>
                  <button onClick={() => delAlert(students.id)}>
                    <img src="images/Del.png" alt="logo" />
                  </button>
                  <button
                    onClick={(e) => {
                      editItems(students.id, e);
                    }}
                  >
                    <img src="images/Edit.png" alt="logo" />
                  </button>
                  <button onClick={() => handleRouteChange()}>
                    <img src="images/task.png" alt="logo" />
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
              style={{ backgroundColor: "#25344b" }}
              onClick={() => {
                handleCreate();
              }}
            >
              Create
            </button>
            <button className="btn  float-left" type="submit">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MileStone;
