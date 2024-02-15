import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Register from '../assets/register.jpg';
import axios from 'axios';
import ButtonWithLoading from './ButtonWithLoading';

const EmailVerification = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setTokenVerif] = useState('');
  const [showCongratsModal, setShowCongratsModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [currentRole, setCurrentRole] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tokenAuth = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:8000/api/accounts/authcheck',
          {
            headers: {
              Authorization: `Bearer ${tokenAuth}`,
            },
          },
        );
        setCurrentRole(response.data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (
    currentRole === 'admin' ||
    currentRole === 'superadmin' ||
    currentRole === 'user'
  ) {
    navigate('/not-authorized');
  }

  useEffect(() => {
    const tokenQuery = location.search.split('?')[1];
    setTokenVerif(tokenQuery);
  }, [location.search]);

  console.log(token);

  const handleVerification = async () => {
    try {
      setLoading(true);
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
      }
      const response = await axios.post(
        'http://localhost:8000/api/accounts/register/verification',
        {
          password,
          confirmpassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        setShowCongratsModal(true);
      } else {
        setError('Verification failed');
      }
    } catch (error) {
      console.error('Error during verification:', error);
      setError('Error during verification');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    navigate('/user/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col md:flex-row shadow-lg w-full max-w-5xl">
        {/* Verification form */}
        <div className="md:w-2/3 flex flex-wrap content-center justify-center rounded-l-md bg-white">
          <div className="w-full md:w-80 p-8 mt-8">
            <h1 className="text-2xl font-semibold">Email Verification</h1>
            <small className="text-gray-400">
              Please verify your email and set your password.
            </small>
            {/* Form */}
            <form className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md focus:border-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-700 text-gray-500"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border rounded-md focus:border-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-700 text-gray-500"
                />
              </div>
              {error && <div className="text-red-500 text-sm">{error}</div>}
            </form>
            <div className="mt-4">
              <ButtonWithLoading
                onClick={handleVerification}
                isLoading={loading}
                title="Verify and Set Password"
              ></ButtonWithLoading>
            </div>
          </div>
        </div>
        {/* Verification banner */}
        <div className="hidden md:block md:w-1/3">
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
            src={Register}
            alt="Registration Banner"
          />
        </div>
      </div>
      {/* Congrats Modal */}
      {showCongratsModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md">
            <p className="text-xl font-semibold mb-4 text-center">
              Congratulations!
            </p>
            <p className="text-center">
              Your account has been successfully verified.
            </p>
            <button
              onClick={handleLogin}
              className="mt-4 bg-orange-700 text-white px-4 py-2 rounded-md mx-auto block"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
