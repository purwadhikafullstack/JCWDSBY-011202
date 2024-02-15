import { useNavigate, useParams } from 'react-router-dom';
import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import { IoMdArrowBack } from 'react-icons/io';
import DataEditStock from '../../../../components/DataEditStock';
import { useEffect, useState } from 'react';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import { useSelector } from 'react-redux';
import { Loading } from '../../../../components/loadingComponent';
import Toast from '../../../../components/Toast';
import API_CALL from '../../../../helpers/API';
const EditStockProduct = () => {
  const navigate = useNavigate();
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  const { id } = useParams();
  const realIdNumber = parseInt(id.replace('storage-000', ''));
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [inventorySelected, setInventorySelected] = useState({});
  const [productSelected, setProductSelected] = useState({});
  const [operation, setOperation] = useState('add');
  const [stockChanges, setStockChanges] = useState(0);
  const [isConfirmationModal, setConfirmationModal] = useState(false);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const showToast = (status, message) => {
    setToast({ status, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };
  const fetchData = async () => {
    try {
      const response = await API_CALL.get(
        `/warehouse/storage?id=${realIdNumber}`,
      );
      const selectedInventory = response.data.data[0] || {};
      setInventorySelected(selectedInventory);
      setStockChanges(selectedInventory.stock || 0);

      if (selectedInventory.product_id) {
        const responseProduct = await API_CALL.get(
          `/products?id=${selectedInventory.product_id}`,
        );
        setProductSelected(responseProduct.data.products[0] || {});
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrease = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const handleIncrease = () => {
    setCounter(counter + 1);
  };

  useEffect(() => {
    fetchData();
  }, [realIdNumber]);

  useEffect(() => {
    const stockChange =
      operation === 'add' ? counter : operation === 'reduce' ? -counter : 0;
    const newStockChanges = Math.max(0, inventorySelected.stock + stockChange);
    setStockChanges(newStockChanges);
  }, [operation, counter, inventorySelected.stock]);

  const onConfirmationOpen = () => {
    if (counter > 0) {
      setConfirmationModal(true);
    }
  };

  const onConfirmationClose = () => setConfirmationModal(false);

  const handleSaveChanges = async () => {
    setLoading(true);
    let operator = operation === 'add' ? 'increment' : 'decrement';

    try {
      const response = await API_CALL.patch(
        `/warehouse/storage/${realIdNumber}`,
        {
          unit: counter,
          operation: operator,
        },
      );

      if (response.status === 200) {
        fetchData();
        showToast('success', `Succes Edit Stock`);
      }
    } catch (error) {
      console.error(error);
      showToast('danger', `Internal Server Error`);
    } finally {
      setLoading(false);
      onConfirmationClose();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <WareHouseAdminLayout>
        <div>
          <div className="flex justify-between bg-white h-16 p-4 items-center">
            <div className="flex items-center sm:mx-0 mx-4">
              <div
                className="rounded-lg border p-2 hover:bg-gray-200 cursor-pointer "
                onClick={() => {
                  navigate(
                    `/warehouse-admin/manage-inventory?warehouse=${sessionStorage.getItem(
                      'warehouse_selected',
                    )}`,
                  );
                }}
              >
                <IoMdArrowBack className="text-gray-700" size={24} />
              </div>
              <h1 className="mx-2 font-bold text-xl">Edit Stock</h1>
            </div>
            <div>
              <button
                onClick={onConfirmationOpen}
                disabled={false}
                className="font-medium text-sm bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition-all duration-300 ease-in-out focus:outline-none "
              >
                Save Changes
              </button>
            </div>
          </div>
          <div className="mx-6 bg-white m-8 pb-4">
            <div className="p-4 ">
              <h1 className="font-medium text-black ">Edit Stock</h1>
              <p className="text-sm font-light">
                Enhance your product's visual appeal by uploading captivating
                images that make it stand out.
              </p>
              <hr className="mt-2" />
            </div>
            <div className="mx-6 flex flex-col lg:flex-row">
              <div className="lg:w-1/3">
                <div className="w-full h-full sm:w-[400px] sm:h-[400px]">
                  <img
                    src={
                      productSelected?.product_images?.[0]?.image
                        ? `http://localhost:8000/productimage/${productSelected.product_images[0].image}`
                        : `https://placehold.co/400x400`
                    }
                    className="w-full"
                    alt="Product Preview"
                  />
                </div>
              </div>
              <div className="sm:mx-8 sm:mt-0 mt-2 w-full">
                <DataEditStock product={productSelected} />
                <div className="w-full mt-2 mb-2">
                  <div className="w-full mx-1 flex justify-center items-center">
                    <div className="w-full">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                        Pick Operation
                      </label>
                      <select
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="add">Add</option>
                        <option value="reduce">Reduce</option>
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
                        className="px-4 py-1  text-center w-full focus:outline-none border-none"
                        style={{ marginLeft: 'auto', marginRight: 'auto' }}
                      />
                      <button
                        onClick={handleIncrease}
                        disabled={stockChanges === 0 && operation === 'reduce'}
                        className="px-4 py-1 border  rounded-full"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex w-full justify-end items-end text-sm font-medium text-red-500 dark:text-gray-400">
                      <div className="mt-2">
                        <div className="flex">
                          <h1 className="mx-2">Now Stock:</h1>
                          <h1>
                            {inventorySelected.stock !== undefined
                              ? inventorySelected.stock
                              : 0}
                          </h1>
                        </div>
                        <div className="flex">
                          <h1 className="mx-2">Stock Changes:</h1>
                          <h1>{stockChanges}</h1>
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
      {isConfirmationModal && (
        <ConfirmationModal
          title={'Edit Stock'}
          onclickClose={onConfirmationClose}
          onClickCancel={onConfirmationClose}
          isLoading={loading}
          onClick={handleSaveChanges}
        />
      )}
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

export default EditStockProduct;
