import React, { useState, useEffect } from "react";
import "./milestone.css"
import axios from "axios";
import { Link ,useParams, useHistory } from "react-router-dom";
import AlertModel from "../../../common/AlertModel.js"
import Task from "./../Task"
import Modal from "../../../common/Model";
import DatePicker from "react-datepicker";

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

 const MileStone = (props) => {
    const { id } = useParams();
    const [student, setStudent] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [ids,setID]=useState()
    const [isOpen , setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [item, setItem] = useState({
        id:"",
        name:"",
        status:"",
        amount:""
    });
   
    const [data,setData]=useState([])
    console.log("data",data)
    useEffect(() => {
      getAllStudent();
    }, []);
  
    useEffect(() => {
        getAllStudent()
    }, [])
  
const handleChange = (e) => {
    setItem({...item,id:new Date().getTime().toString(), [e.target.name]: e.target.value})

}
const handleSave = () => {
     const newData ={
        id: new Date().getTime().toString(),
        item
     }
    setData([...data,item])
    setIsOpen(false)
}

    async function getAllStudent() {
      try {
        const student = await axios.get("http://localhost:3003/posts");
        setStudent(student.data);
      } catch (error) {
        console.log("something is wrong");
      }
    }

    const deleteItems = (index) => {
        const updateditems = data.filter((elem) => {
          return index !== elem.id;
        });
        setData(updateditems);
        console.log("updateditems",updateditems)
      };
    const delAlert=(id)=> {
      setModalOpen(true)
        setID(id)
    }
  
    const handleDelete = async (id) => {
      await axios.delete(`http://localhost:3003/posts/${id}`);
      var newstudent = student.filter((item) => {
        return item.id !== id;
      });
        setModalOpen(false)
      setStudent(newstudent);
    };
  
    return (
      <div className="milestone-header">
        {modalOpen ? <AlertModel setOpenModal={setModalOpen} handleDelete={(id)=>handleDelete(id)} id={ids}/>:      <div className="main">
          <div  style={{ textAlign: "-webkit-right"}}>
                  <button
                    className="btn btn-outline-success float-right"
                    style={{ backgroundColor: "#003366", color: "white" }}
                    type="submit"
                    onClick={()=>setIsOpen(true)}
                  >
                    Add MileStone
                  </button>
            </div>
  <div>

  <Modal open={isOpen} onClose={()=> setIsOpen(false)}>
      <div style={{marginTop:"10%"}}>
         <div style={{ textAlignLast: "center"}}><h4>Add MileStone</h4></div>
         <div style={{margin:"auto",width:"90%"}}>
         <div className="row">
             <div className="col-md-6">
             <label class="form-check-label reg-lable" for="exampleCheck1">
                Name
              </label>
              <input
                type="text"
                id="fname"
                name="name"
                placeholder="Name"
                onChange={(e) => handleChange(e)}
              />
             </div>
             <div className="col-md-6">
             <label class="form-check-label reg-lable" for="exampleCheck1">
               Status
              </label>
              <input
                type="text"
                id="fname"
                name="status"
                placeholder="Status"
                onChange={(e) => handleChange(e)}
              />
             </div>
         </div>
         <div className="row">
             <div className="col-md-6">
             <label class="form-check-label reg-lable" for="exampleCheck1">
                Amount
              </label>
              <input
                type="text"
                id="fname"
                name="amount"
                placeholder="Amount"
                onChange={(e) => handleChange(e)}
              />
             </div>
             <div className="col-md-6">
             <label class="form-check-label reg-lable" for="exampleCheck1">
              Release Date
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
         
         <div className="modalButton" style={{    textAlignLast: "right", marginTop:"10px"}}>
          <button type="button"  className="btn"
          style={{ backgroundColor: "#003366", color: "white" }}
           type="submit" onClick={() =>handleSave()} >Save</button><span>  </span>
		<button type="button"className="btn"
          style={{backgroundColor:" #717171", color:"white"}}
          type="submit"  onClick={()=> setIsOpen(false)} >Back</button>
        </div>
         </div>
         </div>
         </Modal>

  </div>
          <div class="milestone-container">
            <div class="row">
              <div class="col">
                <p>
                 Name
                </p>
              </div>
              <div class="col">
                <p>
                 Amount
                </p>
              </div>
              <div class="col">
                <p>
                Status
                </p>
              </div>
              <div class="col">
                <p style={{marginLeft: "30%"}}>Actions</p>
              </div>
            </div>
          </div>
          {data.map((students, i) => {
            return (
              <div class="milecontainer">
                <div className="row mile-row" key={i}>
                  <div class="col">
                    {/* <p >{i + 1}</p> */}
                    <p>{students.name}</p>
                  </div>
                  <div class="col">
                    <p>{students.amount}</p>
                  </div>
                  <div class="col">
                    <p>{students.status}</p>
                  </div>
                  <div class="col " >
                    <div>
                    <button
                      className="action_image"
                      onClick={() => deleteItems(students.id)}
                    >
                      <img src="images/Del.png" alt="logo" />
                    </button>

                    <button
                      className="action_image"
                    >
                     <img
                        className="action_image"
                        src="images/Edit.png"
                        alt="logo"
                      />
                    
                    </button>
                    <button
                      className="action_image"
                      onClick={props.handleTask}
                    >
                    <img
                        src="images/Tasks.png"
                        alt="Project-info-icon"
                        style={{backgroundColor:"#f07238"}}
                    />
                    </button>
                    </div>
                   
                  </div>
                </div>
              </div>
            );
          })}
        </div>}
  
      </div>
    );
  };
export default MileStone