import './App.css';
import Navigation from "./navigation/Navigation";
import AppRoutes from "./navigation/AppRoutes";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import React, {useEffect, useRef} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {addAccessTokenInterceptor} from "./API/axiosClient";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {

    const { getAccessTokenSilently } = useAuth0();
    const {isLoading: auth0Loading} = useAuth0()
    const interceptorAddedRef = useRef(false);

    useEffect(() => {
        if (!interceptorAddedRef.current && !auth0Loading) {
            addAccessTokenInterceptor(getAccessTokenSilently);
            interceptorAddedRef.current = true;
        }
    }, [getAccessTokenSilently, auth0Loading]);

    if(auth0Loading)
        return <LoadingSpinner/>

    return (
        <div className="App">
            <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
            <Navigation/>
            <AppRoutes/>
        </div>
  );
}

export default App;
