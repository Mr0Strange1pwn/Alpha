import React, { useState, useContext, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import { Multistepcontext } from "../../../../StepContext";
import Timeclock from "../../../common/Timeclock";
import { useSelector, useDispatch } from "react-redux";
import {
  uploadJobDetails,
  updateJobDetails,
  getJobDetails,
} from "../../../../redux/actions/employeeAction";
import { getJobType } from "../../../../redux/actions/jobtypeAction";
import { useHistory } from "react-router-dom";

function JobDetails() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showError, setError] = useState(false);
  const { employeeInfo, employeeJobDetails } = useSelector(
    (store) => store.emp
  );
  const { jobTypes } = useSelector((store) => store.jobtype);
  const { backpackClick, setCurrentStep } = useContext(Multistepcontext);
  const [details, SetDetails] = useState({
    jobType: "",
    shiftTimeFrom: "",
    shiftTimeTo: "",
    weekelyHoliday: "",
    probationPeriod: "",
  });

  useEffect(() => {
    dispatch(getJobType());
  }, []);

  useEffect(() => {
    dispatch(getJobDetails(employeeInfo.id));
  }, [employeeInfo]);

  useEffect(() => {
    if (employeeJobDetails) {
      SetDetails({
        jobType: employeeJobDetails.job_type,
        shiftTimeFrom: employeeJobDetails.start_time,
        shiftTimeTo: employeeJobDetails.end_time,
        weekelyHoliday: employeeJobDetails.weekly_holidays,
        probationPeriod: employeeJobDetails.probation_period,
        user_profile_id: employeeJobDetails.user_profile_id,
      });
    }
  }, [employeeJobDetails]);

  const handleChange = (e) => {
    SetDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setError(true);
    if (
      details.jobType &&
      details.shiftTimeFrom &&
      details.shiftTimeTo &&
      details.weekelyHoliday &&
      details.probationPeriod
    ) {
      let req = {
        start_time: details.shiftTimeFrom,
        end_time: details.shiftTimeTo,
        weekly_holidays: details.weekelyHoliday,
        probation_period: details.probationPeriod,
        job_type: details.jobType,
        user_profile_id: employeeInfo.id,
      };
      let formData = new FormData();
      Object.keys(req).map((key) => {
        console.log("key", key);
        formData.append(key, req[key]);
      });
      console.log("formData",formData)
      if (employeeJobDetails.user_profile_id) {
        dispatch(
          updateJobDetails(formData, history, setCurrentStep, backpackClick)
        );
      } else {
        dispatch(
          uploadJobDetails(formData, history, setCurrentStep, backpackClick)
        );
      }
    }
  };
  const inputStyle = {
    width: "100%",
    backgroundColor: "#f1f1f1",
    height: "50%",
    border: "1px solid #ced4da",
    borderRadius: ".25rem",
    paddingLeft: "10px",
  };
  return (
    <div>
      <div class="container">
        <form>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Job Type
              </label>

              <select
                className="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="jobType"
                value={details.jobType}
                onChange={(e) => handleChange(e)}
              >
                {jobTypes.map((job) => (
                  <option value={job.id}>{job.Type_name}</option>
                ))}
              </select>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6">
              <div style={{ display: "flex" }}>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <label class="form-check-label reg-lable" for="exampleCheck1">
                    Shift Timing From
                  </label>
                  <Timeclock
                    setTimevalue={(time) =>
                      SetDetails({ ...details, shiftTimeFrom: time })
                    }
                    value={details.shiftTimeFrom}
                  />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <label class="form-check-label reg-lable" for="exampleCheck1">
                    Shift Timing To
                  </label>
                  <Timeclock
                    setTimevalue={(time) =>
                      SetDetails({ ...details, shiftTimeTo: time })
                    }
                    value={details.shiftTimeTo}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Weekely Holidays
              </label>

              <select
                style={{
                  border: showError
                    ? details.weekelyHoliday.length === 0
                      ? " 1px solid red"
                      : null
                    : null,
                }}
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="weekelyHoliday"
                value={details.weekelyHoliday}
                onChange={(e) => handleChange(e)}
              >
                <option selected>Weekely Holidays</option>
                <option value="1">+1.5</option>
                <option value="2">+2</option>
                <option value="3">+2.5</option> 
              </select>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Probation Period(No of Months)
              </label>
              <input
                style={{
                  ...inputStyle,
                  border: showError
                    ? details.probationPeriod.length === 0
                      ? " 1px solid red"
                      : null
                    : null,
                }}
                placeholder="Probation Period"
                type="number"
                name="probationPeriod"
                value={details.probationPeriod}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </form>
        <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
            <button
              onClick={() => {
                setCurrentStep(3);
                backpackClick(3);
              }}
              className="btn  float-left"
              type="submit"
            >
              Back
            </button>
            <button
              className="btn  float-left"
              type="submit"
              style={{ backgroundColor: "#25344b" }}
              onClick={() => handleSave()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
