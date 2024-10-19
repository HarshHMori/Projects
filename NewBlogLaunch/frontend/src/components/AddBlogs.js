import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/AddBlogs.css'; // Importing custom CSS for styling

const AddBlog = ({ username }) => {
    const [blogData, setBlogData] = useState({
        title: '',
        category: 'world',
        thumbnail: '',
        excerpt: '',
        date: '',
        content: '',
        featured: false,
        user: username,
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setBlogData({
            ...blogData,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
        });
    };

    const handleThumbnailChange = (e) => {
        setBlogData({
            ...blogData,
            thumbnail: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dateObj = new Date(blogData.date);
        const day = dateObj.getDate();
        const month = dateObj.toLocaleString('default', { month: 'short' });

        const blog = new FormData();
        blog.append('title', blogData.title);
        blog.append('category', blogData.category);
        blog.append('thumbnail', blogData.thumbnail);
        blog.append('excerpt', blogData.excerpt);
        blog.append('day', day);
        blog.append('month', month);
        blog.append('content', blogData.content);
        blog.append('featured', blogData.featured);
        blog.append('user', username);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/addBlog`, blog, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            setMessage("Your blog was added successfully!");
            setBlogData({
                title: '',
                category: 'world',
                thumbnail: '',
                excerpt: '',
                date: '',
                content: '',
                featured: false,
                user: username,
            });
            navigate("/blog");
        } catch (error) {
            console.error(error);
            setError("Failed to add blog! Please try again.");
        }
    };

    return (
        <div className="add-blog-container">
            <div className="add-blog-form-wrapper">
                <div className="add-blog-card">
                    <div className="add-blog-card-body">
                        <h2 className="add-blog-title">Add a New Blog Post</h2>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="add-blog-input-group">
                                <label className="add-blog-label">Title</label>
                                <input type="text" name="title" value={blogData.title} onChange={handleChange} required className="add-blog-input" />
                            </div>
                            <div className="add-blog-input-group">
                                <label className="add-blog-label">Category</label>
                                <select name="category" value={blogData.category} onChange={handleChange} className="add-blog-select">
                                    {/* Add categories */}
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
                            <div className="add-blog-input-group">
                                <label className="add-blog-label">Thumbnail</label>
                                <input type="file" name="thumbnail" onChange={handleThumbnailChange} required className="add-blog-input" />
                            </div>
                            <div className="add-blog-input-group">
                                <label className="add-blog-label">Excerpt</label>
                                <input type="text" name="excerpt" value={blogData.excerpt} onChange={handleChange} required className="add-blog-input" />
                            </div>
                            <div className="add-blog-input-group">
                                <label className="add-blog-label">Date</label>
                                <input type="date" name="date" value={blogData.date} onChange={handleChange} required className="add-blog-input" />
                            </div>
                            <div className="add-blog-input-group">
                                <label className="add-blog-label">Content</label>
                                <textarea name="content" value={blogData.content} onChange={handleChange} required className="add-blog-textarea"></textarea>
                            </div>
                            <div className="add-blog-checkbox-group">
                                <input type="checkbox" name="featured" checked={blogData.featured} onChange={handleChange} className="add-blog-checkbox" />
                                <label className="add-blog-checkbox-label">Featured</label>
                            </div>
                            <button type="submit" className="add-blog-submit-btn">Submit</button>
                        </form>

                        {message && <p className="add-blog-success-message">{message}</p>}
                        {error && <p className="add-blog-error-message">{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;
