import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import { useState, useEffect } from 'react';
import axios from 'axios';
const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/categories',
        );
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchData();
  }, []);
  console.log(categories);

  return (
    <div>
      <WareHouseAdminLayout>
        <div className='px-4 py-2' >
          <div className="sm:p-1 p-4 flex justify-between items-center">
            <div className="font-bold text-xl">Category List</div>
          </div>
          <div className="w-full mt-4">
            <div className="overflow-auto">
              <table className="w-full table-fixed overflow-scroll">
                <thead className="bg-[#F06105] text-white font-semibold">
                  <tr>
                    <th className="lg:px-1 lg:py-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase">
                      Category
                    </th>
                    <th className="lg:px-1 lg:py-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase">
                      Products
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((val, id) => {
                    return (
                      <tr
                        className={` border-b-[1px] border-slate-300 text-[13px] ${
                          id % 2 === 0 ? 'bg-slate-200' : 'bg-slate-300'
                        }`}
                        key={id}
                      >
                        <td className="py-2 align-middle pl-2 pr-5 text-center">
                          <div className="align-middle font-semibold">
                            {val.category}
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="align-middle pr-5 truncate">
                            {val.productCount}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </WareHouseAdminLayout>
    </div>
  );
};

export default ViewCategory;
