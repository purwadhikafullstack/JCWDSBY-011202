import { useNavigate, useLocation } from 'react-router-dom';
import WarehouseAdminLayout from '../components/WareHouseAdminLayout';
import { IoMdArrowBack } from 'react-icons/io';
import InventoryTable from './InventoryTable';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import ButtonWithLoading from './ButtonWithLoading';

const WarehouseInventory = () => {
  const [warehouseInventory, setWarehouseInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [stock, setStock] = useState(1);
  const searchParams = new URLSearchParams(location.search);
  const warehouseId = searchParams.get('warehouse');

  const handleAddButtonClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/warehouse/storage${location.search}`,
      );
      setWarehouseInventory(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onHanldeNewAdd = async () => {
    console.log('TEST', warehouseInventory[0]);
    setLoading(true);
    try {
      const send = await axios.post(
        'http://localhost:8000/api/warehouse/storage',
        {
          warehouse_id: warehouseId,
          product_id: Number(selectedProductId),
          stock: stock,
        },
      );
      await fetchData();
      console.log(send);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const onHandleDelete = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/warehouse/storage${location.search}`,
      );
      setWarehouseInventory(response.data.data);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/warehouse/storage${location.search}`,
        );
        setWarehouseInventory(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/products`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <WarehouseAdminLayout>
        <div className="flex justify-between bg-white h-16 p-4 items-center">
          <div className="flex items-center">
            <div
              className="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                navigate('/admin/manage-inventory');
                sessionStorage.removeItem('warehouse_selected');
              }}
            >
              <IoMdArrowBack className="text-gray-700" size={24} />
            </div>
            <h1 className="mx-2 font-bold text-xl">Manage Inventory</h1>
          </div>
          <div>
            <button
              className="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none "
              onClick={handleAddButtonClick}
            >
              Add New Stock
            </button>
          </div>
        </div>
        <div className="p-4">
          <InventoryTable
            warehouseInventory={warehouseInventory}
            onDelete={onHandleDelete}
          />
        </div>
      </WarehouseAdminLayout>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center">
          <div className="absolute top-[40%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] bg-[#E6E6E6] p-2 w-[400px] h-[250px] rounded-md">
            <IoClose
              size={24}
              onClick={closeModal}
              className="cursor-pointer"
            />
            <h1 className="text-center font-bold text-lg">ADD NEW STOCK</h1>
            <div className="w-10/12 mx-auto mt-4 flex flex-col items-center">
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedProductId || ''}
                onChange={(e) => setSelectedProductId(e.target.value)}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Choose a product
                </option>
                {product
                  .filter(
                    (prod) =>
                      !warehouseInventory.some(
                        (inv) => inv.product_id === prod.id,
                      ),
                  )
                  .map((prod) => (
                    <option key={prod.id} value={prod.id}>
                      {prod.name}
                    </option>
                  ))}
              </select>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
                value={stock}
                onChange={(e) => setStock(parseInt(e.target.value) || 1)}
              >
                {[...Array(10).keys()].map((value) => (
                  <option key={value + 1} value={value + 1}>
                    {value + 1}
                  </option>
                ))}
              </select>
              <ButtonWithLoading
                title={'Add New'}
                isLoading={loading}
                onClick={onHanldeNewAdd}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseInventory;
