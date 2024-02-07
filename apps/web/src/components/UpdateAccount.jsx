import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import EditWarehouseAdmin from './EditWarehouseAdmin';
import { IoMdArrowBack } from 'react-icons/io';
const UpdateAccount = () => {
  const navigate = useNavigate();
  return (
    <div>
      <AdminLayout>
        <div className="flex justify-between bg-white h-16 p-4 items-center">
          <div className="flex items-center">
            <div className="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer">
              <IoMdArrowBack
                className="text-gray-700"
                size={24}
                onClick={() => navigate('/admin/manage-account')}
              />
            </div>
            <h1 className="mx-2 font-bold text-xl">Add Admin</h1>
          </div>
        </div>
        <div className="mx-6 bg-white m-8 pb-4">
          <div className="flex mx-auto w-6/12">
            <div className="mx-auto mt-4">Warehouse Admin Update</div>
          </div>
          <hr className="w-11/12 mx-auto mt-3" />
          <div className="mt-4">
            <EditWarehouseAdmin
              onChangeEmail={(e) => setEmail(e.target.value)}
              onChangePassword={(e) => setPassword(e.target.value)}
              onChangeFullName={(e) => setFullName(e.target.value)}
              onChangeWarehouse={(e) => setWarehouse(e.target.value)}
            />
          </div>
          <div className="flex justify-end p-2 mt-2">
            <button className="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none">
              Save Changes
            </button>
          </div>
        </div>
      </AdminLayout>
    </div>
  );
};

export default UpdateAccount;
