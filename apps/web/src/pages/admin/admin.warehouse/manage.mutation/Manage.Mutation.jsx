import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import MutationJournalTable from '../../../../components/MutationJournalTable';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Loading } from '../../../../components/loadingComponent';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import Toast from '../../../../components/Toast';

const ManageMutation = () => {
  const navigate = useNavigate();
  const [temporaryMutation, setTemporaryMutation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isStatusToUpdate, setIsStatusToUpdate] = useState(0);
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [isMutationId, setMutationId] = useState(0);
  const [endPoint, setEndPoint] = useState('');

  const onCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const confirmMutation = (id) => {
    setIsStatusToUpdate(1);
    setMutationId(id);
    setEndPoint(`http://localhost:8000/api/warehouse/mutation/confirm/${id}`);
    setShowConfirmationModal(true);
  };

  const deliverMutation = (id) => {
    setIsStatusToUpdate(2);
    setMutationId(id);
    setEndPoint(`http://localhost:8000/api/warehouse/mutation/process/${id}`);
    setShowConfirmationModal(true);
  };

  const arrivedMutation = (id) => {
    setIsStatusToUpdate(3);
    setMutationId(id);
    setEndPoint(`http://localhost:8000/api/warehouse/mutation/arrival/${id}`);
    setShowConfirmationModal(true);
  };

  const doneMutation = (id) => {
    setIsStatusToUpdate(4);
    setMutationId(id);
    setEndPoint(`http://localhost:8000/api/warehouse/mutation/finish/${id}`);
    setShowConfirmationModal(true);
  };

  const showToast = (status, message) => {
    setToast({ status, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  const onHandleAdd = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        endPoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success === true) {
        showToast(
          'success',
          response.data.message || 'Mutation status updated successfully',
        );

        const mutationResponse = await axios.get(
          `http://localhost:8000/api/warehouse/mutation?warehouse_id=${userGlobal.warehouse_id}`,
        );

        setTemporaryMutation(mutationResponse.data.data);
      } else {
        showToast(
          'danger',
          response.data.message || 'Failed to update mutation status',
        );
      }
    } catch (error) {
      console.error('Error updating mutation status:', error);
      showToast(
        'danger',
        error.response.data.message || 'An error occurred. Please try again.',
      );
    } finally {
      setIsStatusToUpdate(0);
      setMutationId(0);
      setEndPoint('');
      setButtonLoading(false);
      onCloseConfirmationModal();
    }
  };

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
            <div className="font-bold text-xl">Mutation Stock</div>
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
            <MutationJournalTable
              mutation={temporaryMutation}
              onClickConfirmMutation={confirmMutation}
              onClickArrived={arrivedMutation}
              onClickDeliver={deliverMutation}
              onClickDone={doneMutation}
            />
          )}
        </div>
        {showConfirmationModal && (
          <ConfirmationModal
            onClickCancel={onCloseConfirmationModal}
            onclickClose={onCloseConfirmationModal}
            title={
              isStatusToUpdate === 1
                ? 'Are you sure you want to confirm and process the mutation?'
                : isStatusToUpdate === 2
                  ? 'Are you sure you want to deliver?'
                  : isStatusToUpdate === 3
                    ? 'Are you sure you want to update the mutation arrived?'
                    : isStatusToUpdate === 4
                      ? 'Are you sure you want to done the mutation?'
                      : ''
            }
            isLoading={buttonLoading}
            onClick={onHandleAdd}
          />
        )}
        {toast && (
          <Toast
            status={toast.status}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </WareHouseAdminLayout>
    </div>
  );
};

export default ManageMutation;
