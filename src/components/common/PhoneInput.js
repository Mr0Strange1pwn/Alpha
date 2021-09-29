// import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'
// import React, { useState } from "react";
// const PhoneInputNumber=()=> {
//   // `value` will be the parsed phone number in E.164 format.
//   // Example: "+12133734253".
//   const [value, setValue] = useState()
//   return (
//     <PhoneInput
//     ountryCallingCodeEditable={false}
//     layout="second"
//     placeholder="Enter Phone Number"
//     international
   
//       placeholder="Enter phone number"
//       value={value}
//       onChange={setValue}/>
//   )
// }
// export default PhoneInputNumber
// import React, { useState } from "react";
// import PropTypes from 'prop-types'
// import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input'
// import en from 'react-phone-number-input/locale/en.json'

//   const CountrySelect = ({ value, onChange, labels, ...rest }) => (
//     <select
//       {...rest}
//       value={value}
//       onChange={event => console.log(event.target.value)}>
      
//       {getCountries().map((country) => (
        
//         <option key={country} value={getCountryCallingCode(country)}>
//          +{getCountryCallingCode(country)}  {"       "}{labels[country]} 
//         </option>
//       ))}
//     </select>
//   )
  
//   CountrySelect.propTypes = {
//     value: PropTypes.string,
//     onChange: PropTypes.func.isRequired,
//     labels: PropTypes.objectOf(PropTypes.string).isRequired
//   }
//   CountrySelect.propTypes = {
//     value: PropTypes.string,
//     onChange: PropTypes.func.isRequired,
//     labels: PropTypes.objectOf(PropTypes.string).isRequired
//   }
//   const PhoneInputNumber=()=> {
//     const [country, setCountry] = useState()
//     console.log("country",country)
//   return (
//     <CountrySelect
//     labels={en}
//     value={country}
//     onChange={setCountry}/>
//   )

  
// }
// export default PhoneInputNumber