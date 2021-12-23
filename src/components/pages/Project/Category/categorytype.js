import React, { useState } from "react";
import Select from "react-select";

const Categorytype = ({ values,valueChange }) => {
  const [DisplayValue, getValue] = useState();
  const [value, setState] = useState([]);

  const options = values.map((role) => ({
    label: role.name,
    value: role.id,
  }));
  const handleChange = (selectedOption) => {
    setState(selectedOption.map((e) => e));
   // console.log("selectedOption",selectedOption.map(v=> v.value))
    valueChange(selectedOption.map(v=> v.value))
  };
  // console.log("values", values);
  const handleDelete = (index) => {
    const updateditems = value.filter((elem) => {
      return index !== elem.value;
    });
    setState(updateditems);
  };

  return (
    <div>
      <Select
        isMulti
        options={options}
        onChange={handleChange}
        placeholder={<div>Category</div>}
      />
      <div
        className="row"
        style={{ display: "flex", marginTop: "40px", position: "absolute" }}
      >
        {/* {value.map((o) => (
          <div className="col-sm-6" style={{ display: "flex" }}>
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <span
              style={{
                color: "darkBlue",
                fontWeight: "600",
                marginLeft: "15px",
              }}
            >
              {o.label}
            </span>
            <br />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Categorytype;
