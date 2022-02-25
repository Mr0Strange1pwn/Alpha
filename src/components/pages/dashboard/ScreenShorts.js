import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
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
          backgroundColor: "#f1f1f1",
          padding: "10px",
        }}
      />
    </div>
  );
};

export default function ScreenShorts() {
  const { SS } = useSelector((store) => store.screenshorts);
  const { projects } = useSelector((store) => store.project);
  console.log("ss ", SS , projects);
  const [startDate, setStartDate] = useState(new Date());

  return (
    <>
      <h5>Screen Shorts</h5>

      <div className="ss-action">
        <div className="job-form" style={{ display: "flex" }}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            customInput={<ExampleCustomInput />}
          />
          <button
            className="btn changebtn"
            style={{
              backgroundColor: "#25344b",
            }}
          >
            Apply
          </button>
        </div>

        <div className="ss-action">
          <h2>
            Daily Total : <span className="ss-total-time">6:39 Hrs</span>
          </h2>
        </div>
      </div>

      <div className="ss-container">
        <div className="ss-card">
  <img className="ss-card-img"  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
  <h5 className="ss-card-titel" >UI design</h5>
  <p className="ss-card-para">time</p>
</div>

        {SS.length > 0 &&
          SS.map((ss) => {
            console.log('Pro',projects.filter(pro => pro.id === ss.task))
            let pro = projects.filter(pro => pro.id === ss.task)
            return (
            <div className="ss-card">
              <img className="ss-card-img" src={ss.userScreenshot} />
              <h5 className="ss-card-titel">{pro.length > 0 && pro[0].name}</h5>
              <p className="ss-card-para">
                {moment(ss.datetime_of_capture).format("DD/MM/YYYY hh:mm a")}
              </p>
            </div>
          )})}
      </div>
    </>
  );
}
