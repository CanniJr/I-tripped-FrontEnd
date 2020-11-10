import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from './Button.js'
import './NavBar.css'



function NavBar(props) {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true)

    const clickHandler = () => setClick(!click)
    const closeMenu = () => setClick(false)

    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true)
        }
    };

    useEffect(() => {
        showButton();
    }, [])

    window.addEventListener('resize', showButton);

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
                                <p onClick={closeMenu} className="nav-item">Logout</p>
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