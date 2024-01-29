import React, { Fragment } from "react";
import './App.css';

//components
import AddListing from "./components/AddListing";

function App() {
  return (
    <Fragment>
      <div className='container'>
        <AddListing />
      </div>
    </Fragment>
  );
}

export default App;
