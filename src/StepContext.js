import React,{createContext, useState}from 'react'
import Routes from './router';
import { Provider } from 'react-redux';


export const  Multistepcontext = createContext();

const Stepcontext = () => {
    const [userData ,setUserData] = useState([]);
    const [finalData ,setFinalData] = useState([]);
    const [currentStep,setCurrentStep] = useState(1);
    const [page , setPage] = useState(1);


    const backpackClick = (currentStep) =>{
            setPage(currentStep)
          }
    

    function omit() {

    }

    return (
        <div>
            <Multistepcontext.Provider value={{ page , setPage , userData ,setUserData ,finalData ,setFinalData , currentStep ,setCurrentStep ,backpackClick}}>
                <Routes />
            </Multistepcontext.Provider>
        </div>
    )
}

export default Stepcontext;