import { useNavigate } from 'react-router-dom';
import WareHouseAdminLayout from './WareHouseAdminLayout';
import { IoMdArrowBack } from 'react-icons/io';
import { useEffect, useState } from 'react';
import InputMutation from './InputAddMutation';
import ConfirmationModal from './ConfirmationModal';
import Toast from './Toast';
import API_CALL from '../helpers/API';

const AddMutation = () => {
  const navigate = useNavigate();
  const [selectedProductId, setSelectedProductId] = useState(0);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(0);
  const [stockSelectedInventory, setStockSelectedInventory] = useState(0);
  const [counter, setCounter] = useState(0);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const onHandleAdd = () => {
    setShowConfirmationModal(true);
  };

  const handleDecrease = () => {
    setCounter((prevCounter) => Math.max(prevCounter - 1, 0));
  };

  const handleIncrease = () => {
    setCounter((prevCounter) =>
      Math.min(prevCounter + 1, stockSelectedInventory),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get(
          `/warehouse/storage?warehouse=${selectedWarehouseId}&product_id=${selectedProductId}`,
        );
        console.log(response.data.data);
        const stock = response.data.data[0]?.stock || 0;
        setStockSelectedInventory(stock);
      } catch (error) {
        console.error('Error fetching data:', error);
        setStockSelectedInventory(0);
      }
    };

    fetchData();
  }, [selectedWarehouseId, selectedProductId]);

  const showToast = (status, message) => {
    setToast({ status, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const onCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };
  const onHandleYes = async () => {
    const token = localStorage.getItem('token');
    if (counter < 1) {
      setLoading(false);
      onCloseConfirmationModal();
      showToast('warning', 'Quantity must be at least 1');
      return;
    }
    try {
      setLoading(true);

      const response = await API_CALL.post(
        '/warehouse/mutation',
        {
          product_id: selectedProductId,
          source_warehouse_id: selectedWarehouseId,
          quantity: counter,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        showToast(
          'success',
          response.data.message || 'Request created successfully',
        );
      } else {
        showToast(
          'danger',
          response.data.message || 'Failed to create request',
        );
      }
    } catch (error) {
      console.error('Error creating request:', error);
      showToast(
        'danger',
        error.response?.data?.message || 'An error occurred. Please try again.',
      );
    } finally {
      setLoading(false);
      onCloseConfirmationModal();
    }
  };

  return (
    <div>
      <WareHouseAdminLayout>
        <div>
          <div className="flex justify-between bg-white h-16 p-4 items-center">
            <div className="flex items-center sm:ml-0 ml-4">
              <div
                onClick={() => navigate('/warehouse-admin/manage-mutation')}
                className="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer"
              >
                <IoMdArrowBack className="text-gray-700" size={24} />
              </div>
              <h1 className="mx-2 font-bold text-xl">Add Request</h1>
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto mt-4 bg-white p-4 rounded-md">
          <div>
            <h1 className="text-center text-xl font-bold">Request Product </h1>
            <hr className="mb-4 mt-2" />
          </div>
          {/* CONTENT */}
          <InputMutation
            valueProduct={selectedProductId}
            onChangeProduct={(e) => setSelectedProductId(e.target.value)}
            valueWarehouse={selectedWarehouseId}
            onChangeWarehouse={(e) => setSelectedWarehouseId(e.target.value)}
          />
          <div className="flex justify-between">
            <div className="w-1/2 flex mx-2 mt-2">
              <button
                onClick={handleDecrease}
                disabled={counter === 0}
                className="px-4 py-1 border rounded-full"
              >
                -
              </button>
              <input
                type="text"
                inputMode="numeric"
                value={counter}
                onChange={(e) => setCounter(parseInt(e.target.value) || 0)}
                className="px-4 py-1 text-center w-full focus:outline-none border-none"
                style={{ marginLeft: 'auto', marginRight: 'auto' }}
              />
              <button
                onClick={handleIncrease}
                disabled={counter === stockSelectedInventory}
                className="px-4 py-1 border rounded-full"
              >
                +
              </button>
            </div>
            <h1 className="w-1/2 text-end text-sm font-medium text-gray-900 dark:text-gray-400">
              Stock Source Warehouse : {stockSelectedInventory}
            </h1>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={onHandleAdd}
              className="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none"
            >
              Save Changes
            </button>
          </div>
        </div>
        {showConfirmationModal && (
          <ConfirmationModal
            onClickCancel={onCloseConfirmationModal}
            onclickClose={onCloseConfirmationModal}
            title="Add Request"
            isLoading={loading}
            onClick={onHandleYes}
          />
        )}
        {toast && (
          <Toast
            status={toast.status}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </WareHouseAdminLayout>
    </div>
  );
};

export default AddMutation;
