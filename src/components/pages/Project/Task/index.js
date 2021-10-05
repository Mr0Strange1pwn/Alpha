import React, {useState} from 'react'
import { Link, useParams, useHistory } from "react-router-dom";
import proimage from "./../../../NewImages/ProImageiconone.png";
import proimagePlus from "./../../../NewImages/plusiconimage.png";

 const  Task = () => {
    const [task, setTask] = useState(false);
    const [InputData, setInputData] = useState("");
    const [Items, setItems] = useState([]);
    const handleTask = () => {
        setTask(!task);
       
      };
      const addItems = (e) => {
        e.preventDefault();
        if (!InputData) {
        } else {
          setItems([...Items, InputData]);
          setInputData("");
        }
      };
      const deleteItems = (id) => {
        console.log(id);
        const updateditems = Items.filter((elem, i) => {
          return i !== id;
        });
        setItems(updateditems);
      };
    return (
        <div>
        <div class="project-container">
          <div class="row">
            <div className="col" style={{ display: "flex" }}>
              <img
                src="images/Tasks.png"
                alt="Project-info-icon"
                style={{ padding: "8px" }}
              />
              <label
                class="form-check-label reg-lable"
                for="exampleCheck1"
                style={{ marginLeft: "10px", color: "white" }}
              >
                Tasks
              </label>
            </div>
            <div className="col" style={{ display: "contents" }}>
              <img
                src={
                  task == true
                    ? "images/downicon.png"
                    : "images/forwardicon.png"
                }
                onClick={handleTask}
                style={{ marginRight: "10px", padding: "8px" }}
                alt="Project-info-icon"
              />
            </div>
          </div>
        </div>
        {task == true ? (
          <div className="project-card">
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <label
                      class="form-check-label reg-lable"
                      for="exampleCheck1"
                    >
                      Name
                    </label>
                    <div style={{ display: "flex" }}>
                      <input
                        style={{ backgroundColor: "white" }}
                        type="text"
                        id="fname"
                        name="firstname"
                        placeholder="Name"
                        value={InputData}
                        onChange={(e) => setInputData(e.target.value)}
                      />
                      <button
                        className="btn"
                        className="changebtn"
                        onClick={addItems}
                        type="submit"
                        style={{ backgroundColor: "#25344b" }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="ShowItems">
                    <div className="labaddtwo">
                      <label style={{ fontWeight: "700" }}>Tasks</label>
                    </div>
                    {Items.map((elem, i) => {
                      return (
                        <div class="doccontainernew">
                          <div class="row" key={i}>
                            <div class="col">
                              <p
                                style={{
                                  color: "black",
                                  textAlign: "justify",
                                }}
                              >
                                {elem}
                              </p>
                            </div>

                            <div class="col">
                              <button
                                className="dustbin_image"
                                onClick={() => deleteItems(i)}
                              >
                                <img src={proimage} alt="logo" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    )
}
export default Task