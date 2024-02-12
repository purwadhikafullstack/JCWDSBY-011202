import { useNavigate, useLocation } from 'react-router-dom';
import WarehouseAdminLayout from '../components/WareHouseAdminLayout';
import AdminLayout from './AdminLayout';
import { IoMdArrowBack } from 'react-icons/io';
import InventoryTable from './InventoryTable';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ButtonWithLoading from './ButtonWithLoading';
import { Loading } from './loadingComponent';

const WarehouseInventory = () => {
  const [warehouseInventory, setWarehouseInventory] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [stock, setStock] = useState(1);
  const userGlobal = useSelector((state) => state.accountSliceReducer);

  const handleAddButtonClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const fetchData = async () => {
    try {
      let response;

      if (userGlobal.role === 'superadmin') {
        response = await axios.get(
          `http://localhost:8000/api/warehouse/storage${location.search}`,
        );
      } else if (userGlobal.role === 'admin') {
        response = await axios.get(
          `http://localhost:8000/api/warehouse/storage?warehouse=${userGlobal.warehouse_id}`,
        );
      }

      setWarehouseInventory(response?.data?.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onHandleNewAdd = async () => {
    console.log(stock, selectedProductId);
    setButtonLoading(true);
    const selected_warehouse = sessionStorage.getItem('warehouse_selected');
    try {
      await axios.post('http://localhost:8000/api/warehouse/storage', {
        warehouse_id:
          Number(selected_warehouse) || Number(userGlobal.warehouse_id),
        product_id: Number(selectedProductId),
        stock: stock,
      });

      await fetchData();
    } catch (error) {
      console.error('Error adding new stock:', error);
    } finally {
      setButtonLoading(false);
      closeModal();
    }
  };

  const onHandleDelete = async () => {
    try {
      await fetchData();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location.search, userGlobal]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <WarehouseAdminLayout>
        <div className="flex justify-between bg-white h-16 p-4 items-center">
          <div className="flex items-center sm:ml-0 ml-4">
            <div
              className="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                if (userGlobal.role === 'superadmin') {
                  navigate('/admin/manage-inventory');
                  sessionStorage.removeItem('warehouse_selected');
                } else {
                  navigate('/warehouse-admin');
                }
              }}
            >
              <IoMdArrowBack className="text-gray-700" size={24} />
            </div>
            <h1 className="mx-2 font-bold sm:text-xl">Manage Inventory</h1>
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
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#E6E6E6] p-4 w-[400px] h-[250px] rounded-md">
            <IoClose
              size={24}
              onClick={closeModal}
              className="cursor-pointer absolute top-2 right-2"
            />
            <h1 className="text-center font-bold text-lg">ADD NEW STOCK</h1>
            <div className="w-10/12 mx-auto mt-4 flex flex-col border-none">
              <select
                className="input-style border-none"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
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
                className="input-style mt-2 border-none"
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
                isLoading={buttonLoading}
                onClick={onHandleNewAdd}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WarehouseInventory;
