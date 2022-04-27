import React from 'react';
import {Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" to="#">
                CineEra
            </Link>
            
            <div className="collapse navbar-collapse" id="navbarSupportedContent">                   
                <NavLink className="nav-link nav-item" aria-current="page" to="/movies"> Movies</NavLink>
                <NavLink className="nav-link nav-item" aria-current="page" to="/customers"> Customers</NavLink>
                <NavLink className="nav-link nav-item" aria-current="page" to="rentals"> Pricing </NavLink>
                <NavLink className="nav-link nav-item" aria-current="page" to="login"> Login </NavLink>
                <NavLink className="nav-link nav-item" aria-current="page" to="register"> Register </NavLink>
            </div>
        </div>
        </nav>        
     );
}
 
export default NavBar;
