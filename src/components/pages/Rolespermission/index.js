import React ,{useState} from 'react'
import "./Rolespermission.css";
import {useSelector , useDispatch} from "react-redux";


function Rolespermission() {

const {toggle} = useSelector( store=>store.auth)
const dispatch = useDispatch()



// const [change, setChange] = useState(false);


//  const clickHandle = () => {
//   //  setChange(true)
//   dispatch({type: "ON"})
//  }
 const btnStyle = {
//  marginLeft:'20%'
 }
 if(toggle){
//  btnStyle.marginLeft = '5%'
 }

console.log(toggle);

    return (
        <div className="main"  style={btnStyle}  >
            <h5>Roles</h5>

            <div><table className="table table-bordered">
                    <thead className="table-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table></div>
   

        </div>
    )
}

export default Rolespermission