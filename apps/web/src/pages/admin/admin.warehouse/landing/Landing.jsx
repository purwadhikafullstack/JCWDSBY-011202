import { useState, useEffect } from 'react';
import { Loading } from '../../../../components/loadingComponent';
import ChartAdmin from '../../../../components/ChartWarehouseAdmin';
import axios from 'axios';
import LandingWareHouseAdminLayout from './Layout';
import { useSelector } from 'react-redux';
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
      <LandingWareHouseAdminLayout>
        {isLoading || !userGlobal ? (
          <Loading />
        ) : (
          <div className="w-full mx-auto">
            <ChartAdmin
              user={userGlobal}
              warehouses={warehouse}
              product={products}
            />
          </div>
        )}
      </LandingWareHouseAdminLayout>
    </div>
  );
};

export default LandingWarehouse;
