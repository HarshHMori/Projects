import React, { useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './hocs/Layout';
import Home from './components/Home';
import Blog from './components/Blog';
import BlogDetail from './components/BlogDetail';
import Category from './components/Category';
import Login from './components/Login';
import Register from './components/Register';
import AddBlogs from './components/AddBlogs';
import UserBlog from './components/UserPage';
import About from './components/About';



const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("username");
    setIsLogin(false);
    setUsername("");
  }


  return(
    <Router>
      <Layout isLogin={isLogin} username={username} setIsLogin={setIsLogin} setUsername={setUsername} handleLogout={handleLogout}>
        <Routes>
          <Route  path="/"  element={<Home isLogin={isLogin} setIsLogin={setIsLogin} setUsername={setUsername} />} />
          <Route  path="/blog"  element={<Blog isLogin={isLogin} setIsLogin={setIsLogin} setUsername={setUsername}/>} />
          <Route  path="/category/:id"  element={<Category isLogin={isLogin} setIsLogin={setIsLogin} setUsername={setUsername}/>} />
          <Route  path="/blog/:id"  element={<BlogDetail isLogin={isLogin} setIsLogin={setIsLogin} setUsername={setUsername}/>} />
          <Route path="/login" element={<Login setIsLogin={setIsLogin} setUsername={setUsername} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addBlogs" element={<AddBlogs username={username} />} />
          <Route path="/userBlogs" element={<UserBlog isLogin={isLogin} username={username} />} />
          <Route path="/about" element={<About isLogin={isLogin} />} />
        </Routes>
      </Layout>
    </Router>
  )
};

export default App;