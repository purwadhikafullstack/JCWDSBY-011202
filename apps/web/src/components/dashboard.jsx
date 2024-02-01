import { FaRegUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Toast from './Toast';
const DashboardTitle = (props) => {
  return (
    <div className="mb-8 mt-4">
      <p className="text-center text-5xl font-semibold mb-2">{props.title}</p>
      <p className="text-center text-md">{props.subTitle}</p>
    </div>
  );
};
const DashboardSidebar = (props) => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(null);

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
  return (
    <div className="text-right shadow-lg rounded-md md:w-[250px]">
      <div className="px-5 py-2">
        <div className="flex mx-auto justify-center  items-center rounded-full w-[70px] h-[70px] bg-slate-100 mb-3">
          {props.profilePict ? (
            <img src={props.profilePict} alt="" srcset="" />
          ) : (
            <FaRegUser className="text-3xl" />
          )}
        </div>
        <div className="font-semibold text-center text-lg">
          {props.username}
        </div>
      </div>
      <div className="border-t-[1px] border-[#F06105]"></div>
      <div>
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
          <li
            className="cursor-pointer hover:text-[#F06105] hover:font-semibold"
            onClick={onHandleLogOut}
          >
            Logout
          </li>
        </ul>
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
