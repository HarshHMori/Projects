import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profile: { organization_name: '', organization_link: '' },
  });

  const [error, setError] = useState('');
  const navigate = useNavigate('');

  const onChange = (e) => {
    if (e.target.name === 'organization_name' || e.target.name === 'organization_link') {
      setFormData({
        ...formData,
        profile: {
          ...formData.profile,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (formData.profile.organization_link && !formData.profile.organization_link.startsWith('http://') && !formData.profile.organization_link.startsWith('https://')) {
      formData.profile.organization_link = 'http://' + formData.profile.organization_link;
    }
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      profile: {
        organization_name: formData.profile.organization_name,
        organization_link: formData.profile.organization_link,
      },
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/register`, newUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setError('');
        setFormData({ username: '', email: '', password: '', profile: { organization_name: '', organization_link: '' } });
        alert('Your account is created successfully! Now you can Login.');
        navigate('/login');
      }
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="mb-3">Register</h2>
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
                <div className="mb-3">
                  <label className="form-label">Organization Name:</label>
                  <input
                    type="text"
                    name="organization_name"
                    value={formData.profile.organization_name}
                    onChange={onChange}
                    required
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Organization Link (If any):</label>
                  <input
                    type="text"
                    name="organization_link"
                    value={formData.profile.organization_link}
                    onChange={onChange}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;