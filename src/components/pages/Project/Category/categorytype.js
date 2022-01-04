import React, { useState, useEffect } from "react";
import Select from "react-select";

const Categorytype = ({ values, valueChange, employee }) => {
  const [value, setState] = useState([]);

  const options = values.map((role) => ({
    label: role.name,
    value: role.id,
  }));

  useEffect(() => {
    if (employee.length > 0) {
      let v = [];
      employee.map((emp) => {
        options.map((opt) => {
          if (opt.value == emp) {
            v.push(opt);
          }
        });
      });
      setState(v);
    }
  }, []);

  const handleChange = (selectedOption) => {
    setState(selectedOption.map((e) => e));
    valueChange(selectedOption.map((v) => v.value));
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
      
      </div>
    </div>
  );
};

export default Categorytype;
