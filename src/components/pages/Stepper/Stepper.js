import React, { useContext } from "react";
import { Stepper, Step } from "react-form-stepper";
import { Multistepcontext } from "./../../../StepContext";
import Documents from "./../Employee/Registration/Documents";
import Registration from "./../Employee/Registration";
import Header from "./../Header/Header";
import "./Stepper.css";
import Payroll from "../Employee/Registration/Payroll";
import JobDetails from "../Employee/Registration/JobDetails";

const FirstStepper = () => {
  const { page, currentStep} =
    useContext(Multistepcontext);

  const boxstyle = {
    backgroundImage: "url(images/Step1.png)",
    border: "3px solid #f07238",
    borderStyle: "dashed",
  };
  const boxstylehr = {
    borderTop: "3px solid #f07238",
    borderStyle: "dashed",
  };

  const boxstyletwo = {
    backgroundImage: "url(images/Step2.png)",
    border: "3px solid #f07238",
    borderStyle: "dashed",
    
  };

  const boxstylethree = {
    backgroundImage: "url(images/Step3.png)",
    border: "3px solid #f07238",
    borderStyle: "dashed",
  };
  const boxstylefour = {
    backgroundImage: "url(images/Step4.png)",
    border: "3px solid #f07238",
    borderStyle: "dashed",
  };

  const stpstyle = {
    opacity: "0",
    marginTop: "50px",
    fontcolor: "darkblue",
    fontweight: "800",
  };

  const ststyle = {
    opacity: "0",
    marginTop: "100px",
  };
  function showstep(Step) {
    switch (currentStep) {
      case 1:
        return <Registration />;
      case 2:
        return <Documents />;
      case 3:
        return <Payroll />;
      case 4:
        return <JobDetails />;
    }
  }
  return (
    <>
      {page === 1 ? (
        <div>
          <Header headerName="Registration" />
          <div>
            <div className="center-stepper">
              <Stepper
                style={{ width: "90%" }}
                activeStep={currentStep}
                orientation="horizontal"
              >
                <div className="cen">
                  <div className="frame">
                    <div className="setperDiv" style={boxstyle}></div>
                    <Step
                      style={ststyle}
                      label={
                        currentStep === 1 ? (
                          <span style={{ color: "red" }}>
                            1.General Details
                          </span>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <hr style={boxstylehr} className="new2" />
                  <div className="gframe">
                    <div className="setper-two" style={{
                      backgroundImage: "url(images/Step2.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundOrigin: "content-box",
                      alignItems: "center",
                      backgroundPosition: "center"}}></div>
                    <Step style={stpstyle} label="2.Documents" />
                  </div>
                  <hr className="new2" />
                  <div className="hframe">
                    <div className="setper-three"  style={{
                      backgroundImage: "url(images/Step3.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundOrigin: "content-box",
                      alignItems: "center",
                      backgroundPosition: "center"}}></div>
                    <Step style={stpstyle} label="3.Payroll" />
                  </div>
                  <hr className="new2" />
                  <div className="iframe">
                    <div className="setper-four"  style={{
                      backgroundImage: "url(images/Step4.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundOrigin: "content-box",
                      alignItems: "center",
                      backgroundPosition: "center"}} ></div>
                    <Step style={stpstyle} label="4.Job Details" />
                  </div>
                </div>
              </Stepper>
            </div>
            {showstep(1)}
          </div>
        </div>
      ) : page === 2 ? (
        <div>
          <Header headerName="Registration" />
          <div>
            <div className="center-stepper">
              <Stepper
                style={{ width: "90%" }}
                activeStep={currentStep}
                orientation="horizontal"
              >
                <div className="cen">
                  <div className="frame">
                    <div className="setperDiv" style={boxstyle}></div>
                    <Step
                      style={ststyle}
                      label={
                        currentStep === 2 ? (
                          <span style={{ color: "red" }}>
                            1.General Details
                          </span>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <hr style={boxstylehr} className="new2" />
                  <div className="gframe">
                    <div className="setper-two" style={boxstyletwo}></div>
                    <Step
                      style={stpstyle}
                      label={
                        currentStep === 2 ? (
                          <span style={{ color: "red" }}>2.Documents</span>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <hr style={boxstylehr} className="new2" />
                  <div className="hframe">
                    <div className="setper-three" style={{
                      backgroundImage: "url(images/Step3.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition:"10px 10px",
                      backgroundOrigin: "content-box",
                      alignItems: "center",
                      backgroundPosition: "center"}}></div>
                    <Step style={stpstyle} label="3.Payroll" />
                  </div>
                  <hr className="new2" />
                  <div className="iframe">
                    <div className="setper-four"  style={{
                      backgroundImage: "url(images/Step4.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundOrigin: "content-box",
                      alignItems: "center",
                      backgroundPosition: "center"}}></div>
                    <Step style={stpstyle} label="4.Job Details" />
                  </div>
                </div>
              </Stepper>
            </div>
            {showstep(1)}
          </div>
        </div>
      ) : page === 3 ? (
        <div>
          <Header headerName="Registration" />
          <div>
            <div className="center-stepper">
              <Stepper
                style={{ width: "90%" }}
                activeStep={currentStep}
                orientation="horizontal"
              >
                <div className="cen">
                  <div className="frame">
                    <div className="setperDiv" style={boxstyle}></div>
                    <Step
                      style={ststyle}
                      label={
                        currentStep === 3 ? (
                          <span style={{ color: "red" }}>
                            1.General Details
                          </span>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <hr style={boxstylehr} className="new2" />
                  <div className="gframe">
                    <div className="setper-two" style={boxstyletwo}></div>
                    <Step
                      style={stpstyle}
                      label={
                        currentStep === 3 ? (
                          <span style={{ color: "red" }}>2.Documents</span>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <hr style={boxstylehr} className="new2" />
                  <div className="hframe">
                    <div className="setper-three" style={boxstylethree}></div>
                    <Step
                      style={stpstyle}
                      label={
                        currentStep === 3 ? (
                          <span style={{ color: "red" }}>3.Payroll</span>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <hr style={boxstylehr} className="new2" />
                  <div className="iframe">
                    <div className="setper-four"  style={{
                      backgroundImage: "url(images/Step4.png)",
                      backgroundRepeat: "no-repeat",
                      backgroundOrigin: "content-box",
                      alignItems: "center",
                      backgroundPosition: "center"}}></div>
                    <Step style={stpstyle} label="4.Job Details" />
                  </div>
                </div>
              </Stepper>
            </div>
            {showstep(1)}
          </div>
        </div>
      ) : page === 4 ? (
        <div>
          <Header headerName="Registration" />
          <div>
            <div className="center-stepper">
              <Stepper
                style={{ width: "90%" }}
                activeStep={currentStep}
                orientation="horizontal"
              >
                <div className="cen">
                  <div className="frame">
                    <div className="setperDiv" style={boxstyle}></div>
                    <Step
                      style={ststyle}
                      label={
                        currentStep === 4 ? (
                          <span style={{ color: "red" }}>
                            1.General Details
                          </span>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <hr style={boxstylehr} className="new2" />
                  <div className="gframe">
                    <div className="setper-two" style={boxstyletwo}></div>
                    <Step
                      style={stpstyle}
                      label={
                        currentStep === 4 ? (
                          <span style={{ color: "red" }}>2.Documents</span>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <hr style={boxstylehr} className="new2" />
                  <div className="hframe">
                    <div className="setper-three" style={boxstylethree}></div>
                    <Step
                      style={stpstyle}
                      label={
                        currentStep === 4 ? (
                          <span style={{ color: "red" }}>3.Payroll</span>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                  <hr style={boxstylehr} className="new2" />
                  <div className="iframe">
                    <div className="setper-four" style={boxstylefour}></div>
                    <Step
                      style={stpstyle}
                      label={
                        currentStep === 4 ? (
                          <span style={{ color: "red" }}>4.Job Details</span>
                        ) : (
                          ""
                        )
                      }
                    />
                  </div>
                </div>
              </Stepper>
            </div>
            {showstep(1)}
          </div>
        </div>
      ) : (
        <div>
          <Header headerName="Registration" />
          <div>
            <div className="center-stepper">
              <Stepper
                style={{ width: "90%" }}
                activeStep={currentStep}
                orientation="horizontal"
              >
                <div className="cen">
                  <div className="frame">
                    <Step style={ststyle} label="1.General Details" />
                  </div>
                  <hr className="new2" />
                  <div className="gframe">
                    <Step style={stpstyle} label="2.Documents" />
                  </div>
                  <hr className="new2" />
                  <div className="hframe">
                    <Step style={stpstyle} label="3.Payroll" />
                  </div>
                  <hr className="new2" />
                  <div className="iframe">
                    <Step style={stpstyle} label="4.Job Details" />
                  </div>
                </div>
              </Stepper>
            </div>
            {showstep(1)}
          </div>
        </div>
      )}
    </>
  );
};

export default FirstStepper;
