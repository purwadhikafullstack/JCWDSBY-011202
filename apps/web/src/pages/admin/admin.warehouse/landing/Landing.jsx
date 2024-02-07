import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { VscAccount } from 'react-icons/vsc';
import { Loading } from '../../../../components/loadingComponent';
import ChartAdmin from '../../../../components/ChartWarehouseAdmin';
import axios from 'axios';
const LandingWarehouse = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [warehouse, setWarehouse] = useState([]);
  const [products, setProducts] = useState([]);
  const userGlobal = useSelector((state) => state.accountSliceReducer);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/warehouses',
        );
        setWarehouse(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <WareHouseAdminLayout>
        {isLoading || !userGlobal ? (
          <Loading />
        ) : (
          <div className="w-full mx-auto">
            <div className="w-full mx-auto bg-orange-500 flex p-4 justify-between items-center">
              <h1 className="text-2xl font-bold text-white cursor-pointer">
                Welcome, Admin
              </h1>
              <div className="flex items-center">
                <div className="mr-4">
                  <h1 className="text-[10px] font-semibold text-white">
                    {userGlobal.fullname}
                  </h1>
                  <h2 className="text-[10px] text-white">{userGlobal.role}</h2>
                </div>
                <VscAccount
                  size={24}
                  className="text-white hover:text-orange-200 transition-all duration-300 cursor-pointer"
                />
              </div>
            </div>
            <ChartAdmin
              user={userGlobal}
              warehouses={warehouse}
              product={products}
            />
          </div>
        )}
      </WareHouseAdminLayout>
    </div>
  );
};

export default LandingWarehouse;
