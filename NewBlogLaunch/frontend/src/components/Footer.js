import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-4 py-3">
      <div className="container bg-light">
        <div className="row">
          <div className="col-md-4">
            <h5>About Us</h5>
            <ul className="list-unstyled text-small">
              <li><Link to="/about">Our Story</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled text-small">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <ul className="list-unstyled text-small">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="text-muted">Copyright &copy; 2023 Your Website Name. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;