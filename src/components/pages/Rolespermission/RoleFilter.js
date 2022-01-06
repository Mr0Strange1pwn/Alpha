import React, { useState, useEffect } from "react";
import Select from "react-select";
import Modal from "../../common/Model";
import { filterRole, roleLIst } from "../../../redux/actions/roleAction";
import { useSelector, useDispatch } from "react-redux";

const RoleFilter = ({ open, onClose }) => {
  const [value, setState] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [toggleTwo, setToggleTwo] = useState(false);
  const roleNameInfo = useSelector((store) => store.role.userInfo);
  const [roleNameList, setRoleName] = useState([{}]);
  const [userCount, setUserCount] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    roleData();
    if (roleNameInfo.length > 0) {
      setRoleName(
        roleNameInfo.map((value) => ({
          label: value.roleName,
          value: value.id,
        }))
      );
    }
  }, []);

  const roleData = () => {
    dispatch(roleLIst());
  };
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
  const handleSubmit = () => {
    let data = {
      roleName: value,
      user_count: parseInt(userCount),
    };
    dispatch(filterRole(data));
    onClose();
  };
  return (
    <div>
      <Modal open={open} onClose={onClose}>
        <div style={{ marginTop: "4%" }}>
          <div style={{ textAlignLast: "center" }}>
            <h4 style={{ fontWeight: "700" }}>Filter Role And Permission</h4>
          </div>
          <div style={{ margin: "auto", width: "70%" }}>
            <div className="row">
              <div className="col">
                <label class="form-check-label reg-lable" for="exampleCheck1">
                  Role Name
                </label>
                <Select
                  isMulti
                  options={roleNameList}
                  onChange={handleChange}
                  placeholder={<div>Tickets</div>}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label
                  className="form-check-label reg-lable"
                  for="exampleCheck1"
                >
                  User Count
                </label>
                <input
                  type="text"
                  id="lname"
                  name="email"
                  placeholder="User Count"
                  value={userCount}
                  onChange={(e) => setUserCount(e.target.value)}
                />
              </div>
            </div>
            <div className="sorting-data">
              <div
                className="row"
                style={{ padingLeft: "3px", paddingRight: "5px" }}
              >
                <div className="col-md-4" style={{ alignSelf: "center" }}>
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
                <div style={{ padding: "20px" }}>
                  {value.map((data) => (
                    <div>{data}</div>
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

export default RoleFilter;
