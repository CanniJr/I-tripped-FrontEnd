import React from 'react';
import { NavLink } from 'react-router-dom';

const link = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'blue',
    textDecoration: 'none',
    color: 'white',
  }

function NavBar() {
    return(
        <div className="navbar">
            <NavLink to="/signup" exact style={link} activeStyle={{background: 'darkblue'}}>Sign Up</NavLink>

        </div>

    )
}

export default NavBar;