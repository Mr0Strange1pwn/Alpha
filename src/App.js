
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from "./router"
import { Provider } from 'react-redux'
import store from './redux/store';
import StepContext from './StepContext';

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
    </>
  )
}

export default App;
