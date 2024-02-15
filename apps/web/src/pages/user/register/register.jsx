import React, { useState, useEffect } from 'react';
import Register from '../../../assets/register.jpg';
import { Link, useNavigate } from 'react-router-dom';
import ButtonWithLoading from '../../../components/ButtonWithLoading';
import { FaCheck } from 'react-icons/fa';
import API_CALL from '../../../helpers/API';

const RegisterForm = () => {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API_CALL.get('/accounts/authcheck', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
  const onHandleSignup = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API_CALL.post('/accounts/register', {
        fullname,
        email,
      });

      if (response.data.success) {
        setShowAlert(true);
        setFullName('');
        setEmail('');
      } else {
        setError(response.data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
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
      <div className="flex flex-col md:flex-row shadow-lg w-full max-w-5xl">
        {/* Registration form */}
        <div className="md:w-2/3 flex flex-wrap content-center justify-center rounded-l-md bg-white">
          <div className="w-full md:w-80 p-8">
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
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
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
        <div className="hidden md:block md:w-1/3">
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
          <div className="bg-white p-8 rounded-md text-center">
            <div className="mb-4">
              <FaCheck size={48} className="mx-auto" />
            </div>
            <p className="text-xl font-semibold mb-4">
              Registration successful!
            </p>
            <p>Please check your email for further instructions.</p>

            <button
              onClick={() => setShowAlert(false)}
              className="mt-4 bg-orange-700 text-white px-4 py-2 rounded-md mx-auto block"
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
