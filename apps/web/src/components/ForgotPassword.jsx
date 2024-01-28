import React, { useState } from 'react';
import ResetPasswordImage from '../assets/login.jpg';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    }
  };

  const handleSubmitEmail = (event) => {
    event.preventDefault();
    // Add logic to send reset password link to the provided email
    // Update the step to move to the Confirm Reset Password page
    setStep(2);
  };

  const handleSubmitNewPassword = (event) => {
    event.preventDefault();
    // Add logic to confirm reset password and update the password
    // Redirect user to the login page or any other desired page
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex shadow-lg w-full max-w-5xl">
        {/* Reset Password form */}
        <div
          className="flex flex-col items-center justify-center bg-white h-full"
          style={{ width: '60%', height: '80%' }}
        >
          <div className="w-80 p-8 h-full mt-8">
            {/* Heading */}
            <h1 className="text-2xl font-semibold">
              {step === 1 ? 'Reset Password' : 'Confirm Reset Password'}
            </h1>
            <small className="text-gray-400">
              {step === 1
                ? 'Enter your email to receive a password reset link'
                : 'Confirm your reset password and enter a new password'}
            </small>

            {/* Form */}
            {step === 1 ? (
              <form className="mt-4 space-y-4" onSubmit={handleSubmitEmail}>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="w-full p-2 border rounded-md focus:border-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-700 text-gray-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="block w-full text-center text-white bg-orange-700 hover:bg-orange-900 px-4 py-2 rounded-md"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            ) : (
              <form
                className="mt-4 space-y-4"
                onSubmit={handleSubmitNewPassword}
              >
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your new password"
                    className="w-full p-2 border rounded-md focus:border-orange-700 focus:outline-none focus:ring-1 focus:ring-orange-700 text-gray-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="block w-full text-center text-white bg-orange-700 hover:bg-orange-900 px-4 py-2 rounded-md"
                  >
                    Confirm Reset Password
                  </button>
                </div>
              </form>
            )}

            {/* Footer */}
            <div className="text-center mt-4">
              <span className="text-xs text-gray-400 font-semibold">
                {step === 1 ? 'Remember your password?' : 'Back to Login page?'}
              </span>
              <Link
                to="/user/login"
                className="text-xs font-semibold text-orange-700 ml-auto"
              >
                {step === 1 ? 'Sign in' : 'Login'}
              </Link>
            </div>
          </div>
        </div>

        {/* Reset Password banner */}
        <div
          className="hidden lg:flex content-center justify-center rounded-r-md"
          style={{ width: '40%', height: '32rem' }}
        >
          <img
            className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md"
            src={ResetPasswordImage}
            alt="Reset Password Banner"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
