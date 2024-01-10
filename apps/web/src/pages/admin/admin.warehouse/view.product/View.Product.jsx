import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatPriceToIDR } from '../../../../utils';

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  console.log(products);
  return (
    <div>
      <WareHouseAdminLayout>
        <div>
          <div className="sm:p-1 p-4 flex justify-between items-center">
            <div className="font-bold text-xl">Product List</div>
          </div>
          <div className="w-full mt-4">
            <div className="overflow-auto">
              <table className="w-full table-fixed overflow-scroll">
                <thead className="bg-[#F06105] text-white font-semibold">
                  <tr>
                    <th className="lg:px-1 lg:py-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase">
                      Product
                    </th>
                    <th className="lg:px-1 lg:py-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase">
                      Price
                    </th>
                    <th className="lg:px-1 lg:py-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase">
                      Description
                    </th>
                    <th className="lg:px-1 lg:py-1 px-3 py-2 text-[13px] font-medium tracking-wide uppercase">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((val, id) => {
                    return (
                      <tr
                        className={` border-b-[1px] border-slate-300 text-[13px] ${
                          id % 2 == 0 ? 'bg-slate-200' : 'bg-slate-300'
                        }`}
                        key={id}
                      >
                        <td className="py-2 align-middle pl-2 pr-5  ">
                          <div className=" align-middle font-semibold">
                            {val.name}
                          </div>
                        </td>
                        <td className="">
                          <div className=" align-middle pr-5 truncate text-center">
                            {products.length > 0
                              ? formatPriceToIDR(val.price)
                              : ''}
                          </div>
                        </td>
                        <td className="">
                          <div className=" align-middle px-2 truncate">
                            {val.description}
                          </div>
                        </td>
                        <td className="">
                          <div className=" align-middle pr-5 truncate text-center">
                            {val.category.category}
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

export default ViewProduct;
