import TemporaryFooter from '../../../components/Temporary/Footer';
import TemporaryNavbar from '../../../components/Temporary/Navbar';
import {
  DashboardSidebar,
  DashboardTitle,
} from '../../../components/dashboard';
import { CiTrash } from 'react-icons/ci';
const DashboardAddress = (props) => {
  return (
    <div>
      <TemporaryNavbar />
      <DashboardTitle title={'Alamat'} subTitle={'User/Alamat'} />
      <div className="flex justify-center gap-4">
        <DashboardSidebar username={'Suhartono'} profPict={''} />
        <div className="shadow-lg rounded-md md:w-[500px] p-5">
          <p className="text-lg font-semibold mb-4">Alamat yang terdaftar :</p>
          <div className="flex flex-col gap-4">
            <div className='bg-slate-100 rounded-md w-[full] h-[300px] flex justify-center items-center mb-4'>
                <p className='text-slate-500'>Belum ada alamat terdaftar</p>
            </div>
            {/* <div className="sm:w-full shadow p-4 mb-2 rounded-md">
              <div className=" flex justify-between">
                <p className="font-semibold mb-2">Jl Surabaya No 110</p>
                <p className="text-sm text-slate-600">Alamat Utama</p>
              </div>
              <div>
                <p>Surabaya, Jawa Timur</p>
              </div>
              <div className='text-end'>
              <button
                  className="rounded-full p-1 hover:bg-slate-200 text-lg"
                  onClick={props.onHandleDelete}
                >
                  <CiTrash className="" />
                </button>
              </div>
            </div>
            <div className="sm:w-full shadow p-4 mb-2 rounded-md">
              <div className=" flex justify-between">
                <p className="font-semibold mb-2">Jl Surabaya No 110</p>
                <p className="text-sm text-slate-600 cursor-pointer hover:underline hover:text-[#F06105]">Set Alamat Utama</p>
              </div>
              <div>
                <p>Surabaya, Jawa Timur</p>
              </div>
              <div className='text-end'>
              <button
                  className="rounded-full p-1 hover:bg-slate-200 text-lg"
                  onClick={props.onHandleDelete}
                >
                  <CiTrash className="" />
                </button>
              </div>
            
            </div> */}
            <button className='ml-auto bg-[#F06105] text-white font-semibold px-2 rounded-md py-2 hover:bg-orange-400' disabled={false}>Tambah Alamat</button>
          </div>
        </div>
      </div>
      <TemporaryFooter />
    </div>
  );
};

export default DashboardAddress;
