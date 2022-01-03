import React, { useState } from "react";
import { useEffect } from "react";
import TimeKeeper from "react-timekeeper";
import "./timeclock.css";

export default function Timeclock({setTimevalue, value}) {
  const [time, setTime] = useState("6:00 AM");
  const [showTime, setShowTime] = useState(false);

  useEffect(()=>{
    if(value){
      setTime(value)
    }
  },[value])

  return (
    <div>
      <div className="col-sm-12 col-md-6 col-lg-6" style={{width:"100%"}}>
        <div className="divbox">
          <span className="divcolor"> {time}</span>
          {!showTime && (
            <button className="divbutton" onClick={() => setShowTime(true)}>
              <img className="clockimg" src="images/clock.png" alt="logo" />
            </button>
          )}
        </div>
      </div>
      {showTime && (
        <div className="Timekeeperimage">
          <TimeKeeper
            time={time}
            onChange={(newTime) => {setTime(newTime.formatted12); setTimevalue(newTime.formatted12)}}
            onDoneClick={() => setShowTime(false)}
            switchToMinuteOnHourSelect
          />
        </div>
      )}
    </div>
  );
}
