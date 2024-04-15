import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './global.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './override.css';
import Auth0ProviderWithNavigate from "./auth/Auth0ProviderWithNavigate";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Auth0ProviderWithNavigate>
              <App />
          </Auth0ProviderWithNavigate>
      </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
