import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../../components/AdminLayout';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const LandingAdmin = () => {
  const username = useSelector(state => state.auth.username)
  const role = useSelector(state => state.auth.role)
  const navigate = useNavigate()

  useEffect(() => {
    if (role === 'admin') {
      navigate('/admin')
    }
  }, [role, navigate])

  return (
    <div>
      <AdminLayout>Hello {username} {role}</AdminLayout>
    </div>
  )
}

export default LandingAdmin;
