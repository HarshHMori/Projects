import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./Home.css"; // Import your custom CSS
import "./parallax.css";

const Home = () => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);

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

    const getBlogs = () => {
        let list = [];

        blogs.map((blogPost, index) => {
            if (index < 3) {
                return list.push(
                    <div key={index} className="blogs">
                        <div className="card-blog mb-4 shadow-sm">
                            <img src={blogPost.thumbnail} alt="thumbnail" className="blog-img-top" />
                            <div className="card-body-blog">
                                <h5 className="card-blog-title">{blogPost.title}</h5>
                                <p className="card-blog-text">{blogPost.excerpt}</p>
                                <Link to={`/blog/${blogPost.slug}`} className="btn btn-success">Read More</Link>
                            </div>
                        </div>
                    </div>
                );
            }
        });

        return (
            <div className="row-blog">
                {list}
            </div>
        );
    };
    const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

    return (
        <div className='blog-body'>
            <div className="parallax-section">
                <div className="parallax-content">
                    <h1>Welcome to Our Blogging Platform</h1>
                    <p>A place where writers and readers come together to share ideas, experiences, and expertise.</p>
                    <Link to="/blog" className="btn btn-success">View More Blogs</Link>
                </div>
                <div className={`parallax-scroll ${scrollPosition > 200 ? 'scrolled' : ''}`}></div>
            </div>

            {/* Featured Blog Section */}
            <div className="parallax-section">
                    <div className="container-feature mt-4">
                {/* <div className="parallax-content"> */}
                        <h2 className="mb-4 heading">Featured Blog</h2>
                        <div className="row">
                            <div className="col-md-6">
                                <img src={featuredBlog.thumbnail} alt="thumbnail" className="img-fluid" />
                            </div>
                            <div className="col-md-6">
                                <h2 className="mb-3 text-white">{featuredBlog.title}</h2>
                                <p className="lead text-light">{featuredBlog.excerpt}</p>
                                <Link to={`/blog/${featuredBlog.slug}`} className="btn btn-success">Read More</Link>
                            </div>
                        </div>
                    </div>
                {/* </div> */}
            </div>

            {/* Latest Blogs Section */}
            <div className="parallax-section">
                {/* <div className="parallax-content"> */}
                    <div className="container-blogs mt-4">
                        <h2>Latest Blogs</h2>
                        {getBlogs()}
                    </div>
                {/* </div> */}
            </div>
        </div>
    );
};

export default Home;
