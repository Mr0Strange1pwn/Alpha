import React ,{useState , useEffect} from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

function View() {

    const { id } = useParams();
    const [students, setStudents] = useState([]);

    useEffect(()=>{
        getStudent();
       },[])
      
       async function getStudent(){
          try{
            const students = await axios.get(`http://localhost:3003/posts/${id}`)
            console.log(students.data)
            setStudents(students.data);
          }catch (error) {
            console.log("something is wrong")
          }
       }
       

    return (
        <div>
            <h1>Hellow List </h1>
            <div className="row">
               <div  className="col"><h1>{students.id}</h1></div>
               <div  className="col"><h1>{students.useremail}</h1></div>
               <div  className="col"><h1>{students.userpassword}</h1></div>
                <div  className="col"><h1>Col</h1></div>
           </div>
        </div>
    )
}

export default View