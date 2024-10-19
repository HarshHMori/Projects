import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import "./BlogDetail.css";

const BlogDetail = () => {
    const [blog, setBlog] = useState({});
    const { id } = useParams();  // Get the blog ID/slug from the URL

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/${id}`);
                setBlog(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [id]);

    const createBlog = () => {
        return {__html: blog.content};
    };

    const capitalizeFirstLetter = (word) => {
        if (word) 
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    return (
        <div className='container mt-5 blog-detail-container'>
            <div className='row'>
                {/* Thumbnail Image */}
                <div className='col-md-4'>
                    {blog.thumbnail && (
                        <img 
                            src={blog.thumbnail} 
                            alt="Thumbnail" 
                            className='img-fluid rounded blog-thumbnail' 
                            style={{ width: '100%', maxHeight: '800px', objectFit: 'fill' }}
                        />
                    )}
                </div>
                
                {/* Blog Details */}
                <div className='col-md-8'>
                    <h1 className='display-4 blog-title'>{blog.title}</h1>
                    <h3 className='text-muted'>Category: {capitalizeFirstLetter(blog.category)}</h3>
                    <h5 className='blog-date'>Launch Date: {blog.month} {blog.day}</h5>
                    <div className='mt-4' dangerouslySetInnerHTML={createBlog()} />
                    
                    <div className='blog-footer'>
                        <p className='lead'>
                            <strong>Organization: </strong>{blog.company_name || 'N/A'}
                        </p>
                        {blog.company_link ? (<a href={`${blog.company_link}`}>{blog.company_link}</a>) : (<></>)}
                        <p className='lead'>
                            <strong>Added by: </strong>Mr. {blog.user || 'Anonymous'}
                        </p>
                    </div>

                    <hr />
                    <p className='lead'>
                        <Link to='/blog' className='btn btn-primary mt-3'>Back to Blogs</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;