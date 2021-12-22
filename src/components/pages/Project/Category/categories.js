import React, { useState } from "react";
import Select from "react-select";



const Categories = ({values}) => {
  const [DisplayValue, getValue] = useState();
  const [value,setState]=useState([])
  const options = values.map(role => ({ label: role.roleName, value: role.id }) )
  const handleChange = (selectedOption) => {
    setState(selectedOption.map(e=>e));
   
  }

  const handleDelete = (index) => {
    const updateditems = value.filter((elem) => {
       return index !== elem.value;
    });
    setState(updateditems);
   
  };

  return (
    <div>
      <Select  isMulti options={options} onChange={handleChange}  placeholder={<div>Department</div>}/>
      {/* <div className="styee"> {value.map((elem)=> 
              <div class="select-option" style={{background: "skyblue",
                padding:" 4px",
                fontSize: "12px",
                borderRadius: "8px",
                textTransform: "uppercase",
                margin: "4px",maxWidth: "max-content"}}>
              {elem.label}<i onClick={(e) => handleDelete(elem.value, e)} class="fa fa-times" aria-hidden="true"></i>
              </div>
                )}</div> */}
    </div>
  );
};

export default Categories;