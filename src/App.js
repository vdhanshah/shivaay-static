import './App.css';
import React from "react";
import Main from "./containers/Main/Main";

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

function App() {
    return (
        <div className="App">
            <Main/>
        </div>
    );
}

export default App;
