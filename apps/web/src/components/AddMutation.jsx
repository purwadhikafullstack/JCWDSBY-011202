import WareHouseAdminLayout from './WareHouseAdminLayout';
import { IoMdArrowBack } from 'react-icons/io';
const AddMutation = () => {
  return (
    <div>
      <WareHouseAdminLayout>
        <div>
          <div className="flex justify-between bg-white h-16 p-4 items-center">
            <div className="flex items-center">
              <div class="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer">
                <IoMdArrowBack class="text-gray-700" size={24} />
              </div>
              <h1 className="mx-2 font-bold text-xl">Add Request</h1>
            </div>
            <div>
              <button class="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none ">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </WareHouseAdminLayout>
    </div>
  );
};

export default AddMutation;
