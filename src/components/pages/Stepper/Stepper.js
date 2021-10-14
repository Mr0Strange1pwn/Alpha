import React ,{useState ,useContext} from 'react'
import { Stepper ,Step ,stepClassName} from 'react-form-stepper';
import {Multistepcontext} from './../../../StepContext';
import Documents from "./../Employee/Registration/Documents";
import Registration from "./../Employee/Registration";
import Employee from "./../Employee";
import Header from "./../Header/Header";
import SteponeImage from  "./../../NewImages/Step1-h.png"
import SteptwoImage from  "./../../NewImages/Step2-h.png"
import StepthreeImage from "./../../NewImages/Step3-h.png"
import StepfourImage from "./../../NewImages/Step4-h.png"
import "./Stepper.css";
import Payroll from '../Employee/Registration/Payroll';
import JobDetails from '../Employee/Registration/JobDetails';


  
    const FirstStepper =() => {

      
const {page ,currentStep , finalData ,setCurrentStep} = useContext(Multistepcontext);



const boxstyle = {
            backgroundImage: "url(" + SteponeImage + ")",
            border:"3px solid #f07238",
            borderStyle:"dashed",
          }
const boxstylehr = {
            borderTop:"3px solid #f07238",
            borderStyle:"dashed",
          }
const MakeInv = {
            display:"none"
          }
          
const boxstyletwo = {
  backgroundImage: "url(" + SteptwoImage + ")",
  border:"3px solid #f07238",
  borderStyle:"dashed"
}

const boxstylethree = {
  backgroundImage: "url(" + StepthreeImage + ")",
  border:"3px solid #f07238",
  borderStyle:"dashed"
}
const boxstylefour = {
    backgroundImage: "url(" + StepfourImage + ")",
    border:"3px solid #f07238",
    borderStyle:"dashed"
  }


          const stpstyle = {
            opacity:"0",
             marginTop:"50px",
             fontcolor:"darkblue",
             fontweight:"800"
          }
        
          const ststyle = {
            opacity:"0",
             marginTop:"100px"
          }
          function showstep(Step){
            switch(currentStep) {
              case 1:
                return  <Registration />
              case 2:
                return  <Documents />
              case 3:
                return   <Payroll />
              case 4:
                return   <JobDetails />
            }
         }
console.log("currentStep",currentStep)
    return ( 
      <>  
      {page ===1?(
        <div> 
        <Header headerName="Registration" />
          <div>
<div className="center-stepper">
  <Stepper style={{width:"90%"}} activeStep={currentStep}  orientation="horizontal">
  <div className="cen">
<div className="frame"><div className="setperDiv"  style={boxstyle}></div><Step style={ststyle}  label={currentStep==1?<span style={{color:"red"}}>1.General Details</span>:""} /></div><hr style={boxstylehr} className="new2" /> 
<div className="gframe"><div className="setper-two"></div><Step  style={stpstyle}  label="2.Documents"  /></div><hr className="new2" />
<div className="hframe"><div className="setper-three"></div><Step style={stpstyle}  label="3.Payroll" /></div><hr className="new2" />
<div className="iframe"><div className="setper-four"></div><Step  style={stpstyle}  label="4.Job Details" /></div></div>
  </Stepper>
  </div>
 {showstep(1)}
 </div>
 </div>
      ) 
  :page ===2?(
        <div> 
        <Header headerName="Registration" />
          <div>
<div className="center-stepper">
  <Stepper style={{width:"90%"}} activeStep={currentStep}  orientation="horizontal">
  <div className="cen">
<div className="frame"><div className="setperDiv" style={boxstyle}></div><Step style={ststyle} label={currentStep==2?<span style={{color:"red"}}>1.General Details</span>:""} /></div><hr  style={boxstylehr} className="new2" /> 
<div className="gframe"><div className="setper-two" style={boxstyletwo}></div><Step  style={stpstyle} label={currentStep==2?<span style={{color:"red"}}>2.Documents</span>:""}   /></div><hr  style={boxstylehr} className="new2" />
<div className="hframe"><div className="setper-three"></div><Step style={stpstyle}  label="3.Payroll" /></div><hr className="new2" />
<div className="iframe"><div className="setper-four"></div><Step  style={stpstyle}  label="4.Job Details" /></div></div>
  </Stepper>
  </div>
 {showstep(1)}
 </div>
 </div>
  ):page ===3? (<div> 
    <Header headerName="Registration" />
      <div>
<div className="center-stepper">
<Stepper style={{width:"90%"}} activeStep={currentStep}  orientation="horizontal">
<div className="cen">
<div className="frame"><div className="setperDiv"  style={boxstyle}></div><Step style={ststyle} label={currentStep==3?<span style={{color:"red"}}>1.General Details</span>:""} /></div><hr style={boxstylehr} className="new2" /> 
<div className="gframe"><div className="setper-two" style={boxstyletwo}></div><Step  style={stpstyle}  label={currentStep==3?<span style={{color:"red"}}>2.Documents</span>:""}  /></div><hr style={boxstylehr} className="new2" />
<div className="hframe"><div className="setper-three" style={boxstylethree}></div><Step style={stpstyle}  label={currentStep==3?<span style={{color:"red"}}>3.Payroll</span>:""} /></div><hr style={boxstylehr} className="new2" />
<div className="iframe"><div className="setper-four"></div><Step  style={stpstyle}  label="4.Job Details" /></div></div>
</Stepper>
</div>
{showstep(1)}
</div>
</div>)
:page ===4? (<div> 
    <Header headerName="Registration" />
      <div>
<div className="center-stepper">
<Stepper style={{width:"90%"}} activeStep={currentStep}  orientation="horizontal">
<div className="cen">
<div className="frame"><div className="setperDiv" style={boxstyle}></div><Step style={ststyle} label={currentStep==4?<span style={{color:"red"}}>1.General Details</span>:""} /></div><hr style={boxstylehr} className="new2" /> 
<div className="gframe"><div className="setper-two" style={boxstyletwo}></div><Step  style={stpstyle}  label={currentStep==4?<span style={{color:"red"}}>2.Documents</span>:""} /></div><hr style={boxstylehr} className="new2" />
<div className="hframe"><div className="setper-three" style={boxstylethree}></div><Step style={stpstyle}  label={currentStep==4?<span style={{color:"red"}}>3.Payroll</span>:""} /></div><hr style={boxstylehr}  className="new2" />
<div className="iframe"><div className="setper-four" style={boxstylefour}></div><Step  style={stpstyle}  label={currentStep==4?<span style={{color:"red"}}>4.Job Details</span>:""} /></div></div>
</Stepper>
</div>
{showstep(1)}
</div>
</div>)
:<div>
<Header headerName="Registration" />
          <div>
<div className="center-stepper">
  <Stepper style={{width:"90%"}} activeStep={currentStep}  orientation="horizontal">
  <div className="cen">
<div className="frame" ><Step style={ststyle} label="1.General Details" /></div><hr className="new2" /> 
<div className="gframe"><Step  style={stpstyle}  label="2.Documents"  /></div><hr className="new2" />
<div className="hframe"><Step style={stpstyle}  label="3.Payroll" /></div><hr className="new2" />
<div className="iframe"><Step  style={stpstyle}  label="4.Job Details" /></div></div>
  </Stepper>
  </div>
 {showstep(1)}
 </div>
</div>
    }
      </>
        
    ) 
}
    


export default FirstStepper