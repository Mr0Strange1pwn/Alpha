import React, { useState } from "react";

const NumberInput = (props) => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = (e) => {
    setCounter(counter + 1);
    e.preventDefault();
  };

  const decerementCounter = (e) => {
    setCounter(counter - 1);
    e.preventDefault();
  };

  return (
    <div className="numberInput" style={{ display: "flex" }}>
      <div>
        <input
          style={{ height: "100%", backgroundColor: "#f1f1f1" }}
          class="form-control  border"
          type="search"
          id="example-search-input"
          placeholder={props.placeholder}
          value={counter}
          onChange={(value) => setCounter(value.target.value)}
        />
      </div>
      <div className="iconUP" style={{ display: " inline-grid" }}>
        <button className="border" onClick={incrementCounter}>
          {" "}
          <img
            style={{ height: "15px", width: "15px" }}
            src="images/up.png"
            alt="logo"
          />
        </button>
        <button className="border" onClick={decerementCounter}>
          <img
            style={{ height: "15px", width: "15px" }}
            src="images/down.png"
            alt="logo"
          />
        </button>
      </div>
    </div>
  );
};

export default NumberInput;
