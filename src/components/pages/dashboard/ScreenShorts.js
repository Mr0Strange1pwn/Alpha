import React, { useState, useEffect } from "react";
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
 
  const [startDate, setStartDate] = useState(new Date());
  const [ screenshorts , setScreenShorts ] = useState([])

  useEffect(()=>{
    let ss = SS.filter(data=> moment(data.datetime_of_capture).format("DD/MM/YYYY")  === moment(startDate).format("DD/MM/YYYY") )
    console.log("ss ", ss , startDate );
    setScreenShorts(ss)
  },[SS, startDate])

  // const filterSS =()=>{
  //   let ss = SS.filter(data=> moment(data.datetime_of_capture).format("DD/MM/YYYY")  === moment(startDate).format("DD/MM/YYYY") )
  //   console.log("ss ", ss , startDate );
  //   setScreenShorts(ss)
  // }

  return (
    <>
      <h5>Screen Shorts</h5>

      <div className="ss-action">
       
        <div className="job-form" style={{ display: "flex" , justifyContent:"space-between", alignItems:"center"}}>
        <h5 style={{width:"70px"}}>Date : </h5>
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
            Daily Total : <span className="ss-total-time">6:39 Hrs</span>
          </h2>
        </div>
      </div>

   

        {/* <div className="ss-card">
  <img className="ss-card-img"  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" />
  <h5 className="ss-card-titel" >UI design</h5>
  <p className="ss-card-para">time</p>
</div> */}

        {screenshorts.length > 0 ?
          <div className="ss-container">{
          screenshorts.map((ss) => {
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
           </div>  :  ( <h2>
          No Screen Shorts for : <span className="ss-total-time">{ moment(startDate).format("DD/MM/YYYY")}</span>
        </h2>) }
 
    </>
  );
}
