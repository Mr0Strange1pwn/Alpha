import React from "react";
import Modal from "../../../common/Model";
import DatePicker from "react-datepicker";

const MileStoneModal = ({isEdit,open,header,onClose,showError,handleChange,item,handleSave,startDate,setStartDate,ExampleCustomInput}) => {
console.log("isEdit",isEdit)
  return (
    <div>
       <Modal open={open} onClose={onClose}>
            <div style={{ marginTop: "5%" }}>
              <div style={{ textAlignLast: "center" }}>
                <h4 style={{ fontWeight: "700" }}>{header}</h4>
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
                    value={item.name}
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
                    value={item.status}
                    onChange={(e) => handleChange(e)}
                  >
                    <option selected>Select Status</option>
                    <option value="pending">Pending</option>
                    <option value="done">Done</option>
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
                    onClick={() => handleSave()}
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
export default MileStoneModal;
