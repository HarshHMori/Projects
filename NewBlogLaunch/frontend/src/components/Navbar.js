import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap JS is imported

const Navbar = ({ isLogin, username, handleLogout, setIsLogin, setUsername }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // Check if user data is available in localStorage and set the state accordingly
        const storedUsername = localStorage.getItem('username');
        const loginStatus = localStorage.getItem('isLogin');

        // Set username and isLogin if they exist in localStorage
        if (loginStatus && storedUsername) {
            setUsername(storedUsername);
            setIsLogin(true);
        } else {
            setIsLogin(false); // User is not logged in, so we ensure it reflects that
        }
    }, [setIsLogin, setUsername]);

    // Toggle dropdown for the user menu
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // Handle click outside to close the dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".dropdown")) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><strong>Blog Launch</strong></Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/" activeClassName="active">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/blog" activeClassName="active">Blog</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" exact to="/about" activeClassName="active">About</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {isLogin ? (
                            <div className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded={showDropdown ? "true" : "false"}
                                    onClick={toggleDropdown}
                                >
                                    <img
                                        src='../images/user-icon.png' 
                                        alt='user-icon' 
                                        className="rounded-circle" 
                                        height={30} 
                                        width={30} 
                                    />
                                    <span className="ms-2">{username}</span>
                                </a>
                                <ul className={`dropdown-menu dropdown-menu-end ${showDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdown">
                                    <li>
                                        <NavLink className="dropdown-item" to="/addBlogs">Add Blogs</NavLink>
                                    </li>
                                    <li>
                                        <NavLink className="dropdown-item" to="/userBlogs">{username} Blogs</NavLink>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <NavLink className="dropdown-item" to="/" onClick={handleLogout}>Logout</NavLink>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact to="/login" activeClassName="active">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" exact to="/register" activeClassName="active">Create account</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
