import { useEffect, useState } from 'react';
import Layout from '../pages/admin/admin.warehouse/landing/Layout';
import JournalSales from './Temporary/SalesJournal';
import Pagination from './Temporary/Pagination';
import JournalStock from './Temporary/StockJournal';
import { useSearchParams } from 'react-router-dom';

const ViewAllJournalWarehouse = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isTable, setTable] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleTableChange = (e) => {
    setPage(1);
    setTable(parseInt(e.target.value));
  };

  const handlePageChange = (newTotalPages) => {
    setTotalPages(newTotalPages);
  };

  useEffect(() => {
    setSearchParams((val) => {
      val.set('page', page);
      if (page > totalPages) {
        val.set('page', totalPages);
      }
      return val;
    });
  }, [totalPages, page]);

  return (
    <div>
      <Layout>
        <div className="bg-white w-11/12 mx-auto mt-4 rounded-md shadow-md">
          <h1 className="text-center font-bold">JOURNAL</h1>
          <div className="my-2 mx-4">
            <select
              onChange={handleTableChange}
              value={isTable}
              className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={1}>Stock Report</option>
              <option value={2}>Sales Report</option>
            </select>
          </div>
          <div className="my-4">
            {isTable === 1 ? (
              <JournalStock onPageChange={handlePageChange} />
            ) : (
              <JournalSales onPageChange={handlePageChange} />
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
