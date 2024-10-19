import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLogin, setUsername }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/blog/login`,
        newUser,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setError('');
        setIsLogin(true);
        setUsername(formData.username);
        localStorage.setItem('username', formData.username);
        localStorage.setItem('isLogin', true);
        setFormData({ username: '', password: '', email: '' });
        navigate('/');
      }
    } catch (err) {
      setError('Failed to Login. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="mb-3">Login</h2>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={onChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={onChange}
                    required
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;