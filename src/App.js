
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from "./router"
import { Provider } from 'react-redux'
import store from './redux/store';
import StepContext from './StepContext';
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
        <StepContext>
          <Routes />
        </StepContext>
        </Provider>
      </BrowserRouter>
      
      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </>
  )
}

export default App;
