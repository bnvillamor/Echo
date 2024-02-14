import React, { Fragment } from "react";
import './App.css';

//components
import AddUser from "./components/AddUser";

function App() {
  return (
    <Fragment>
      <div className='container'>
        <AddUser />
      </div>
    </Fragment>
  );
}

export default App;
