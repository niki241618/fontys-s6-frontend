import './App.css';
import Navigation from "./navigation/Navigation";
import AppRoutes from "./navigation/AppRoutes";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import React from "react";

function App() {
  return (
    <div className="App">
        <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
        <Navigation/>
        <AppRoutes/>
    </div>
  );
}

export default App;
