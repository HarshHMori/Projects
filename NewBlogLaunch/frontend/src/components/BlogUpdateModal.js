// BlogUpdateModal.js
import React from 'react';

const BlogUpdateModal = ({ blogId, userBlog, handleChange, handleThumbnailChange, handleSubmit }) => {
    return (
        <div 
            className='modal fade' 
            aria-hidden='true' 
            id={`updateModal-${blogId}`} 
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
                        <button 
                            type="button" 
                            className="btn btn-secondary" 
                            data-bs-dismiss='modal'
                        >
                            Close
                        </button>
                        <button 
                            type="button" 
                            className="btn btn-primary" 
                            onClick={(e) => handleSubmit(e, blogId)}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogUpdateModal;
