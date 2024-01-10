import { useNavigate } from 'react-router-dom';
import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import { IoMdArrowBack } from 'react-icons/io';

const EditStockProduct = () => {
  const navigate = useNavigate();
  return (
    <div>
      <WareHouseAdminLayout>
        <div>
          <div className="flex justify-between bg-white h-16 p-4 items-center">
            <div className="flex items-center">
              <div
                class="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  navigate('/warehouse-admin/manage-inventory');
                }}
              >
                <IoMdArrowBack class="text-gray-700" size={24} />
              </div>
              <h1 className="mx-2 font-bold text-xl">Edit Stock</h1>
            </div>
          </div>
        </div>
      </WareHouseAdminLayout>
    </div>
  );
};

export default EditStockProduct;
