import React, { useState } from "react";
import Select from "react-select";
import Modal from "../../common/Model";

const options = [
  { value: 1, label: "Choose Role Name" },
  { value: 2, label: "Manager" },
  { value: 3, label: "Assistant Manager" },
  { value: 4, label: "Developer" },
  { value: 5, label: "Tester" },
  { value: 6, label: "Designer" },
  { value: 7, label: "BDM" },
  { value: 8, label: "Accountent" },
];

const RoleFilter = ({ open, onClose }) => {
  const [value, setState] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);

  const changeColor = () => {
    setToggleTwo(false);
    setToggle(true);
  };
  const changeColorTwo = () => {
    setToggleTwo(true);
    setToggle(false);
  };
  const buttonColor = {
    backgroundColor: "green",
  };
  const buttonwhite = {
    backgroundColor: "white",
  };
  let btn_class = toggle ? buttonColor : buttonwhite;
  let btn_classTwo = toggleTwo ? buttonColor : buttonwhite;

  const handleChange = (selectedOption) => {
    setState(selectedOption.map((e) => e));
  };

  return (
    <div>
      <Modal open={open} onClose={onClose}>
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
                <Select
                  isMulti
                  options={options}
                  onChange={handleChange}
                  placeholder={<div>Tickets</div>}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-check-label reg-lable" for="exampleCheck1">
                  User Count
                </label>
                <select
                  className="form-select"
                  id="inputGroupSelect03"
                  aria-label="Example select with button addon"
                  name="screenshot"
                >
                  <option selected>Choose User Count</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <div className="sorting-data">
              <div
                className="row"
                style={{ padingLeft: "3px", paddingRight: "5px" }}
              >
                <div className="col" style={{ alignSelf: "center" }}>
                  <label
                    className="form-check-label reg-lable"
                    for="exampleCheck1"
                    style={{ marginLeft: "10px" }}
                  >
                    Sorting By:
                  </label>
                </div>

                <div className="toggleButton">
                  <button
                    type="button"
                    className="btn btn-sm toggle"
                    style={btn_class}
                    onClick={() => changeColor()}
                  >
                    Assending
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm toggle"
                    style={btn_classTwo}
                    onClick={() => changeColorTwo()}
                  >
                    Descinding
                  </button>
                </div>
                <div style={{padding:"20px"}}>
                  {value.map((data) => (
                    <div>{data.label}</div>
                  ))}
                </div>
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
              >
                Save
              </button>
              <span> </span>
              <button
                type="button"
                className="btn"
                style={{ backgroundColor: " #717171", color: "white" }}
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RoleFilter;
