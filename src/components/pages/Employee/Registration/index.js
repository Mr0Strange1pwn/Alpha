import React, { useState, useContext, useEffect } from "react";
import "./Registration.css";
import Upload from "./Upload";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Multistepcontext } from '../../../../StepContext';
import { useHistory } from "react-router-dom";
import { emailValidator } from '../../../../Utils/fieldValidator'
import { useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import { saveEmployee , getDesignitations, getRoles, saveEmployeeUpdate} from '../../../../redux/actions/employeeAction'

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
              padding: "10px",
        }}
      />
    </div>
  );
};


function Registration() {
  const dispatch = useDispatch()
  const { designations, roles ,employeeInfo} = useSelector(store => store.emp)
  const [startDate, setStartDate] = useState(new Date());
  const [phoneNO, setPhoneNO] = useState();
  const [IMG, setIMG] = useState()
  const [details, setDetails] = useState({
    name: "",
    email: "",
    designation: "",
    role: "",
    manager: "",
    screenshot:""
  });
  const [showError, setShowError] = useState(false)
  const { backpackClick, setCurrentStep } = useContext(Multistepcontext)
  const history = useHistory();
  const routeChange = () => {
    let path = `./Employee`;
    history.push(path);
  }

  useEffect(()=>{
    dispatch(getDesignitations())
    dispatch(getRoles())
  },[])

  useEffect(()=>{
    if(employeeInfo !== undefined && employeeInfo.id){
      setDetails({
        name: employeeInfo.name,
        email: employeeInfo.email,
        designation: employeeInfo.designation_name.id,
        role: employeeInfo.roleId.id,
        manager: employeeInfo.manager_name,
        screenshot:employeeInfo.screenshots
      })
     // setStartDate(employeeInfo.date_of_birth)
      setIMG(employeeInfo.profile_image)
      setPhoneNO(employeeInfo.mobile_number)
    }
  },[employeeInfo])
 
  const handleValueChange = (e) => {   
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const handleRoleChange =(e)=> {
    setDetails({ ...details, role: e.target.value })
      // if( e.target.value === "SA"){
      //   if(details.role.includes("SA")){
      //     setDetails({ ...details, role: [] })
      //   }else{
      //     setDetails({ ...details, role: ["SA","1","2","3"] })
      //   }      
      // } else{
      //   if(details.role.includes(e.target.value)){
      //     let role = details.role
      //     let ind = role.indexOf(e.target.value)
      //     role.splice(ind,1)
      //     setDetails({ ...details, role: role })
      //   }else{
      //     setDetails({ ...details, role: [...details.role ,e.target.value ] })
      //   } 
      // }
  }
console.log("role, ", details.role,employeeInfo)
  const handleNext = () => {
    setShowError(true)
    if (details.name && details.designation && emailValidator(details.email) && details.role && details.manager && details.screenshot ) {
      let formData = new FormData()
      let req = {
        name: details.name , 
        email: details.email,
        mobile_number: phoneNO , 
        date_of_birth: moment(startDate).format("YYYY-MM-DD"),
        roleId: parseInt(details.role),
        designation_name: parseInt(details.designation),
        manager_name: details.manager,
        screenshots: parseInt(details.screenshot),
      }

     Object.keys(req).map(key=>{
       console.log("key",key)
       formData.append(key, req[key])
      })
      formData.append("profile_image",IMG,IMG.name)
      if(employeeInfo.id){
        formData.append("id", employeeInfo.id)
        dispatch(saveEmployeeUpdate(formData))
      }else{
        dispatch(saveEmployee(formData))
      }
     
    //  console.log("details", req)
  //   for (var pair of formData.entries()) {
  //     console.log(pair[0]+ ', ' + pair[1]); 
  // }
      setCurrentStep(2); backpackClick(2)
    }
  }

  const cleardetails=()=>{
    setDetails(
      {
        name: "",
        email: "",
        designation: "",
        role: "",
        manager: "",
        screenshot:""
      }
    )
    setIMG()
  }

console.log("designations",designations)
  return (
    <div>
      {/* <Header headerName="Registration" /> */}
      <div class="upload-image" style={{ display: "flex", marginLeft: "8%", marginTop: "5%" }}>
        <div className="uploadImage"
          style={{
            backgroundColor: "#f1f1f1",
          }}
        >
          <Upload setIMG={setIMG} IMG={IMG} />
        </div>
      </div>
      <div class="container">
        <form class="registrstion-form">
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Name
              </label>
              <input
                style={{ border: showError ? details.name.length === 0 ? " 1px solid red" : null : null }}
                type="text"
                id="fname"
                name="name"
                placeholder="Name"
                value={details.name}
                onChange={e => handleValueChange(e)}
              />
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Email
              </label>
              <input
                style={{ border: showError ? !emailValidator(details.email) ? " 1px solid red" : null : null }}
                type="text"
                id="lname"
                name="email"
                placeholder="Email"
                value={details.email}
                onChange={e => handleValueChange(e)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Mobile Number
              </label>
              <PhoneInput
                country={"us"}
                value={phoneNO}
                onChange={(value) => setPhoneNO(value)}
              />
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Date of Birth{" "}
                <i class="fas fa-calendar-week" style={{ color: "black" }} />
              </label>

              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                customInput={<ExampleCustomInput />}
              />
              {/* 
                    </DatePicker> */}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Designation
              </label>

              <select
                style={{ border: showError ? details.designation.length === 0 ? " 1px solid red" : null : null }}
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="designation"
                value={details.designation}
                onChange={e => handleValueChange(e)}
              >
                <option selected>Choose Designation</option>
                {/* <option value="1" ><div><input
                class="form-check-input" type="checkbox"
                id="flexCheckChecked"
              
              /></div> </option> */}
              {
                designations.length > 0 ? designations.map(value => <option value={value.id}>{value.designation_name}</option>) : null
              }
                {/* <option value="2">Tester</option>
                <option value="3">Designer</option> */}
              </select>
              
            </div>
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Role
              </label>
              <select
                style={{ border: showError ? details.role.length === 0 ? " 1px solid red" : null : null }}
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="role"
                value={details.role}
                onChange={e => handleRoleChange(e)}
              >         
                <option selected>Choose Role</option>
                {roles.length > 0 && roles.map(value =>  <option value={value.id} style={{color: details.role === value.id ? "blue" : null}}>{value.roleName}</option>)}
                {/* <option value="SA" style={{color: details.role.includes("SA") ? "blue" : null}}>Select all</option>

                <option value="1" style={{color: details.role.includes("1") ? "blue" : null}}>Lead</option>
                <option value="2" style={{color: details.role.includes("2") ? "blue" : null}}>QA Lead</option>
                <option value="3" style={{color: details.role.includes("3") ? "blue" : null}}>Fresher</option> */}
              </select>
            </div>
          </div>
          <div className="row">
            <label
              class="form-check-label reg-lable"
              for="exampleCheck1"
              style={{
                fontSize: "25px",
                fontWeight: "700",
                marginLeft: "1%",
                marginTop: "1%",
              }}
            >
              Advance Setting
            </label>
          </div>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Manager
              </label>

              <select
                style={{ border: showError ? details.manager.length === 0 ? " 1px solid red" : null : null }}
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="manager"
                value={details.manager}
                onChange={e => handleValueChange(e)}
              >
                <option selected> Choose Manager</option>
                <option value="Manager">Manager</option>
                <option value="Assistant Manager">Assistant Manager</option>
                <option value="Juniar Manager">Juniar Manager</option>
              </select>
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Screenshot Recurrence(in Min)
              </label>
              <select
                style={{ border: showError ? details.screenshot.length === 0 ? " 1px solid red" : null : null }}
                class="form-select"
                id="inputGroupSelect03"
                aria-label="Example select with button addon"
                name="screenshot"
                value={details.screenshot}
                onChange={e => handleValueChange(e)}
              >
                <option selected>Choose ScreenShot</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </form>
        <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
            <button className="btn  float-left" type="submit" onClick={()=>{routeChange();cleardetails()}}>
              Cancel
            </button>
            <button onClick={() => handleNext()} className="btn  float-left" type="submit" style={{ backgroundColor: "#25344b" }}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
