import AdminLayout from '../../../../components/AdminLayout';
import { useState, useEffect } from 'react';
import { Loading } from '../../../../components/loadingComponent';
import { FaPeopleGroup } from 'react-icons/fa6';
import { GiSofa } from 'react-icons/gi';
import { MdOutlineWarehouse } from 'react-icons/md';
import TopBarAdmin from '../../../../components/TopBarAdmin';
import axios from 'axios';
import ChartAdmin from '../../../../components/ChartAdmin';
const LandingAdmin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [warehouse, setWarehouse] = useState([]);
  const [products, setProducts] = useState([]);
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
      <div className="ml-4">
        <h1 className="text-slate-400">{title}</h1>
        <h1 className="text-4xl color-[#495057] font-bold">{value}</h1>
      </div>
    </div>
  );

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
      <AdminLayout>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-full mx-auto">
            {/* TOPBAR */}
            <TopBarAdmin />
            <div className="px-12">
              <div className="bg-white mt-12 p-8 rounded shadow-md">
                <h1 className="text-2xl font-bold mb-4">Resource Overview</h1>
                <hr className="my-2" />
                <div className="flex justify-between w-full mt-6">
                  <ResourceCard
                    icon={
                      <FaPeopleGroup
                        size={56}
                        className="bg-yellow-400 rounded-full p-2 text-white"
                      />
                    }
                    title="Admin"
                    value="7"
                  />
                  <ResourceCard
                    icon={
                      <GiSofa
                        size={56}
                        className="bg-rose-400 rounded-full p-2 text-white"
                      />
                    }
                    title="Furnitures"
                    value="13"
                  />
                  <ResourceCard
                    icon={
                      <MdOutlineWarehouse
                        size={56}
                        className="bg-green-400 rounded-full p-2 text-white"
                      />
                    }
                    title="Warehouses"
                    value="3"
                  />
                </div>
              </div>
            </div>
            <ChartAdmin warehouses={warehouse} products={products} />
          </div>
        )}
      </AdminLayout>
    </div>
  );
};

export default LandingAdmin;
