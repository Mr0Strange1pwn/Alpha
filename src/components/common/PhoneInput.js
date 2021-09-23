import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import React, { useState } from "react";
const PhoneInputNumber=()=> {
  // `value` will be the parsed phone number in E.164 format.
  // Example: "+12133734253".
  const [value, setValue] = useState()
  return (
    <PhoneInput
    
    
    
    layout="second"
    placeholder="Enter Phone Number"
    international
      defaultCountry="+91"
      placeholder="Enter phone number"
      value={value}
      onChange={setValue}/>
  )
}
export default PhoneInputNumber