import { useNavigate, useLocation } from 'react-router-dom';
import WarehouseAdminLayout from '../components/WareHouseAdminLayout';
import Pagination from './Temporary/Pagination';
import { IoMdArrowBack, IoMdClose } from 'react-icons/io';
import InventoryTable from './InventoryTable';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ButtonWithLoading from './ButtonWithLoading';
import { Loading } from './loadingComponent';
import API_CALL from '../helpers/API';

const WarehouseInventory = () => {
  const [warehouseInventory, setWarehouseInventory] = useState([]);
  const [page, setPage] = useState(1);
  const [buttonLoading, setButtonLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [product, setProduct] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [stock, setStock] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [avalaibleProduct, setAvalaibleProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const userGlobal = useSelector((state) => state.accountSliceReducer);

  const fetchData = async () => {
    try {
      const response = await API_CALL.get(getApiUrl());
      setWarehouseInventory(response.data.data || []);
      setTotalPages(response.data.totalPages || 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getApiUrl = () => {
    if (userGlobal.role === 'superadmin') {
      return `/warehouse/storage${location.search}&page=${page}`;
    } else if (userGlobal.role === 'admin') {
      return `/warehouse/storage?warehouse=${userGlobal.warehouse_id}&page=${page}`;
    }
  };

  const handleAddButtonClick = () => setModalOpen(true);

  const closeModal = () => setModalOpen(false);

  const onHandleNewAdd = async () => {
    setButtonLoading(true);
    const selectedWarehouse =
      sessionStorage.getItem('warehouse_selected') || userGlobal.warehouse_id;
    try {
      await API_CALL.post('/warehouse/storage', {
        warehouse_id: Number(selectedWarehouse),
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
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [location.search, userGlobal, page]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API_CALL.get(`/products`);
        setProduct(response.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (userGlobal.role === 'superadmin') {
          response = await API_CALL.get(`/warehouse/storage${location.search}`);
        } else if (userGlobal.role === 'admin') {
          response = await API_CALL.get(
            `/warehouse/storage?warehouse=${userGlobal.warehouse_id}`,
          );
        }
        setAvalaibleProduct(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

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
        <div className="flex justify-center">
          <Pagination
            products={totalPages}
            onClickPrevious={() => setPage(page - 1)}
            onClickNext={() => setPage(page + 1)}
            page={page}
          />
        </div>
      </WarehouseAdminLayout>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#E6E6E6] p-4 w-[400px] h-[250px] rounded-md">
            <IoMdClose
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
                {product.filter(
                  (prod) =>
                    !avalaibleProduct.some((inv) => inv.product_id === prod.id),
                ).length === 0 ? (
                  <option value="" disabled hidden>
                    You have all products in your storage
                  </option>
                ) : (
                  <>
                    <option value="" disabled hidden>
                      Choose a product
                    </option>
                    {product
                      .filter(
                        (prod) =>
                          !avalaibleProduct.some(
                            (inv) => inv.product_id === prod.id,
                          ),
                      )
                      .map((prod) => (
                        <option key={prod.id} value={prod.id}>
                          {prod.name}
                        </option>
                      ))}
                  </>
                )}
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
