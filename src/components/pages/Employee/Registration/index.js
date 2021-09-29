import React, { useState } from "react";
import "./Registration.css";
import Header from "../../Header/Header";
import Upload from "./Upload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

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
          padding: "5px",
        }}
      />
    </div>
  );
};
function Registration() {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState();

  const ytnStyle = {
    backgroundColor: "blue",
    backgroundImage: "linear-gradient(45deg, black, transparent)",
  };
  return (
    <div>
      <Header headerName="Registration" />
      <div style={{ display: "flex", marginLeft: "8%", marginTop: "5%" }}>
        <div
          style={{
            backgroundColor: "#f1f1f1",
          }}
        >
          <Upload />
        </div>
      </div>
      <div class="container">
        <form>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Name
              </label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Name"
              />
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Email
              </label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Mobile Number
              </label>
              <PhoneInput
                country={"us"}
                value={value}
                onChange={(value) => setValue(value)}
              />
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Date of Birth{" "}
                <i class="fas fa-calendar-week" style={{ color: "black" }} />
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
              {/* 
                    </DatePicker> */}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Designation
              </label>

              <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
              >
                <option selected>Choose Designation</option>
                <option value="1">Developer</option>
                <option value="2">Tester</option>
                <option value="3">Designer</option>
              </select>
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Role
              </label>

              <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
              >
                <option selected>Choose Role</option>
                <option value="1">Lead</option>
                <option value="2">QA Lead</option>
                <option value="3">Fresher</option>
              </select>
            </div>
          </div>
          <div className="row">
            <label
              class="form-check-label reg-lable"
              for="exampleCheck1"
              style={{
                fontSize: "25px",
                fontWeight: "700",
                marginLeft: "1%",
                marginTop: "1%",
              }}
            >
              Advance Setting
            </label>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Manager
              </label>

              <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
              >
                <option selected>Choose Manager</option>
                <option value="1">Manager</option>
                <option value="2">Assistant Manager</option>
                <option value="3">Juniar Manager</option>
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
              >
                <option selected>Choose ScreenShot</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </form>
        <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
            <button className="btn  float-left" type="submit">
              Save
            </button>
            <button className="btn  float-left" type="submit">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
