import React, { useState , useContext } from "react";
import Header from "../../Header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import TimePicker from "../../../common/TimePicker";
import {Multistepcontext} from '../../../../StepContext';
 

function JobDetails() {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState();
  const [showError ,setError ] =useState(false)
  const {page ,backpackClick ,userData ,currentStep,setUserData ,setFinalData ,setCurrentStep} = useContext(Multistepcontext)
  const [ details , SetDetails] =useState({
    jobType:"",
    shiftTime:"",
    weekelyHoliday:"",
    probationPeriod:""
  })

  const handleChange = (e) => {
        SetDetails({...details, [e.target.name]: e.target.value})
  }

  const handleSave = () => {
    setError(true)
    if(details.jobType && details.shiftTime && details.weekelyHoliday && details.probationPeriod){
      console.log("details", details)
    }
  }
  const inputStyle = {
    width:"100%", backgroundColor: "#f1f1f1",height:"50%",border:"1px solid #ced4da",borderRadius:".25rem", paddingLeft: "10px"
  }
  return (
    <div>
      <div class="container">
        <form>
        <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
               Job Type
              </label>

              <select
                style={{border: showError ? details.jobType.length === 0 ? " 1px solid red" : null : null}}
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="jobType"
                value={details.jobType}
                onChange={e => handleChange(e)}
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
                style={{...inputStyle, border: showError ? details.shiftTime.length === 0 ? " 1px solid red" : null : null }}
                // defaultValue="04:20"
                type="time"
                name="shiftTime"
                value={details.shiftTime}
                onChange={e => handleChange(e)}

	            />

            </div>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Weekely Holidays
              </label>

              <select
                style={{border: showError ? details.weekelyHoliday.length === 0 ? " 1px solid red" : null : null}}
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="weekelyHoliday"
                value={details.weekelyHoliday}
                onChange={e => handleChange(e)}
              >
                <option selected>Weekely Holidays</option>
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
                    style={{...inputStyle, border: showError ? details.probationPeriod.length === 0 ? " 1px solid red" : null : null }}
                    placeholder="Probation Period"
                    type="number"
                    name="probationPeriod"
                    value={details.probationPeriod}
                    onChange={e => handleChange(e)}
                  />
            </div>
          </div>
        </form>
        <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
            <button className="btn  float-left" type="submit" style={{backgroundColor:"#25344b"}} onClick={() => handleSave()}>
             Save
            </button>
            <button onClick={()=>{setCurrentStep(3);backpackClick(3)}} className="btn  float-left" type="submit">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
