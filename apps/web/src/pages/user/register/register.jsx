import React, { useState } from 'react';
import Register from '../../../assets/register.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ButtonWithLoading from '../../../components/ButtonWithLoading';

const RegisterForm = () => {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onHandleSignup = async () => {
    try {
      // Set loading to true when the registration process starts
      setLoading(true);

      const response = await axios.post(
        'http://localhost:8000/api/accounts/register',
        {
          fullname,
          email,
        },
      );

      if (response.data.success) {
        setShowAlert(true);
      } else {
        console.error('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      // Set loading to false regardless of success or failure
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex shadow-lg w-full max-w-5xl">
        {/* Registration form */}
        <div
          className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
          style={{ width: '60%', height: '80%' }}
        >
          <div className="w-80 p-8">
            {/* Heading */}
            <h1 className="text-2xl font-semibold">Create an Account</h1>
            <small className="text-gray-400">
              Please fill in the details to create your account
            </small>

            {/* Form */}
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full p-2 border rounded-md focus:border-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-700 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded-md focus:border-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-700 text-gray-500"
                />
              </div>
            </form>
            <div className="mt-4">
              <ButtonWithLoading
                onClick={onHandleSignup}
                title={'Sign Up'}
                isLoading={loading}
              ></ButtonWithLoading>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <span className="text-xs text-gray-400 font-semibold">
                Already have an account?
              </span>
              <Link
                to="/user/login"
                className="text-xs font-semibold text-orange-700"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        {/* Registration banner */}
        <div
          className="flex flex-wrap content-center justify-center rounded-r-md"
          style={{ width: '40%', height: '32rem' }}
        >
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
            src={Register}
            alt="Registration Banner"
          />
        </div>
      </div>

      {/* Modal Alert */}
      {showAlert && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <p className="text-xl font-semibold mb-4">
              Registration successful!
            </p>
            <p>Please check your email for further instructions.</p>
            <button
              onClick={() => setShowAlert(false)}
              className="mt-4 bg-orange-700 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
