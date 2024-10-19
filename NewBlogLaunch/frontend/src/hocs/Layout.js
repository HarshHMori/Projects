import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const layout = ({children, isLogin, username, setIsLogin, setUsername, handleLogout }) => {
    return(
        <div>
            <Navbar isLogin={isLogin} username={username} setIsLogin={setIsLogin} setUsername={setUsername} handleLogout={handleLogout} />
            {children}
            <Footer />
        </div>
    )
};

export default layout;