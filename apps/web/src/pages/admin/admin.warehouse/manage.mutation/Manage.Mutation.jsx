import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import MutationJournalTable from '../../../../components/MutationJournalTable';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Loading } from '../../../../components/loadingComponent';

const ManageMutation = () => {
  const navigate = useNavigate();
  const [temporaryMutation, setTemporaryMutation] = useState([]);
  const [loading, setLoading] = useState(true);
  const userGlobal = useSelector((state) => state.accountSliceReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/warehouse/mutation?warehouse_id=${userGlobal.warehouse_id}`,
        );
        setTemporaryMutation(response.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userGlobal.warehouse_id]);

  return (
    <div>
      <WareHouseAdminLayout>
        <div>
          <div className="p-4 flex justify-between items-center bg-white">
            <div className="font-bold text-xl ">Mutation Stock</div>
            <button
              style={{ cursor: 'pointer' }}
              onClick={() =>
                navigate('/warehouse-admin/manage-mutation/add-request')
              }
              className="text-white rounded-md bg-[#F06105] px-4 py-1 w-fit shadow-sm hover:bg-[#E85400] transition-all duration-300"
            >
              Make Request <span className="font-bold">+</span>
            </button>
          </div>
        </div>
        <div className="w-full mt-4 p-4">
          {loading ? (
            <Loading />
          ) : (
            <MutationJournalTable mutation={temporaryMutation} />
          )}
        </div>
      </WareHouseAdminLayout>
    </div>
  );
};

export default ManageMutation;
