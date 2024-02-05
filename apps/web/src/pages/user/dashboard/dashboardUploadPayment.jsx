import TemporaryFooter from '../../../components/Temporary/Footer';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import {
  DashboardSidebar,
  DashboardTitle,
} from '../../../components/dashboard';
import { CiTrash } from 'react-icons/ci';
import { RxHamburgerMenu } from 'react-icons/rx';
const DashboardUploadPayment = (props) => {
    return <>
    <TemporaryNavbar/>
    <DashboardTitle title={"Upload Pembayaran"} subTitle={'User/Pesanan/Upload Pembayaran'}/>
    <div className="flex justify-center gap-4">
      <DashboardSidebar/>
      <div className="shadow-lg rounded-md md:w-[560px] lg:w-[800px] p-5">
        
      </div>
    </div>
    <TemporaryFooter/>
    </>
}

export default DashboardUploadPayment;
