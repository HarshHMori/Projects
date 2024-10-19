import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Blog.css";
import "./sidebar.css";

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/featured`);
                setFeaturedBlog(res.data[0]);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/`);
                setBlogs(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBlogs();
    }, []);

    const capitalizeFirstLetter = (word) => {
        if (word) return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    const truncateExcerpt = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    const getBlogs = () => {
        let list = [];
        let result = [];

        blogs.map((blogPost, index) => {
            list.push(
                <div key={index} className="col-md-6 mb-4">
                    <div className="card h-100 shadow-sm">
                        <img src={blogPost.thumbnail} className="blog-card-img-top blog-thumbnail" width={"200px"} alt="thumbnail" />
                        <div className="card-body d-flex flex-column">
                            <h6 className='text-gray'>{capitalizeFirstLetter(blogPost.category)}</h6>
                            <h5 className="card-title">{blogPost.title}</h5>
                            <p className="text-muted">Launch Date: {blogPost.month} {blogPost.day}, {blogPost.year}</p>
                            <p className="card-text">{truncateExcerpt(blogPost.excerpt, 20)}</p>
                            <p className="text-muted">
                                By Mr. {blogPost.user || 'Anonymous'} from {blogPost.company_name || 'N/A'}
                            </p>
                            <Link to={`/blog/${blogPost.slug}`} className="mt-auto btn btn-primary">
                                Continue reading
                            </Link>
                        </div>
                    </div>
                </div>
            );
        });

        for (let i = 0; i < list.length; i += 2) {
            result.push(
                <div key={i} className="row">
                    {list[i]}
                    {list[i + 1] ? list[i + 1] : null}
                </div>
            );
        }

        return result;
    };

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const [openDropdown, setOpenDropdown] = useState(null);
    const toggleDropdown = (dropdown) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);   //Toggle the clicked dropdown
    };

    return (
        <div className="container mt-3">
            <button className="menu-btn" onClick={toggleSidebar}>
               <img src='../images/more.png' alt='menu' height={30} 
                                        width={30} /> {/* Unicode for hamburger icon */}
            </button>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <button className="close-btn" onClick={toggleSidebar}>X</button>
                <h4 className="sidebar-title">Categories</h4>

                <div className="dropdown">
                    <button className="dropbtn" onClick={() => toggleDropdown('general')}>General Categories</button>
                    <div className={`dropdown-content ${openDropdown === 'general' ? 'show' : ''}`}>
                        <Link to="/category/world">World</Link>
                        <Link to="/category/environment">Environment</Link>
                        <Link to="/category/technology">Technology</Link>
                        <Link to="/category/design">Design</Link>
                    </div>
                </div>

                <div className="dropdown" >
                    <button className="dropbtn" onClick={() => toggleDropdown('business')}>Business & Politics</button>
                    <div className={`dropdown-content ${openDropdown === 'business' ? 'show' : ''}`}>
                        <Link to="/category/business">Business</Link>
                        <Link to="/category/politics">Politics</Link>
                        <Link to="/category/opinion">Opinion</Link>
                    </div>
                </div>

                <div className="dropdown">
                    <button className="dropbtn" onClick={() => toggleDropdown('lifestyle')}>Lifestyle</button>
                    <div className={`dropdown-content ${openDropdown === 'lifestyle' ? 'show' : ''}`}>
                        <Link to="/category/health">Health</Link>
                        <Link to="/category/style">Style</Link>
                        <Link to="/category/travel">Travel</Link>
                    </div>
                </div>

                <div className="dropdown">
                    <button className="dropbtn" onClick={() => toggleDropdown('entertainment')}>Entertainment</button>
                    <div className={`dropdown-content ${openDropdown === 'entertainment' ? 'show' : ''}`}>
                        <Link to="/category/sports">Sports</Link>
                        <Link to="/category/entertainment">Entertainment</Link>
                        <Link to="/category/music">Music</Link>
                        <Link to="/category/movies">Movies</Link>
                    </div>
                </div>

                <div className="dropdown">
                    <button className="dropbtn" onClick={() => toggleDropdown('creative')}>Creative</button>
                    <div className={`dropdown-content ${openDropdown === 'creative' ? 'show' : ''}`}>
                        <Link to="/category/arts">Arts</Link>
                        <Link to="/category/food">Food</Link>
                        <Link to="/category/books">Books</Link>
                    </div>
                </div>
            </div>

            <div className={`content ${isSidebarOpen ? 'blur' : ''}`}>
                <div className="row mb-4">
                    <div className="col-lg-12">
                        <div className="p-4 mb-4 rounded bg-light shadow-lg">
                            <div className="row">
                                <div className="col-md-8">
                                    <h1 className="display-5">{featuredBlog.title}</h1>
                                    <p className="lead">{featuredBlog.excerpt}</p>
                                    <Link to={`/blog/${featuredBlog.slug}`} className="btn btn-primary">Continue reading...</Link>
                                </div>
                                <div className="col-md-4">
                                    <img src={featuredBlog.thumbnail} className="img-fluid" alt="Featured Blog" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* </div> */}
            </div>
            {getBlogs()}
        </div>
    );
};

export default Blog;
