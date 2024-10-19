import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserBlogs.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min';

const UniqueUserBlogs = ({ isLogin, username }) => {
    const [userBlogs, setUserBlogs] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch user blogs when component loads
        if (isLogin) {
            fetchUserBlogs();
        }
    }, [isLogin]);

    useEffect(() => {
        const blogEntries = document.querySelectorAll('.unique-user-blog-entry');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        blogEntries.forEach((entry) => observer.observe(entry));

        return () => {
            blogEntries.forEach((entry) => observer.unobserve(entry));
        };
    }, [userBlogs]);

    const fetchUserBlogs = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/userBlogs`, {
                user: username
            });
            console.log("Response data:", response.data);
            setUserBlogs(response.data);
        } catch (error) {
            console.error("Error fetching user blogs", error);
            setMessage("Failed to fetch user blogs.");
        }
    };

    const deleteBlog = async (blogId) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/blog/deleteBlog/${blogId}?user=${username}`);
            setMessage(response.data.message);
            setUserBlogs(userBlogs.filter(blog => blog.id !== blogId));
        } catch (error) {
            console.error("Error deleting blog", error);
            setMessage("Failed to delete the blog.");
        }
    };

    const [userBlog, setBlog] = useState({
        title: '',
        category: 'world',
        thumbnail: '',
        excerpt: '',
        date: '',
        content: '',
        featured: false,
        user: username,
    });
    
    const UpdateBlog = async (blogId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/updateBlog/${blogId}?user=${username}`);
            const userdata = response.data;
            setBlog({
                title: userdata.title,
                category: userdata.category,
                thumbnail: userdata.thumbnail,
                excerpt: userdata.excerpt,
                content: userdata.content,
                featured: userdata.featured,
                user: username,
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error("Error updating blog", error);
            setMessage("Failed to get the blog.");
        }
    };

    const handleChange = (e) => {
        setBlog({
            ...userBlog,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        });
    };
    
    const handleThumbnailChange = (e) => {
        setBlog({
            ...userBlog,
            thumbnail: e.target.files[0]
        });
    };
    
    const handleSubmit = async (e, blogId) => {
        e.preventDefault(); // Prevent form reload
        const dateObj = new Date(userBlog.date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'short' });
        const year = dateObj.getFullYear();

        const blog = new FormData();
        blog.append('title', userBlog.title);
        blog.append('category', userBlog.category);
        blog.append('thumbnail', userBlog.thumbnail);
        blog.append('excerpt', userBlog.excerpt);
        blog.append('day', day);
        blog.append('month', month);
        blog.append('year', year);
        blog.append('content', userBlog.content);
        blog.append('featured', userBlog.featured);
        blog.append('user', username);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/updateBlog/${blogId}?user=${username}`, blog, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log("Response from server:", response.data);
            setMessage("Your blog was updated successfully!");

            const modal = document.querySelector(`#uniqueUpdateModal-${blogId}`);
            const modalInstance = bootstrap.Modal.getInstance(modal);
            modalInstance.hide();  // Close modal after success

            toast.success('Blog updated successfully!', {
                position: "top-right",
                autoClose: 2000,
                onClose: () => {
                    fetchUserBlogs();
                }
            });

            setBlog({
                title: '',
                category: 'world',
                thumbnail: '',
                excerpt: '',
                date: '',
                content: '',
                featured: false,
                user: username,
            });

        } catch (error) {
            console.error("Error while updating blog:", error);
            setMessage("Failed to update blog! Please try again.");
            toast.error("Failed to update blog!");
        }
    };

    return (
        <div className="unique-user-blogs-section">
            <h2>Your Blogs</h2>
            {message && <p className="unique-user-message">{message}</p>}
            <div className="unique-user-blog-entries">
                {userBlogs.length > 0 ? (
                    userBlogs.map(blog => (
                        <div key={blog.id} className="unique-user-blog-entry">
                            <div className="unique-blog-content">
                                <h3>{blog.title}</h3>
                                <p><strong>Category:</strong> {blog.category}</p>
                                <p><strong>Excerpt:</strong> {blog.excerpt}</p>
                                <p><strong>Date:</strong> {blog.day} {blog.month}, {blog.year}</p>
                                <p><strong>Featured:</strong> {blog.featured ? 'Yes' : 'No'}</p>
                                <p><strong>Description:</strong></p>
                                <p>{blog.content}</p>
                                <div className="unique-blog-actions">
                                    <button className="btn btn-info me-2" onClick={() => deleteBlog(blog.id)}>Delete</button>
                                    <button 
                                        type="button" 
                                        className="btn btn-success" 
                                        data-bs-toggle="modal" 
                                        data-bs-target={`#uniqueUpdateModal-${blog.id}`}
                                        onClick={() => UpdateBlog(blog.id)}
                                    >
                                        Update
                                    </button>

                                    {/* Modal for updating blog */}
                                    <div 
                                        className='modal fade' 
                                        aria-hidden='true' 
                                        id={`uniqueUpdateModal-${blog.id}`} 
                                        tabIndex='-1'
                                    >
                                        <div className='modal-dialog'>
                                            <div className='modal-content'>
                                                <div className='modal-header'>
                                                    <h4 className='modal-title'>Update Blog</h4>
                                                    <button className='btn-close' type='button' data-bs-dismiss='modal'></button>
                                                </div>
                                                <div className='modal-body'>
                                                    <form encType="multipart/form-data">
                                                        {/* Similar form fields */}
                                                        <div className="mb-3">
                                                         <label className="form-label">Title</label>
                                                         <input 
                                                            type="text" 
                                                            name="title" 
                                                            value={userBlog.title} 
                                                            onChange={handleChange} 
                                                            required 
                                                            className="form-control" 
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Category</label>
                                                        <select 
                                                            name="category" 
                                                            value={userBlog.category} 
                                                            onChange={handleChange} 
                                                            className="form-select"
                                                        >
                                                            <option value="world">World</option>
                                                            <option value="environment">Environment</option>
                                                            <option value="technology">Technology</option>
                                                            <option value="design">Design</option>
                                                            <option value="culture">Culture</option>
                                                            <option value="business">Business</option>
                                                            <option value="politics">Politics</option>
                                                            <option value="opinion">Opinion</option>
                                                            <option value="science">Science</option>
                                                            <option value="health">Health</option>
                                                            <option value="style">Style</option>
                                                            <option value="travel">Travel</option>
                                                            <option value="product">Product</option>
                                                            <option value="sports">Sports</option>
                                                            <option value="entertainment">Entertainment</option>
                                                            <option value="arts">Arts</option>
                                                            <option value="food">Food</option>
                                                            <option value="music">Music</option>
                                                            <option value="movies">Movies</option>
                                                            <option value="books">Books</option>
                                                        </select>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Thumbnail</label>
                                                        {/* Show current thumbnail if available */}
                                                        {userBlog.thumbnail && (
                                                            <div className="mb-2">
                                                                <img 
                                                                    src={`${process.env.REACT_APP_API_URL}/${userBlog.thumbnail}`} 
                                                                    alt="Current Thumbnail" 
                                                                    className="img-thumbnail" 
                                                                    style={{ width: '150px', height: 'auto' }} 
                                                                />
                                                            </div>
                                                        )}
                                                        <input 
                                                            type="file" 
                                                            name="thumbnail" 
                                                            onChange={handleThumbnailChange} 
                                                            className="form-control" 
                                                        />
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="form-label">Excerpt</label>
                                                        <input 
                                                            type="text" 
                                                            name="excerpt" 
                                                            value={userBlog.excerpt} 
                                                            onChange={handleChange} 
                                                            required 
                                                            className="form-control" 
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Date</label>
                                                        <input 
                                                            type="date" 
                                                            name="date" 
                                                            value={userBlog.date} 
                                                            onChange={handleChange} 
                                                            required 
                                                            className="form-control" 
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Content</label>
                                                        <textarea 
                                                            name="content" 
                                                            value={userBlog.content} 
                                                            onChange={handleChange} 
                                                            required 
                                                            className="form-control" 
                                                            rows="5"
                                                        ></textarea>
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label me-2">Featured</label>
                                                        <input 
                                                            type="checkbox" 
                                                            name="featured" 
                                                            checked={userBlog.featured} 
                                                            onChange={handleChange} 
                                                            className="form-check-input" 
                                                        />
                                                    </div>
                                                    </form>
                                                </div>
                                                <div className='modal-footer'>
                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss='modal'>
                                                        Close
                                                    </button>
                                                    <button type="button" className="btn btn-primary" onClick={(e) => handleSubmit(e, blog.id)}>
                                                        Update
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="unique-user-blog-thumbnail">
                                {blog.thumbnail && (
                                    <img 
                                        src={`${process.env.REACT_APP_API_URL}/${blog.thumbnail}`} 
                                        alt="Blog Thumbnail"
                                        height={'400px'} width={'500px'}
                                    />
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No blogs added by you yet.</p>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default UniqueUserBlogs;
