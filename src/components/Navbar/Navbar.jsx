import React from 'react';
import {NavLink} from "react-router-dom";
import './Navbar.css'
import {useKeycloak} from "@react-keycloak/web";

const Navbar = () => {
    const {keycloak} = useKeycloak();
    return (
        <nav className='navbar'>
            <ul className="navbar-items">
                <li><NavLink to="/" className="nav-link">Home</NavLink></li>
                {
                    !keycloak.authenticated && <li><NavLink to="/reg" className="nav-link">Registration</NavLink></li>
                }
                {
                    !!keycloak.authenticated &&  <li><NavLink to="/secured" className="nav-link">Secured Page</NavLink></li>
                }
            </ul>
        </nav>

    )
}


export default Navbar;