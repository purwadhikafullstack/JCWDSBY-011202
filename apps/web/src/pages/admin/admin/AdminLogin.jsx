import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ButtonWithLoading from '../../../components/ButtonWithLoading';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onHandleLogin = async () => {
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
          (!response.data.result.role === 'admin' ||
            !response.data.result.role === 'superadmin' ||
            response.data.result.role === 'user')
        ) {
          setError('403 - Access Forbidden: user not allowed.');
        } else {
          localStorage.setItem('token', response.data.token);
          navigate('/admin');
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
        error.response?.data?.message ||
          'An unexpected error occurred. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link className="font-medium text-orange-600 hover:text-orange-500">
                  Forgot your password?
                </Link>
              </div>
            </div>
          </form>
          {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
          <div className="mt-4">
            <ButtonWithLoading
              onClick={onHandleLogin}
              title={'Sign In'}
              isLoading={loading}
            >
              Sign in
            </ButtonWithLoading>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
