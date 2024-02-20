import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Loading } from '../../../../components/loadingComponent';
import ConfirmationModal from '../../../../components/ConfirmationModal';
import Toast from '../../../../components/Toast';
import MutationJournalTable from '../../../../components/MutationJournalTable';
import Pagination from '../../../../components/Temporary/Pagination';
import MutationFilter from '../../../../components/MutationFIlter';
import API_CALL from '../../../../helpers/API';
const ManageMutation = () => {
  const navigate = useNavigate();
  const userGlobal = useSelector((state) => state.accountSliceReducer);
  const [temporaryMutation, setTemporaryMutation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const location = useLocation();
  const query = location.search;
  const [isStatusToUpdate, setIsStatusToUpdate] = useState(0);
  const [isMutationId, setMutationId] = useState(0);
  const onCloseConfirmationModal = () => setShowConfirmationModal(false);

  const handlesShowConfirmation = (status, id) => {
    setIsStatusToUpdate(status);
    setMutationId(id);
    setShowConfirmationModal(true);
  };

  const handleMutationAction = async (status, id) => {
    try {
      let actionEndpoint = '';
      switch (status) {
        case 1:
          actionEndpoint = `/warehouse/mutation/confirm/${id}`;
          break;
        case 2:
          actionEndpoint = `/warehouse/mutation/process/${id}`;
          break;
        case 3:
          actionEndpoint = `/warehouse/mutation/arrival/${id}`;
          break;
        case 4:
          actionEndpoint = `/warehouse/mutation/finish/${id}`;
          break;
        case 5:
          actionEndpoint = `/warehouse/mutation/delete/${id}`;
          break;
        case 6:
          actionEndpoint = `/warehouse/mutation/cancel/${id}`;
          break;
        default:
          break;
      }

      const token = localStorage.getItem('token');
      const response = await API_CALL.patch(
        actionEndpoint,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const successMessage = response.data.success
        ? response.data.message || 'Mutation status updated successfully'
        : 'Mutation status update failed';

      showToast(response.data.success ? 'success' : 'danger', successMessage);

      if (response.data.success) {
        const mutationResponse = await API_CALL.get(
          `/warehouse/mutation?warehouse_id=${userGlobal.warehouse_id}&page=${page}`,
        );
        setTemporaryMutation(mutationResponse.data.data);
      }
    } catch (error) {
      console.error('Error updating mutation status:', error);
      showToast(
        'danger',
        error.response?.data.message || 'An error occurred. Please try again.',
      );
    } finally {
      setButtonLoading(false);
      setShowConfirmationModal(false);
    }
  };

  const showToast = (status, message) => {
    setToast({ status, message });
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API_CALL.get(
          `/warehouse/mutation${
            query || `?warehouse_id=${userGlobal.warehouse_id}&page=${page}`
          }`,
        );
        setTemporaryMutation(response.data.data);
        setTotalPage(response.data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userGlobal.warehouse_id, location, page]);

  return (
    <div>
      <WareHouseAdminLayout>
        <div>
          <div className="p-4 flex justify-between items-center bg-white ">
            <div className="font-bold text-xl sm:ml-0 ml-4">Mutation Stock</div>
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
            <div>
              <MutationFilter page={page} />
              <MutationJournalTable
                mutation={temporaryMutation}
                onClickConfirmMutation={(id) => handlesShowConfirmation(1, id)}
                onClickArrived={(id) => handlesShowConfirmation(3, id)}
                onClickDeliver={(id) => handlesShowConfirmation(2, id)}
                onClickDone={(id) => handlesShowConfirmation(4, id)}
                onClickDelete={(id) => handlesShowConfirmation(5, id)}
                handleCancel={(id) => handlesShowConfirmation(6, id)}
              />
              <div className="flex justify-center mt-2">
                <Pagination
                  products={totalPage || 1}
                  page={page}
                  onClickPrevious={() => setPage(page - 1)}
                  onClickNext={() => setPage(page + 1)}
                />
              </div>
            </div>
          )}
        </div>
        {showConfirmationModal && (
          <ConfirmationModal
            onClickCancel={onCloseConfirmationModal}
            onclickClose={onCloseConfirmationModal}
            title={'Are you sure to do this action?'}
            isLoading={buttonLoading}
            onClick={() => {
              handleMutationAction(isStatusToUpdate, isMutationId);
            }}
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
