import React, { useState, useEffect } from "react";
import Select from "react-select";
import Modal from "../../common/Model";
import { empfilter } from "../../../redux/actions/employeeAction";
import { useSelector, useDispatch } from "react-redux";

const EmployeeFilter = ({ open, onClose }) => {
  const [valueName, setState] = useState([]);
  const [roleValue, setRoleState] = useState([]);
  const [emailValue, setEmailState] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  const roleNameInfo = useSelector((store) => store.role.userInfo);
  const empInfo = useSelector((store) => store.emp.userInfo);
  const [empNameList, setEmpNameList] = useState([{}]);
  const [roleNameList, setRoleName] = useState([{}]);
  const [empEmailList, setEmpEmailList] = useState([{}]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (roleNameInfo.length > 0) {
      setRoleName(
        roleNameInfo.map((value) => ({
          label: value.roleName,
          value: value.id,
        }))
      );
    }
    if (empInfo.length > 0) {
      setEmpNameList(
        empInfo.map((value) => ({
          label: value.name,
          value: value.id,
        }))
      );
    }
    if (empInfo.length > 0) {
      setEmpEmailList(
        empInfo.map((value) => ({
          label: value.email,
          value: value.id,
        }))
      );
    }
  }, []);

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
    setState(selectedOption.map((e) => e.label));
  };
  const handleChangeEmail = (selectedOption) => {
    setEmailState(selectedOption.map((e) => e.label));
  };
  const handleChangeName = (selectedOption) => {
    setRoleState(selectedOption.map((e) => e.label));
  };

  const handleSubmit = () => {
    let req = {
      name: valueName,
      email: emailValue[0],
      roleName: roleValue[0],
    };
    dispatch(empfilter(req));
    onClose();
  };
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <div style={{ marginTop: "4%" }}>
          <div style={{ textAlignLast: "center" }}>
            <h4 style={{ fontWeight: "700" }}>Filter Employee Screen</h4>
          </div>
          <div style={{ margin: "auto", width: "70%" }}>
            <div className="row">
              <div className="col">
                <label class="form-check-label reg-lable" for="exampleCheck1">
                  Employee Name
                </label>
                <Select
                  isMulti
                  options={empNameList}
                  onChange={handleChange}
                  placeholder={<div>Employer Name</div>}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label class="form-check-label reg-lable" for="exampleCheck1">
                  Role Name
                </label>
                <Select
                  isMulti
                  options={roleNameList}
                  onChange={handleChangeName}
                  placeholder={<div>Role Name</div>}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label class="form-check-label reg-lable" for="exampleCheck1">
                  Email
                </label>
                <Select
                  isMulti
                  options={empEmailList}
                  onChange={handleChangeEmail}
                  placeholder={<div>Emails</div>}
                />
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

                {valueName.length > 0 ? (
                  <div style={{ paddingLeft: "20px", display: "flex" }}>
                    <div>
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Employee Name
                      </label>
                    </div>
                    <div style={{ display: "contents" }} className="emp-name">
                      {valueName.map((data) => (
                        <ul>{data}</ul>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {roleValue.length > 0 ? (
                  <div style={{ paddingLeft: "20px", display: "flex" }}>
                    <div>
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Role Name
                      </label>
                    </div>
                    <div style={{ display: "contents" }}>
                      {roleValue.map((data) => (
                        <ul>{data}</ul>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {emailValue.length > 0 ? (
                  <div style={{ paddingLeft: "20px", display: "flex" }}>
                    <div>
                      <label
                        class="form-check-label reg-lable"
                        for="exampleCheck1"
                      >
                        Email
                      </label>
                    </div>
                    <div style={{ display: "contents" }}>
                      {emailValue.map((data) => (
                        <ul>{data}</ul>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}
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
                onClick={handleSubmit}
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

export default EmployeeFilter;
