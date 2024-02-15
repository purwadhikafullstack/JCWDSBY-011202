import { useEffect, useState } from 'react';
import TemporaryFooter from '../../../components/Temporary/Footer';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import {
  DashboardSidebar,
  DashboardTitle,
} from '../../../components/dashboard';
import axios from 'axios';
import {
  OrderCard,
  OrderCardNone,
} from '../../../components/DashboardOrderCard';
import { Loading } from '../../../components/loadingComponent';
import { IModal } from '../../../components/modalRama';
import { useDispatch, useSelector } from 'react-redux';
import { updateStatus } from '../../../redux/slice/statusSlice';
const DashboardOrder = (props) => {
  const dispatch = useDispatch();
  const showModalConfirmation = useSelector((state) => state.statusSlice);
  const [dataOrder, setDataOrder] = useState([]);
  const [firstloading, setFirstLoading] = useState(false);
  const openLoading = (time) => {
    setFirstLoading(true);
    setTimeout(() => {
      setFirstLoading(false);
    }, time);
  };
  const getUserOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios.get('http://localhost:8000/api/userOrder/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataOrder(result.data);
    } catch (error) {
      console.error(error);
    }
  };
  const onHandleModalClick = async () => {
    try {
      // const deleteItem=JSON.parse(sessionStorage.getItem("deleteOrderId"))
      const token = localStorage.getItem('token');
      const result = await axios.patch(
        `http://localhost:8000/api/userOrder/delete`,
        { id: deleteItem.id, invoice: deleteItem.inv },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      getUserOrder();
      alert('Berhasil Membatalkan Pesanan');
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getUserOrder();
    openLoading(2500);
  }, []);

  return (
    <div>
      {firstloading ? (
        <Loading />
      ) : (
        <>
          <TemporaryNavbar />
          <DashboardTitle title={'Pesanan'} subTitle={'User/Pesanan'} />
          <div className="flex justify-center gap-4">
            <DashboardSidebar username={'Suhartono'} profPict={''} />
            <div className="shadow-lg rounded-md md:w-[560px] lg:w-[800px] p-5">
              <p className="text-lg font-semibold mb-4">Daftar Pesanan :</p>
              <div className="flex flex-col gap-4">
                {dataOrder.map((val, idx) => {
                  if (!dataOrder) {
                    return <OrderCardNone key={idx} />;
                  } else {
                    return (
                      <OrderCard
                        key={idx}
                        orderId={val.id}
                        orderDate={val.createdAt}
                        status={val.status}
                        invoice={val.invoice}
                        total_price={val.total_price.toLocaleString('id')}
                        itemDisplay={val.data[0]}
                        orderItem={val.data}
                        idName={`card${idx}`}
                        onHandleModalClick={onHandleModalClick}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
          {showModalConfirmation.invoice ? (
            <IModal
              deskripsi={'Apakah anda yakin menyelesaikan pesanan?'}
              confirm={'Ya'}
              cancel={'Tidak'}
              onHandleModalClick={async () => {
                try {
                  const token = localStorage.getItem('token');
                  const result = await axios.patch(
                    `http://localhost:8000/api/userOrder/confirm-order`,
                    {
                      order: showModalConfirmation.order_id,
                      invoice: showModalConfirmation.invoice,
                    },
                    {
                      headers: { Authorization: `Bearer ${token}` },
                    },
                  );
                  getUserOrder();
                  dispatch(
                    updateStatus({
                      order_id: '',
                      status: '',
                      invoice: '',
                    }),
                  );
                } catch (error) {
                  console.error(error);
                }
              }}
              onHandleModalCancel={() => {
                dispatch(
                  updateStatus({
                    order_id: '',
                    status: '',
                    invoice: '',
                  }),
                );
              }}
            />
          ) : (
            ''
          )}
          <TemporaryFooter />
        </>
      )}
    </div>
  );
};

export default DashboardOrder;
