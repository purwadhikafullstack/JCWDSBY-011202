import AdminLayout from '../../../../components/AdminLayout';
import { useSelector } from 'react-redux';

const LandingAdmin = () => {
  const username = useSelector(state => state.auth.username)

  return (
    <div>
      <AdminLayout>Hello {username}</AdminLayout>
    </div>
  );
};

export default LandingAdmin;
