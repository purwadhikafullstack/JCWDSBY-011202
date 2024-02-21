import { useEffect, useRef, useState } from 'react';
import ManageOrderTable from '../../../../components/ManageOrderTableComponent.jsx';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  ModalOrderInformation,
  ModalUpdateStatus,
} from '../../../../components/modalRama3.jsx';
import { updateItem } from '../../../../redux/slice/orderSlice.js';
import { updateStatus } from '../../../../redux/slice/statusSlice.js';
import {
  InputSearchComponent,
  SearchByStatus,
  SearchDate,
} from '../../../../components/adminOrderSearchComponent.jsx';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../../../components/AdminLayout.jsx';
import ManageOrderTable2 from '../../../../components/ManageOrderTableComponent2.jsx';
import  API_CALL  from '../../../../helpers/API.js'


const AdminManageOrder = () => {
  const navigate = useNavigate();
  const editItem = useSelector((state) => state.orderSlice);
  const editStatus = useSelector((state) => state.statusSlice);
  const cancelOrderItem = useSelector((state) => state.cancelOrderSlice);
  const dispatch = useDispatch();
  const [confirmationModalStatus, setConfirmationModalStatus] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [filterInvoice, setFilterInvoice] = useState('');
  const [filterNamaGudang, setFilterNamaGudang] = useState('');
  const [filterIdGudang, setFilterIdGudang] = useState(0);

  const [data, setData] = useState([]);
  const ref = useRef();
  const token = localStorage.getItem('token');
  const getDataOrder = async () => {
    try {
      const result = await API_CALL.get(`/admin/order`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDataOrder();
  }, []);
  useEffect(() => {
    getDataOrder();
  }, [location.search]);
  useEffect(()=>{
    console.log(editItem);
  },[editItem])
  return (
    <>
      <AdminLayout>
        <div className="bg-white p-4 flex justify-between align-middle">
          <p className="font-bold text-xl ">Manage Order</p>
        </div>
        <div className="px-4 py-3">
          <div className=" mb-2 flex gap-2">
            <InputSearchComponent
              valueInputSearch={filterInvoice}
              inputSearchId={'searchByGudang'}
              placeholder={'Masukkan Nama Gudang'}
              onChange={(e) => {
                let doc = document.getElementById('searchByGudang');
                e.target.value;
                setFilterNamaGudang(doc.value);
              }}
            />
            <InputSearchComponent
              valueInputSearch={filterInvoice}
              inputSearchId={'searchByInv'}
              placeholder={'Masukkan Invoice'}
              onChange={(e) => {
                let doc = document.getElementById('searchByInv');
                e.target.value;
                setFilterInvoice(doc.value);
              }}
            />
            <SearchDate
              onChangeFrom={(e) => {
                let doc = document.getElementById('from');
                e.target.value;
                setFilterDateFrom(doc.value);
              }}
              onChangeTo={(e) => {
                let doc = document.getElementById('to');
                e.target.value;
                setFilterDateTo(doc.value);
              }}
            />
          </div>
          <div>
            <SearchByStatus
              checked={filterStatus}
              checkedValue={() => {
                setFilterStatus(
                  document.querySelector('input[name="status"]:checked').value,
                );
              }}
              onClickStatus={() => {
                setFilterStatus(
                  document.querySelector('input[name="status"]:checked').value,
                );
              }}
              refStatus={ref}
            />
          </div>
          <div>
            <div className="flex gap-2 justify-end mb-3">
              <button
                className=" bg-[#F06105] text-white font-semibold my-auto px-4 rounded-md py-2 hover:bg-orange-400"
                disabled={false}
                onClick={() => {
                  const object = {
                    warehouse_id: filterIdGudang,
                    invoice: filterInvoice,
                    status: filterStatus,
                    from: filterDateFrom,
                    to: filterDateTo,
                  };
                  const result = [];
                  console.log('yang dicari', object);
                  for (const key in object) {
                    if (object[key]) {
                      result.push(`${key}=${object[key]}`);
                    }
                  }
                  const finalresult = result.join('&');
                  navigate(`/warehouse-admin/manage-order?${finalresult}`);
                  // getDataOrder();
                }}
              >
                Search
              </button>
              <button
                className=" bg-slate-300 font-semibold my-auto px-4 rounded-md py-2 hover:bg-slate-100"
                disabled={false}
                onClick={() => {
                  navigate(`/warehouse-admin/manage-order`);
                  setFilterDateFrom('');
                  setFilterDateTo('');
                  setFilterInvoice('');
                  setFilterStatus('');
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <ManageOrderTable2
            header={[
              'Gudang',
              'Invoice',
              'Date Invoice',
              'Alamat Pengiriman',
              'Bukti Pembayaran',
              'Total Price',
              'Status',
              'Action',
            ]}
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
      </AdminLayout>
    </>
  );
};

export default AdminManageOrder;
