import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useSelector, useDispatch } from "react-redux";
import { getworkTime } from "../../../redux/actions/screenshortsAction";
import moment from "moment";

const ExampleCustomInput = ({ value, onClick }) => {
  return (
    <div>
      <input
        type="text"
        id="lname"
        className="example-custom-input"
        onClick={(e) => onClick(e.preventDefault())}
        value={moment(value).format("DD/MM/YYYY")}
        style={{
          backgroundImage: "url(images/calendar.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right",
          backgroundOrigin: "content-box",
          backgroundColor: "#f1f1f1",
          padding: "10px",
        }}
      />
    </div>
  );
};

export default function ScreenShorts() {
  const dispatch = useDispatch();
  const { SS, workTime } = useSelector((store) => store.screenshorts);
  const { projects } = useSelector((store) => store.project);

  const [startDate, setStartDate] = useState(new Date());
  const [screenshorts, setScreenShorts] = useState([]);
  const [dailyTime, setDailyTime] = useState(0);

  useEffect(() => {
    let ss = SS.filter(
      (data) =>
        moment(data.datetime_of_capture).format("DD/MM/YYYY") ===
        moment(startDate).format("DD/MM/YYYY")
    );
    console.log("ss ", ss, startDate);
    setScreenShorts(ss);
  }, [SS, startDate]);

  useEffect(() => {
    dispatch(getworkTime(moment(startDate).format("DD/MM/YYYY")));
  }, [startDate]);

  useEffect(() => {
    let totalTimesec = 0;
    workTime.map((work) => (totalTimesec += work.totalTimeWorkedSeconds));

    const sec = parseInt(totalTimesec, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - hours * 3600) / 60);
    let seconds = sec - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    let tim = hours + "h " + minutes + "m " + seconds + "s";

    console.log("total time", tim);
    setDailyTime(tim);
  }, [workTime]);
  // const filterSS =()=>{
  //   let ss = SS.filter(data=> moment(data.datetime_of_capture).format("DD/MM/YYYY")  === moment(startDate).format("DD/MM/YYYY") )
  //   console.log("ss ", ss , startDate );
  //   setScreenShorts(ss)
  // }

  return (
    <>
      <h5>Screen Shorts</h5>

      <div className="ss-action">
        <div
          className="job-form"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 style={{ width: "70px" }}>Date : </h5>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            customInput={<ExampleCustomInput />}
          />
          {/* <button
            className="btn changebtn"
            style={{
              backgroundColor: "#25344b",
            }}
            onClick={filterSS}
          >
            Apply
          </button> */}
        </div>

        <div className="ss-action">
          <h2>
            Daily Total : <span className="ss-total-time">{dailyTime}</span>
          </h2>
        </div>
      </div>

      {/* <div className="ss-card">
  <img className="ss-card-img"  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
  <h5 className="ss-card-titel" >UI design</h5>
  <p className="ss-card-para">time</p>
</div> */}

      {screenshorts.length > 0 ? (
        <div className="ss-container">
          {screenshorts.map((ss) => {
            let pro = projects.filter((pro) => pro.id === ss.task);
            return (
              <div className="ss-card">
                <img className="ss-card-img" src={ss.userScreenshot} />
                <h5 className="ss-card-titel">
                  {pro.length > 0 && pro[0].name}
                </h5>
                <p className="ss-card-para">
                  {moment(ss.datetime_of_capture).format("DD/MM/YYYY hh:mm a")}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <h2>
          No Screen Shorts for :{" "}
          <span className="ss-total-time">
            {moment(startDate).format("DD/MM/YYYY")}
          </span>
        </h2>
      )}
    </>
  );
}
