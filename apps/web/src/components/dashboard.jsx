import { FaRegUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Toast from './Toast';
import API_CALL from '../helpers/API';
const DashboardTitle = (props) => {
  return (
    <div className="mb-2 mt-4">
      <p className="text-center text-3xl font-semibold mb-2">{props.title}</p>
      <p className="text-center text-md">{props.subTitle}</p>
    </div>
  );
};
const DashboardSidebar = (props) => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);
  const [userData, setUserData] = useState({});
  const getUserData = async () => {
    const token = localStorage.getItem('token');
    const result = await API_CALL.get(`/checkout/getUsernamePict`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUserData(result.data);
  };
  const showToast = (status, message) => {
    setToast({ status, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const onHandleLogOut = () => {
    localStorage.removeItem('token');
    showToast('success', 'Account Loged out');
    navigate('/');
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="text-right shadow-lg rounded-md md:w-[250px] h-fit">
      <div className="px-5 py-2">
        <div className="flex mx-auto justify-center  items-center rounded-full w-[70px] h-[70px] bg-slate-100 mb-3">
          {props.profilePict ? (
            <img src={props.profilePict} alt="" srcset="" />
          ) : (
            <FaRegUser className="text-3xl" />
          )}
        </div>
        <div className="font-semibold text-center text-lg">
          {userData.username}
        </div>
      </div>
      <div className="border-t-[1px] border-[#F06105]"></div>
      <div className="flex flex-col  justify-between h-[300px]">
        <ul className="flex flex-col gap-y-4 p-5">
          <li
            className="cursor-pointer hover:text-[#F06105] hover:font-semibold"
            onClick={() => {
              navigate('/user/dashboard');
            }}
          >
            Profile
          </li>
          <li
            className="cursor-pointer hover:text-[#F06105] hover:font-semibold"
            onClick={() => {
              navigate('/user/dashboard/address');
            }}
          >
            Alamat
          </li>
          <li>Ganti Password</li>
          <li
            className="cursor-pointer hover:text-[#F06105] hover:font-semibold"
            onClick={() => {
              navigate('/user/dashboard/order');
            }}
          >
            Pesanan
          </li>
        </ul>
        <div
          className="cursor-pointer hover:text-[#F06105] p-5 hover:font-semibold "
          onClick={onHandleLogOut}
        >
          Logout
        </div>
      </div>
      {toast && (
        <Toast
          status={toast.status}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export { DashboardTitle, DashboardSidebar };
