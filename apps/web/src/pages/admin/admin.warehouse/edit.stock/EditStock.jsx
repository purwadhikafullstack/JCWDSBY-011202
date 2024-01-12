import { useNavigate } from 'react-router-dom';
import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import { IoMdArrowBack } from 'react-icons/io';
import DataEditStock from '../../../../components/DataEditStock';
import { useState } from 'react';
const EditStockProduct = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(1);

  const handleDecrease = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };
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
            <div>
              <button class="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none ">
                Save Changes
              </button>
            </div>
          </div>
          <div>
            <div className="mx-6 bg-white m-8 pb-4">
              <div className="p-4 ">
                <h1 className="font-medium text-black ">Edit Stock</h1>
                <p className="text-sm font-light">
                  Enhance your product's visual appeal by uploading captivating
                  images that make it stand out.
                </p>
                <hr className="mt-2" />
              </div>
              <div className="mx-6 flex">
                <div>
                  <div className="w-[400px] h-[400px]">
                    <img src="https://placehold.co/400x400" alt="" />
                  </div>
                </div>
                <div className="mx-2 w-full">
                  <DataEditStock />
                  <div className="w-full ">
                    <div className="w-full">
                      <div className="w-full mx-1 flex justify-center items-center">
                        <div className="w-full">
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                            Pick Operation
                          </label>
                          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value="defaultCategory">Add</option>
                            <option value="category1">Reduce</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="w-full flex mx-2 mt-2">
                          <button
                            onClick={handleDecrease}
                            className="px-4 py-1 border rounded-full"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={counter}
                            onChange={(e) =>
                              setCounter(parseInt(e.target.value) || 0)
                            }
                            className="px-4 py-1  text-center w-full focus:outline-none"
                            style={{ marginLeft: 'auto', marginRight: 'auto' }}
                          />
                          <button
                            onClick={() => setCounter(counter + 1)}
                            className="px-4 py-1 border  rounded-full"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex w-full justify-end items-end text-sm font-medium text-red-500 dark:text-gray-400">
                          <div className="mt-2">
                            <div className="flex">
                              <h1 className="mx-2">Now Stock:</h1>
                              <h1>19</h1>
                            </div>
                            <div className="flex">
                              <h1 className="mx-2">Stock Changes:</h1>
                              <h1>20</h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WareHouseAdminLayout>
    </div>
  );
};
export default EditStockProduct;
