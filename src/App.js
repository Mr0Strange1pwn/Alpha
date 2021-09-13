
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from "./router"
import { Provider } from 'react-redux'
import store from './redux/store';

function App() {

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Routes />
        </Provider>
      </BrowserRouter>
    </>
  )
}

export default App;
