import React, { PureComponent } from 'react'
import AsyncSelect from 'react-select/async'

 class Categories extends PureComponent {
   state= {selectedUsers:[]}

   onChange = selectedUsers => {
     this.setState({ 
      selectedUsers : selectedUsers || []
     })
   }
 

    
 
  loadOptions=async (inputText , callback) =>{

    const response = await fetch(`http://localhost:3003/profile?employee${inputText}`)
    const json = await response.json();
    callback(json.map(i => ({label:i.employee ,value:i.id})))
    
  } 
  
renderEveryUser= user => {
     return <p></p>
   }


  render() {
    
    return (
      <div className='users'>
      
        <AsyncSelect
         isMulti
         value={this.state.selectedUsers}
         onChange={this.onChange}
         loadOptions={this.loadOptions}
         theme={
             theme => ({
                 ...theme,
                 borderRadius: 5,
                 width:"60%",
                 DropdownIndicator:{
                   color :'darkblue'
                 },
                 colors :{
                     ...theme.colors,
                     primary25:'green',
                     primary:'ligntblue',
                     neutral0:'#f1f1f1',
                     neutral90:'#f1f1f1'
                 }
             })
         }


         />
 
<div className="row" style={{display:'flex',marginTop:'40px',position:'absolute'}}>{this.state.selectedUsers.map(o => 
                            <div className="col-sm-6" style={{display:'flex'}}><input type="checkbox" className="form-check-input" id="exampleCheck1" style={{backgroundColor:'#f1f1f1',marginLeft:'15px'}} /><span style={{color:'darkBlue',fontWeight:'600',marginLeft:'15px'}}>{o.label}</span><br/></div>
                          )}</div>
      </div>
      
    )
  }
}

export default Categories