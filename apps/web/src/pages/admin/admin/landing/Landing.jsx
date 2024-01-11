import AdminLayout from '../../../../components/AdminLayout';
import { useSelector } from 'react-redux';

const LandingAdmin = () => {
  const username = useSelector(state => state.auth.username)
  const role = useSelector(state => state.auth.role)

  return (
    <div>
      <AdminLayout>Hello {username} {role}</AdminLayout>
    </div>
  )
}

export default LandingAdmin;
