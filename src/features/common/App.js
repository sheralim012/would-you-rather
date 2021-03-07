import React from 'react';
import Nav from "./Nav";
import {ToastContainer} from "react-toastify";
import Routes from "./Routes";

function App() {
    return (
        <div className="container">
            <ToastContainer/>
            <Nav/>
            <Routes/>
        </div>
    );
}

export default App;
