import './App.css';
import Navigation from "./navigation/Navigation";
import AppRoutes from "./navigation/AppRoutes";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {addAccessTokenInterceptor} from "./API/axiosClient";
import LoadingSpinner from "./components/LoadingSpinner";
import Footer from "./components/Footer";

function App() {

    const { isLoading: auth0Loading, getAccessTokenSilently} = useAuth0()
    const [interceptorAdded, setInterceptorAdded] = useState(false)
    //const interceptorAddedRef = useRef(false);

    useEffect(() => {
        if (!interceptorAdded && !auth0Loading) {
            addAccessTokenInterceptor(getAccessTokenSilently);
            setInterceptorAdded(true)
        }
    }, [getAccessTokenSilently, auth0Loading, interceptorAdded]);


    if(auth0Loading || !interceptorAdded)
        return <LoadingSpinner/>

    return (
        <div className="App">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '88vh'
            }}>
                <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
                <Navigation/>
                <AppRoutes/>
            </div>
            <Footer/>
        </div>
  );
}

export default App;
