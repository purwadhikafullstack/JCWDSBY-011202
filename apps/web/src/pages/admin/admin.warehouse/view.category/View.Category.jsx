import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import { useState, useEffect } from 'react';
import API_CALL from '../../../../helpers/API';
const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get('/categories');
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
        <div className="p-4 flex justify-between items-center bg-white ">
          <div className="font-bold text-xl sm:ml-0 ml-4">Category List</div>
        </div>
        <div className="px-4 py-2">
          <div className="w-full mt-4">
            <div className="overflow-x-auto text rounded-lg">
              <table className="min-w-full border divide-y divide-gray-200 ">
                <thead className="bg-orange-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      No
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium tracking-wider  text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Product
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category, index) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap text-center">
                        {category.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {category.productCount}
                      </td>
                    </tr>
                  ))}
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
