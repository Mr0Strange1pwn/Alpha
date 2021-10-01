import React, { useState , useContext } from "react";
import Header from "../../Header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import TimePicker from "../../../common/TimePicker";
import {Multistepcontext} from '../../../../StepContext';
 
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
          padding: "11px",
        }}
      />
    </div>
  );
};
function JobDetails() {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState();

  const {page ,backpackClick ,userData ,currentStep,setUserData ,setFinalData ,setCurrentStep} = useContext(Multistepcontext)

  const ytnStyle = {
    width: "48%important",
  };
  return (
    <div>
      {/* <Header headerName="Registration Payroll" /> */}

      <div class="container">
        <form>
        <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
               Job Type
              </label>

              <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
              >
                <option selected>Full Time</option>
                <option value="1">Part Time</option>
                <option value="2">Remote Working</option>
              </select>
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Shift Timing
              </label>
              {/* <TimePicker/> */}
              <input
             
                defaultValue="04:20"
                type="time"
                style={{width:"100%", backgroundColor: "#f1f1f1",height:"50%",border:"1px solid #ced4da",borderRadius:".25rem", paddingLeft: "10px"}}
	            />

              {/* <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
              >
                <option selected>Choose ScreenShot</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select> */}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Weekely Holidays
              </label>

              <select
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
              >
                <option selected>+1</option>
                <option value="1">+1.5</option>
                <option value="2">+2</option>
                <option value="3">+2.5</option>
              </select>
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Probation Period(No of Months)
              </label>
              <input
                    placeholder="Thousants"
                    type="number"
                    style={{backgroundColor: "#f1f1f1",border:"1px solid #ced4da",borderRadius:".25rem",width: "100%",height: "50px"}}
                  />
              {/* <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                customInput={<ExampleCustomInput />}
              /> */}
            </div>
          </div>
        </form>
        <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
            <button className="btn  float-left" type="submit" style={{backgroundColor:"#25344b"}}>
             Save
            </button>
            <button onClick={()=>{setCurrentStep(2);backpackClick(2)}} className="btn  float-left" type="submit">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
