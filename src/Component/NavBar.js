import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css'
// import { Button } from './Button.js'



function NavBar(props) {

    const [click, setClick] = useState(false);

    const clickHandler = () => setClick(!click)
    const closeMenu = () => setClick(false)

  
        return(
            <>
                <nav className="navbar"> 
                    <div className="navbar-container">
                        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
                            TRPD <i className="fab fa-typo3" />
                        </NavLink>
                        <div className="menu-icon" onClick={clickHandler}>
                            <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                        </div>

                        {/* NavBar buttons */}
                        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                            <li className='nav-item'>
                                <NavLink to="/" className="nav-links" onClick={closeMenu}>Home</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to="/trips" className="nav-links" onClick={closeMenu}>Trips</NavLink>
                            </li>
                            <li className='nav-item'>
                                <NavLink to="/dashboard" className="nav-links" onClick={closeMenu}>Dashboard</NavLink>
                            </li>
                            {props.user ? 
                            <li className="nav-item" onClick={props.logoutHandler} >
                                <p onClick={closeMenu} className="nav-links">Logout</p>
                                </li> :
                            <li className="nav-item">
                                <NavLink to="/login" className="nav-links" onClick={closeMenu}>Login</NavLink>
                            </li>
                            }
                            {!props.user ? 
                            <li className='nav-item'>
                                <NavLink to="/signup" className="nav-links-mobile" onClick={closeMenu}>Sign Up</NavLink>
                             </li>
                            : null }   
                        </ul>
                    </div>
                </nav>
            </>
        )
}

export default NavBar;