import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API_CALL from '../helpers/API';

const JournalWarehouseAdmin = () => {
  const [journal, setJournal] = useState([]);
  const navigate = useNavigate();
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get(
          `/journal?warehouse_id=${userGlobal.warehouse_id}`,
        );
        setJournal(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto my-4 px-6 py-3 bg-white rounded-md shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Journal</h1>
        <button
          className="text-black py-2 px-4 rounded-md transition-all duration-300 hover:text-orange-500 "
          onClick={() => {
            navigate('/view-warehouse-journal');
          }}
        >
          View All
        </button>
      </div>
      <div className="max-h-[200px] overflow-y-auto">
        {journal && journal.length > 0 ? (
          journal.map((val) => (
            <div key={val.id} className="flex py-2 border-b">
              <h2 className="font-bold text-sm">
                {val.information} [
                <span className="text-gray-500 text-[12px]">{val.date}</span>]
              </h2>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No journal entries available.</p>
        )}
      </div>
    </div>
  );
};

export default JournalWarehouseAdmin;
