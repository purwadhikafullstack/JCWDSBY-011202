import AdminLayout from '../../../../components/AdminLayout';
import { useState, useEffect } from 'react';
import { Loading } from '../../../../components/loadingComponent';
import { FaPeopleGroup } from 'react-icons/fa6';
import { GiSofa } from 'react-icons/gi';
import { MdOutlineWarehouse } from 'react-icons/md';
import TopBarAdmin from '../../../../components/TopBarAdmin';
import ChartAdmin from '../../../../components/ChartAdmin';
import LandingAdminLayout from './Layout';
import API_CALL from '../../../../helpers/API';
const LandingAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [warehouse, setWarehouse] = useState([]);
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    fetchData();
  }, []);

  const ResourceCard = ({ icon, title, value }) => (
    <div className="flex items-center">
      {icon}
      <div className="ml-1 sm:ml-4">
        <h1 className="text-xs sm:text-base text-slate-400">{title}</h1>
        <h1 className="text-md sm:text-4xl color-[#495057] font-bold">
          {value}
        </h1>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get('/warehouses');
        setWarehouse(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get('/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get('/journal/get-data');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <LandingAdminLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-full mx-auto">
            {/* TOPBAR */}

            <div className="mx-4 sm:px-12">
              <div className="bg-white mt-4 sm:mt-12 p-2 sm:p-8 rounded shadow-md">
                <h1 className="sm:text-2xl font-bold sm:mb-4">
                  Resource Overview
                </h1>
                <hr className="my-2" />
                <div className="flex justify-between w-full mt-6">
                  <ResourceCard
                    icon={
                      <FaPeopleGroup className="bg-yellow-400 rounded-full p-2 text-white text-4xl sm:text-6xl" />
                    }
                    title="Admin"
                    value={data.countadmin}
                  />
                  <ResourceCard
                    icon={
                      <GiSofa className="bg-rose-400 rounded-full p-2 text-white text-4xl sm:text-6xl" />
                    }
                    title="Furnitures"
                    value={data.countproduct}
                  />
                  <ResourceCard
                    icon={
                      <MdOutlineWarehouse className="bg-green-400 rounded-full p-2 text-white text-4xl sm:text-6xl" />
                    }
                    title="Warehouses"
                    value={data.countwarehouse}
                  />
                </div>
              </div>
            </div>
            <ChartAdmin warehouses={warehouse} products={products} />
          </div>
        )}
      </LandingAdminLayout>
    </div>
  );
};

export default LandingAdmin;
