import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactKeycloakProvider } from "@react-keycloak/web";
import { keycloak } from "./helpers/keycloak"; // Импортируем конфиг
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ReactKeycloakProvider authClient={keycloak} initOptions={{onLoad: "login-required", // Автоматический редирект на страницу входа
        checkLoginIframe: false}}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ReactKeycloakProvider>
);

//
// reportWebVitals();


