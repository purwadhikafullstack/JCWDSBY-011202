import Layout from '../pages/admin/admin/landing/Layout';
import { useEffect, useState } from 'react';
import JournalSalesAdmin from './Temporary/SalesAdminJournal';
import JournalStockAdmin from './Temporary/StockAdminJournal';
import Pagination from './Temporary/Pagination';
import { useSearchParams } from 'react-router-dom';
import API_CALL from '../helpers/API';
import { Loading } from './loadingComponent';

const ViewAllJournalWarehouse = () => {
  const [page, setPage] = useState(1);
  const [warehouses, setWarehouses] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isTable, setTable] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [SelectedWarehouses, setSelectedWarehouses] = useState('');
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleTableChange = (e) => {
    setPage(1);
    setTable(parseInt(e.target.value));
  };

  const handlePageChange = (newTotalPages) => {
    setTotalPages(newTotalPages);
  };

  useEffect(() => {
    setLoading(true);
    setSearchParams((val) => {
      val.set('page', page);
      if (page > totalPages) {
        val.set('page', totalPages);
      }
      return val;
    });
    setLoading(false);
  }, [totalPages, page, setSearchParams, totalPages]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await API_CALL.get('/warehouses');
        setWarehouses(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Layout>
        <div className="bg-white w-11/12 mx-auto mt-4 rounded-md shadow-md">
          <h1 className="text-center font-bold text-2xl">JOURNAL</h1>
          <div className="my-2 mx-4 w-3/4 flex">
            <select
              onChange={handleTableChange}
              value={isTable}
              className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={1}>Stock Report</option>
              <option value={2}>Sales Report</option>
            </select>
            <select
              onChange={(e) => {
                setSelectedWarehouses(e.target.value);
                setSearchParams((val) => {
                  val.set('warehouse_id', e.target.value);
                  if (!e.target.value) {
                    val.delete('warehouse_id');
                  }
                  return val;
                });
              }}
              className="w-1/2 mx-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Warehouse</option>
              {warehouses &&
                warehouses.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="my-4">
            {loading ? (
              <Loading />
            ) : (
              <>
                {isTable === 1 ? (
                  <JournalStockAdmin onPageChange={handlePageChange} />
                ) : (
                  <JournalSalesAdmin onPageChange={handlePageChange} />
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center mb-2">
          <Pagination
            products={totalPages}
            page={page}
            onClickPrevious={() => setPage(page - 1)}
            onClickNext={() => setPage(page + 1)}
          />
        </div>
      </Layout>
    </div>
  );
};

export default ViewAllJournalWarehouse;
