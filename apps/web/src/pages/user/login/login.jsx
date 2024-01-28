import React, { useState } from 'react';
import LoginImage from '../../../assets/login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import ButtonWithLoading from '../../../components/ButtonWithLoading';
import axios from 'axios';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const onHandleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);
      const response = await axios.post(
        'http://localhost:8000/api/accounts/login',
        {
          email,
          password,
        },
      );
      if (response.data.success) {
        if (
          response.data.result &&
          (response.data.result.role === 'admin' ||
            response.data.result.role === 'superadmin' ||
            !response.data.result.role === 'user')
        ) {
          setError('403 - Access Forbidden: Admin and Superadmin not allowed.');
        } else {
          localStorage.setItem('token', response.data.token);
          navigate('/');
        }
      } else {
        setError(
          response.data.message ||
            'Login failed. Please check your credentials.',
        );
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(
        error.response.data.message ||
          'An unexpected error occurred. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex shadow-lg w-full max-w-5xl">
        {/* Login form */}
        <div
          className="flex flex-wrap content-center justify-center rounded-l-md bg-white"
          style={{ width: '60%', height: '80%' }}
        >
          <div className="w-80 p-8">
            {/* Heading */}
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <small className="text-gray-400">
              Welcome back! Please enter your details
            </small>

            {/* Form */}
            <form className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full p-2 border rounded-md focus:border-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-700 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  placeholder="*****"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md focus:border-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-700 text-gray-500"
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="flex items-center">
                <Link
                  to="/user/forgot-pass"
                  className="text-sm font-semibold text-orange-700 ml-auto"
                >
                  Forgot password?
                </Link>
              </div>
            </form>
            <div className="mt-4">
              <ButtonWithLoading
                title={'Login'}
                isLoading={loading}
                onClick={onHandleSignIn}
              ></ButtonWithLoading>
              <button className="flex items-center justify-center w-full border border-gray-300 hover:border-gray-500 px-4 py-2 rounded-md mt-2">
                <img
                  className="w-5 mr-2"
                  src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
                  alt="Google Logo"
                />
                Sign in with Google
              </button>
            </div>

            {/* Footer */}
            <div className="text-center mt-4">
              <span className="text-xs text-gray-400 font-semibold">
                Don't have an account?
              </span>
              <Link
                to="/user/register"
                className="text-xs font-semibold text-orange-700"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>

        {/* Login banner */}
        <div
          className="flex flex-wrap content-center justify-center rounded-r-md"
          style={{ width: '40%', height: '32rem' }}
        >
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
            src={LoginImage}
            alt="Login Banner"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
