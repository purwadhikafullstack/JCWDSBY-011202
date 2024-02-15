import { useState, useEffect } from 'react';
import API_CALL from '../../helpers/API';
import { useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';

const JournalSalesAdmin = ({ onPageChange }) => {
  const [journal, setJournal] = useState([]);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get(
          `/journal/sales-journal${location.search}`,
        );
        setJournal(response.data.salesJournals);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [location]);

  useEffect(() => {
    onPageChange(totalPages);
  }, [totalPages, onPageChange]);

  return (
    <div>
      <div className="overflow-x-auto text rounded-lg">
        <table className="min-w-full border divide-y divide-gray-200 ">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {journal.length > 0 &&
              journal.map((val) => (
                <tr key={val.id}>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {val.date.split('T')[0]}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {val.product_name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {val.quantity}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JournalSalesAdmin;
