import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../../components/AdminLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';

const LandingAdmin = () => {
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/accounts/keep-login', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      const { success, username, role } = response.data;

      if (success) {
        setUsername(username);
        setRole(role);
        console.log(role);
        console.log(username);
      } else {
        console.log('set username failed');
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      handleLogin();
    } else {
      console.log('no token');
    }
  }, []);

  useEffect(() => {
    if (role === 'admin') {
      navigate('/admin');
    }
  }, [role, navigate]);

  return (
    <div>
      <AdminLayout>Hello {role} {username}</AdminLayout>
    </div>
  );
};

export default LandingAdmin;
