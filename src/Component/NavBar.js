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

function NavBar(props) {
    return(
        <div className="navbar">
            <NavLink to="/signup" exact style={link} activeStyle={{background: 'darkblue'}}>Sign Up</NavLink>
            <NavLink to="/trips" exact style={link} activeStyle={{background: 'darkblue'}}>Trips</NavLink>
            <NavLink to="/dashboard" exact style={link} activeStyle={{background: 'darkblue'}} >Dashboard</NavLink>
            {props.user ? <button exact style={link} activestyle={{background: 'darkblue'}} onClick={props.logoutHandler}>Logout</button> :
            <NavLink to="/login" exact style={link} activeStyle={{background: 'darkblue'}}>Login</NavLink>
            }
        </div>

    )
}

export default NavBar;