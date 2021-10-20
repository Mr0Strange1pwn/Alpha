import React, { useState } from "react";
import TimeKeeper from "react-timekeeper";
import "./timeclock.css";

export default function Timeclock() {
  const [time, setTime] = useState("00:00");
  const [showTime, setShowTime] = useState(false);

  return (
    <div>
      <div className="col-sm-12 col-md-6 col-lg-6" style={{width:"100%"}}>
        <div className="divbox">
          <span className="divcolor"> {time}</span>
          {!showTime && (
            <button className="divbutton" onClick={() => setShowTime(true)}>
              {" "}
              <img className="clockimg" src="images/clock.png" alt="logo" />
            </button>
          )}
        </div>
      </div>
      {showTime && (
        <div className="Timekeeperimage">
          <TimeKeeper
            time={time}
            onChange={(newTime) => setTime(newTime.formatted12)}
            onDoneClick={() => setShowTime(false)}
            switchToMinuteOnHourSelect
          />
        </div>
      )}
    </div>
  );
}
