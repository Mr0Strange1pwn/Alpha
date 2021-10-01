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

  const {page ,backpackClick ,userData ,currentStep,setUserData ,setFinalData ,setCurrentStep} = useContext(Multistepcontext)


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
                    placeholder="Lakhs"
                    type="number"
                    style={{backgroundColor: "#f1f1f1",border:"1px solid #ced4da",borderRadius:".25rem",width: "90%",height: "50px",paddingLeft:"10px"}}
                  />
                </div>

                <div className="col-6">
                {/* <NumberInput placeholder="Thousands"/> */}
                <input
                    placeholder="Thousands"
                    type="number"
                    style={{backgroundColor: "#f1f1f1",border:"1px solid #ced4da",borderRadius:".25rem",width: "90%",height: "50px",paddingLeft:"10px"}}
                  />

                </div>
              </div>
            </div>
            <div className="col">
              <label class="form-check-label reg-lable" for="exampleCheck1">
                Per Day Cost
              </label>

              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="INR"
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
                  {/* <NumberInput placeholder="PL"/> */}
                  <input
                    placeholder="PL"
                    type="number"
                    style={{paddingLeft:"10px",backgroundColor: "#f1f1f1",border:"1px solid #ced4da",borderRadius:".25rem",width: "90%",height: "50px"}}
                  />
                </div>

                <div className="col-6">
                {/* <NumberInput placeholder="SL" /> */}
                <input
                    placeholder="SL"
                    type="number"
                   style={{paddingLeft:"10px",backgroundColor: "#f1f1f1",border:"1px solid #ced4da",borderRadius:".25rem",width: "90%",height: "50px"}}
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
            <button className="btn  float-left" onClick={()=>{setCurrentStep(4);backpackClick(4)}} type="submit" style={{backgroundColor:"#25344b"}}>
              Next
            </button>
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payroll;
