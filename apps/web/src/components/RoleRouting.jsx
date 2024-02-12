import React, { useState, useEffect } from 'react';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { Loading } from './loadingComponent';
import axios from 'axios';
import NotFoundPage from './Temporary/404';

const RoleRouting = ({ children, role, redirect }) => {
  const [currentRole, setCurrentRole] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          'http://localhost:8000/api/accounts/authcheck',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCurrentRole(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  if (loading) {
    return <Loading />;
  }

  console.log(role, currentRole, redirect);

  if (currentRole === undefined) {
    if (redirect) {
      return navigate(redirect);
    } else {
      return <NotFoundPage />;
    }
  }

  const hasRequiredRole = Array.isArray(role)
    ? role.includes(currentRole)
    : currentRole === role;

  if (!hasRequiredRole) {
    if (redirect) {
      return navigate(redirect);
    } else {
      return <NotFoundPage />;
    }
  }

  return <div>{children}</div>;
};

export default RoleRouting;
