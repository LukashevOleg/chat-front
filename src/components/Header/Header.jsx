import React from 'react';
import Navbar from "../Navbar/Navbar";
import './Header.css'
import Button from "../../ui/Button/Button";
import {useKeycloak} from "@react-keycloak/web";

const Header = () => {
    const {keycloak} = useKeycloak();
    return (
        <header className="header">
            <Navbar/>
            <div>
                {
                    !keycloak.authenticated
                        ? <Button onClick={() => keycloak.login()}>Login</Button>
                        : <Button onClick={() => keycloak.logout()}>Logout</Button>
                }
            </div>
        </header>
    );
};

export default Header;