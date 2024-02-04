import TemporaryFooter from '../../../components/Temporary/Footer';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import {
  DashboardSidebar,
  DashboardTitle,
} from '../../../components/dashboard';
import { CiTrash } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
const DashboardOrder = (props) => {
    const statusStyle = (status) => {
        switch (status) {
          case 'Diproses':
            return 'bg-blue-300';
          case 'Dikirim':
            return 'bg-blue-300';
          case 'Berhasil':
            return 'bg-green-300';
          case 'Dibatalkan':
            return 'bg-red-300 ';
          default:
            return 'bg-yellow-300 ';
        }
      };
  return (
    <div>
      <TemporaryNavbar />
      <DashboardTitle title={'Pesanan'} subTitle={'User/Pesanan'} />
      <div className="flex justify-center gap-4">
        <DashboardSidebar username={'Suhartono'} profPict={''} />
        <div className="shadow-lg rounded-md md:w-[560px] lg:w-[800px] p-5">
          <p className="text-lg font-semibold mb-4">Daftar Pesanan :</p>
          <div className="flex flex-col gap-4">
            
          </div>
        </div>
      </div>
      <TemporaryFooter />
    </div>
  );
};

export default DashboardOrder;
