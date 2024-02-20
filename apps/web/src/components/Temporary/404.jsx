import React from 'react';
import { Link } from 'react-router-dom';
import Pict from '../../assets/6333685.jpg';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="text-center">
        <img
          src={Pict}
          alt="Page Not Found Illustration"
          className="mb-8 mx-auto"
          style={{ maxWidth: '300px' }}
        />
        <h1 className="text-4xl font-bold text-orange-800 mb-2">
          404 - Not Found
        </h1>
        <p className="text-lg text-orange-600 mb-4">
          Oops! The page you're looking for does not exist.
        </p>
        <Link
          to="/"
          className="text-orange-500 hover:text-orange-700 transition-all duration-300"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
