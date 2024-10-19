// import React from 'react';
// import { Link } from 'react-router-dom';

// const About = ({ isLogin }) => {
//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center card shadow-sm">
//         <div className="card-body">
//           <h2 className="mb-3 text-center">Welcome to Blog Launch</h2>
//           <img
//             src="https://picsum.photos/200/300"
//             alt="Blog Launch"
//             className="img-fluid mx-auto d-block mb-3"
//           />
//           <p className="text-justify">
//             Blog Launch is a platform where innovators, entrepreneurs, and businesses can showcase their new launch products to the world. Our mission is to provide a stage for creators to share their stories, showcase their products, and connect with their target audience.
//           </p>
//           <div className="row">
//             <div className="col-md-6">
//               <h3 className="mb-3">Our Vision</h3>
//               <p className="text-justify">
//                 We envision a world where every creator has the opportunity to share their ideas and products with the world. We believe that by providing a platform for new launch products, we can help drive innovation, entrepreneurship, and economic growth.
//               </p>
//             </div>
//             <div className="col-md-6">
//               <h3 className="mb-3">How it Works</h3>
//               <p className="text-justify">
//                 Our platform is simple and easy to use. Users can create an account, submit their new launch products, and once approved, their product will be featured on our blog. We also provide tools and resources to help users promote their products and reach a wider audience.
//               </p>
//             </div>
//           </div>
//           <h3 className="mb-3">Benefits of Using Our Platform</h3>
//           <ul className="list-group list-group-flush">
//             <li className="list-group-item">Get your new launch product in front of a targeted audience</li>
//             <li className="list-group-item">Increase brand awareness and credibility</li>
//             <li className="list-group-item">Drive traffic and sales to your website</li>
//             <li className="list-group-item">Connect with potential customers and partners</li>
//           </ul>
//           <h3 className="mb-3">Join Our Community</h3>
//           <p className="text-justify">
//             Whether you're a creator, entrepreneur, or business, we invite you to join our community and showcase your new launch products to the world. Sign up for an account today and start sharing your story!
//           </p>
//           <div className="text-center">
//             <button className="btn btn-primary">
//                 {isLogin ? (
//                     <Link className="nav-link" exact to="/addBlogs" activeClassName="active">Add Blogs</Link>
//                 ) : (
//                     <Link className="nav-link" exact to="/login" activeClassName="active">Login</Link>
//                 )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default About;
import React from 'react';
import { Link } from 'react-router-dom';
import './About.css'; // Importing custom CSS

const About = ({ isLogin }) => {
  return (
    <div className="about-container">
      <div className="about-card">
        <div className="about-card-body">
          <h2 className="about-title">Welcome to Blog Launch</h2>
          <img
            src="https://picsum.photos/200/300"
            alt="Blog Launch"
            className="about-image"
          />
          <p className="about-text">
            Blog Launch is a platform where innovators, entrepreneurs, and businesses can showcase their new launch products to the world. Our mission is to provide a stage for creators to share their stories, showcase their products, and connect with their target audience.
          </p>
          <div className="about-row">
            <div className="about-col">
              <h3 className="about-section-title">Our Vision</h3>
              <p className="about-text">
                We envision a world where every creator has the opportunity to share their ideas and products with the world. We believe that by providing a platform for new launch products, we can help drive innovation, entrepreneurship, and economic growth.
              </p>
            </div>
            <div className="about-col">
              <h3 className="about-section-title">How it Works</h3>
              <p className="about-text">
                Our platform is simple and easy to use. Users can create an account, submit their new launch products, and once approved, their product will be featured on our blog. We also provide tools and resources to help users promote their products and reach a wider audience.
              </p>
            </div>
          </div>
          <h3 className="about-section-title">Benefits of Using Our Platform</h3>
          <ul className="about-list">
            <li className="about-list-item">Get your new launch product in front of a targeted audience</li>
            <li className="about-list-item">Increase brand awareness and credibility</li>
            <li className="about-list-item">Drive traffic and sales to your website</li>
            <li className="about-list-item">Connect with potential customers and partners</li>
          </ul>
          <h3 className="about-section-title">Join Our Community</h3>
          <p className="about-text">
            Whether you're a creator, entrepreneur, or business, we invite you to join our community and showcase your new launch products to the world. Sign up for an account today and start sharing your story!
          </p>
          <div className="about-button-container">
            <button className="about-button">
              {isLogin ? (
                <Link className="about-button-link" to="/addBlogs">Add Blogs</Link>
              ) : (
                <Link className="about-button-link" to="/login">Login</Link>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
