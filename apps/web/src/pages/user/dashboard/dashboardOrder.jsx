import { useEffect, useState } from 'react';
import TemporaryFooter from '../../../components/Temporary/Footer';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import {
  DashboardSidebar,
  DashboardTitle,
} from '../../../components/dashboard';
import { CiTrash } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
import axios from 'axios';
import { OrderCard, OrderCardNone } from '../../../components/DashboardOrderCard';
const DashboardOrder = (props) => {
  const  [dataOrder,setDataOrder]=useState([])
  const getUserOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await axios.get('http://localhost:8000/api/userOrder/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDataOrder(result.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserOrder();
  }, []);
  console.log("dapatlla",dataOrder);
  return (
    <div>
      <TemporaryNavbar />
      <DashboardTitle title={'Pesanan'} subTitle={'User/Pesanan'} />
      <div className="flex justify-center gap-4">
        <DashboardSidebar username={'Suhartono'} profPict={''} />
        <div className="shadow-lg rounded-md md:w-[560px] lg:w-[800px] p-5">
          <p className="text-lg font-semibold mb-4">Daftar Pesanan :</p>
          <div className="flex flex-col gap-4">
            {dataOrder.map((val,id)=>{
              if(!dataOrder){
                return <OrderCardNone key={id}/>
              } else {
                let data =[...val.data]
                return <OrderCard
                key={id}
                orderId={val.id}
                orderDate = {val.createdAt}
                status={val.status}
                invoice={val.invoice}
                total_price={val.total_price.toLocaleString("id")}
                orderItem={[val.data[0]]}
                />
              }
            })}
          </div>
        </div>
      </div>
      <TemporaryFooter />
    </div>
  );
};

export default DashboardOrder;
