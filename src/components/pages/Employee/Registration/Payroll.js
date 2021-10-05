import React, { useState ,useContext } from "react";
import Header from "../../Header/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import NumberInput from "../../../common/numberInput"
import {Multistepcontext} from '../../../../StepContext';

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
          padding: "11px",
        }}
      />
    </div>
  );
};
function Payroll() {
  const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState();
  const [showerror ,setError ] =useState(false)
  const {page ,backpackClick ,userData ,currentStep,setUserData ,setFinalData ,setCurrentStep} = useContext(Multistepcontext)
  const [ details, setDetails] =useState({
    annualCtc: "",
    annualCtcThou:"",
    perDayCost: "",
    totalLeaveSL:"",
    totalLeavePL:"",
    
  })

  const handleChange = (e) => {
    setDetails({...details, [e.target.name]:e.target.value})
  }

  const handleNext = () => {
    setError(true)
    if(details.annualCtc && details.perDayCost && details.totalLeavePL && details.totalLeaveSL  && details.annualCtcThou){
      setCurrentStep(4);backpackClick(4)
    }

  }
  const payrollInputStyle = {
    backgroundColor: "#f1f1f1",border:"1px solid #ced4da",borderRadius:".25rem",width: "90%",height: "50px",paddingLeft:"10px"
  }
  return (
    <div>
      {/* <Header headerName="Registration Payroll" /> */}

      <div class="container">
        <form>
          <div className="row">
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Annual CTC
              </label>
              <div className="col-12" style={{ display: "flex" }}>
                <div
                  className="col-6"
                  // style={{ width: "48%", margin: "auto" }}
                >
                  {/* <NumberInput placeholder="Lakh"/> */}
                  <input
                    name="annualCtc"
                    value={details.annualCtc}
                    onChange={e =>handleChange(e)}
                    placeholder="Lakhs"
                    type="number"
                    style={{...payrollInputStyle, border: showerror ? details.annualCtc.length === 0 ? " 1px solid red" : null : null}}
                  />
                </div>

                <div className="col-6">
                {/* <NumberInput placeholder="Thousands"/> */}
                <input
                    name="annualCtcThou"
                    value={details.annualCtcThou}
                    onChange={e=>handleChange(e)}
                    placeholder="Thousands"
                    type="number"
                    style={{...payrollInputStyle, border: showerror ? details.annualCtcThou.length === 0 ? " 1px solid red" : null : null}}
                  />

                </div>
              </div>
            </div>
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Per Day Cost
              </label>

              <input
                style={{border: showerror ? details.perDayCost.length === 0 ? " 1px solid red ": null : null}}
                placeholder="INR"
                type="text"
                id="fname"
                name="perDayCost"
                value={details.perDayCost}
                onChange={e=>handleChange(e)}
              />
             
            </div>
          </div>
          <div className="row">
          <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
               Total Annual Leaves
              </label>
              <div className="col-12" style={{ display: "flex" }}>
                <div
                  className="col-6 ytnStyle"
                  style={{ width: "48%", margin: "auto" }}
                >
                  <input
                    style={{...payrollInputStyle, border: showerror ? details.totalLeavePL.length === 0 ? " 1px solid red ": null : null}}
                    placeholder="PL"
                    type="number"
                    name="totalLeavePL"
                    value={details.totalLeavePL}
                    onChange={e=> handleChange(e)}
                  />
                </div>

                <div className="col-6">
                {/* <NumberInput placeholder="SL" /> */}
                <input
                    style={{...payrollInputStyle, border: showerror ? details.totalLeaveSL.length === 0 ? " 1px solid red ": null : null}}
                    placeholder="SL"
                    type="number"
                    name="totalLeaveSL"
                    value={details.totalLeaveSL}
                    onChange={e => handleChange(e)}
                  />
                </div>
              </div>
            </div>

            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
               Date of Joining
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
            </div>
          </div>
        </form>
        <div className="d-grid gap-2 d-md-block">
          <div className="addrole_Button">
          <button onClick={()=>{setCurrentStep(2);backpackClick(2)}} className="btn  float-left" type="submit">
              Back
            </button>
            <button className="btn  float-left" onClick={()=>handleNext()} type="submit" style={{backgroundColor:"#25344b"}}>
              Next
            </button>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payroll;
