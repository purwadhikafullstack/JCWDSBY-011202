import { useEffect, useState } from 'react';
import ManageOrderTable from '../../../../components/ManageOrderTableComponent.jsx';
import WareHouseAdminLayout from '../../../../components/WareHouseAdminLayout';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  ModalOrderInformation,
  ModalUpdateStatus,
} from '../../../../components/modalRama3.jsx';
import { updateItem } from '../../../../redux/slice/orderSlice.js';
import { updateStatus } from '../../../../redux/slice/statusSlice.js';
import { IModal } from '../../../../components/modalRama.jsx';

const WarehouseManageOrder = () => {
  const editItem = useSelector((state) => state.orderSlice);
  const editStatus = useSelector((state) => state.statusSlice);
  const dispatch = useDispatch();
  const [confirmationModalStatus, setConfirmationModalStatus] = useState(false);
  const [showModalChangeStatus, setShowModalChangeStatus] = useState(false);
  const [data, setData] = useState([]);
  const token = localStorage.getItem('token');
  const header = [
    { th: 'Invoice', width: 'w-[130px]' },
    { th: 'Date Invoice', width: 'w-[150px]' },
    { th: 'Lokasi Gudang', width: 'w-[180px]' },
    { th: 'Bukti Pembayaran', width: 'w-[160px]' },
    { th: 'Total Price', width: 'w-[180px]' },
    { th: 'Status', width: 'w-[150px]' },
    { th: 'Action', width: 'w-[100px]' },
  ];
  const getDataOrder = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8000/api/warehouse/order`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataOrder();
  }, []);
  return (
    <>
      <WareHouseAdminLayout>
        <div className="px-4 py-3">
          <p className="font-bold mb-5 text-xl">Manage Order</p>
          <ManageOrderTable
            header={[
              'Invoice',
              'Date Invoice',
              'Alamat Pengiriman',
              'Bukti Pembayaran',
              'Total Price',
              'Status',
              'Action',
            ]}
            // showModalChangeStatus={() => {
            //   setShowModalChangeStatus(true);
            // }}
            data={data}
          />
        </div>
        {editItem.order_id ? (
          <ModalOrderInformation
            data={editItem}
            onHandleModalCancel={() => {
              dispatch(
                updateItem({
                  order_id: '',
                  address: '',
                  city: '',
                  province: '',
                  warehouse_id: '',
                  recepient: '',
                  status: '',
                  payment_proof: '',
                  invoice: '',
                  total_price: '',
                }),
              );
            }}
          />
        ) : (
          ''
        )}

        {editStatus.status ? (
          <ModalUpdateStatus
            data={editStatus}
            onHandleModalClick={() => {
              setConfirmationModalStatus(true);
            }}
            onHandleModalCancel={() => {
              dispatch(updateStatus({ order_id: '', status: '', invoice: '' }));
            }}
          />
        ) : (
          ''
        )}
        {confirmationModalStatus ? (
          <IModal
            confirm={'Ya'}
            cancel={'Tidak'}
            deskripsi={'Apakah anda yakin mengubah status order ini?'}
            onHandleModalClick={async () => {
              try {
                const token = localStorage.getItem("token")
                let doc = document.getElementById('update');
                const result = await axios.patch(
                  `http://localhost:8000/api/warehouse/order/update-status`,
                  {
                    status: doc.value,
                    invoice: editStatus.invoice,
                    id: editStatus.order_id,
                  },
                  {
                    headers: { Authorization: `Bearer ${token}` },
                  },
                );
                setConfirmationModalStatus(false)
                dispatch(updateStatus({ order_id: '', status: '', invoice: '' }))
                getDataOrder()
              } catch (error) {
                console.log(error);
              }
            }}
            onHandleModalCancel={() => {
              setConfirmationModalStatus(false);
            }}
          />
        ) : (
          ''
        )}
      </WareHouseAdminLayout>
    </>
  );
};

export default WarehouseManageOrder;
