import React from 'react'
import { NavLink } from 'react-router-dom'



const Header = () => {
    
    return (
        <nav className="navbar bg-dark justify-content-center" style={{backgroundColor:"grey"}}>

            <li className="nav-link ">
                <NavLink to="/Dashboard" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    All Profiles
                </NavLink>
            </li>

            {localStorage.getItem('clgId')[0] === 'A' ?
           
                <li className="nav-link ">
                    <NavLink to="/aluminiprofile" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                        My Profile
                    </NavLink>
                </li>
            :
                <li className="nav-link ">
                    <NavLink to="/myprofile" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                        My Profile
                    </NavLink>
                </li>

            }

            <li className="nav-link">
                <NavLink to="/languages" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Courses
                </NavLink>
            </li>

            <li className="nav-link">
                <NavLink to="/mentors" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Mentors
                </NavLink>
            </li>
            
            <li className="nav-link ">
                <NavLink to="/project" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    student Projects
                </NavLink>
            </li>

            <li className="nav-link">
                <NavLink to="/requirements" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Any requirements
                </NavLink>
            </li>

            <li className="nav-link">
                <NavLink to="/contact" className="nav-link" style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    More...
                </NavLink>
            </li>
            
            <li className="nav-link">
                <NavLink to="/login" onClick={()=>localStorage.clear()} style={({ isActive }) => ({ color: isActive ? 'orange' : 'white' })}>
                    Logout
                </NavLink>
            </li>

        </nav>
    )
}

export default Header
